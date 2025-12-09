import os
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from models import FAQ
import joblib
from dotenv import load_dotenv
from colorama import Fore, init
from stopwords import VIETNAMESE_STOPWORDS
from spell_correction import normalize_question
import unicodedata
import re
import numpy as np
import warnings
from pyvi import ViTokenizer

# Bỏ qua warning của thư viện
warnings.filterwarnings('ignore', category=UserWarning, module='sklearn')

init(autoreset=True)
load_dotenv()

MODEL_DIR = "models"

VEC_PATH = f"{MODEL_DIR}/faq_vectorizer.pkl"
MAT_PATH = f"{MODEL_DIR}/faq_matrix.pkl"
DATA_PATH = f"{MODEL_DIR}/faq_data.pkl"

# Hàm tiền sử lý câu hỏi
def preprocess(text):
    # Chuẩn hóa về dạng lower
    text = text.lower()
    # Chuẩn hóa unicode
    text = unicodedata.normalize("NFC", text)

    # Thư viện của underthesea để sử lý các từ đa âm
    # điện thoại (nếu tách riêng điện và thoại thì không có nghĩa gì) => điện_thoại
    text = ViTokenizer.tokenize(text)  # tách đa âm

    # Giữ lại ký tự hợp lệ, loại bỏ các từ ko liên quan (ký tự đặc biệt, icon,...)
    text = re.sub(r"[^a-z0-9_áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệ"
                  r"íìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữự"
                  r"ýỳỷỹỵđ\s]", " ", text)

    # Gộp khoảng trắng, xuống dòng
    text = re.sub(r"\s+", " ", text).strip()

    # Trả ra kết quả:
    # Sample process: 'Tô.i muốn mua điện thoại' => 'tôi muốn mua điện_thoại'
    return text

def load_dataset_orm():
    # Lấy DATABASE_URL từ env
    DATABASE_URL = os.getenv("DATABASE_URL")
    
    if not DATABASE_URL:
        # Fallback nếu không có biến DATABASE_URL
        DB_HOST = os.getenv("POSTGRES_HOST")
        DB_PORT = os.getenv("POSTGRES_PORT")
        DB_USER = os.getenv("POSTGRES_USER")
        DB_PASS = os.getenv("POSTGRES_PASSWORD")
        DB_NAME = os.getenv("POSTGRES_DB")
        DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    
    # Tạo kết nối với database
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(bind=engine)
    session = SessionLocal()

    # Lấy toàn bộ record FAQ
    records = session.query(FAQ.question, FAQ.answer, FAQ.type).all()
    session.close()

    # Nếu không có record, trả về DataFrame rỗng với các cột chuẩn
    df = pd.DataFrame(records, columns=["question", "answer", "type"])
    if df.empty:
        raise ValueError("Dataset rỗng — không tìm thấy bản ghi FAQ trong database.")
    
    # Tránh NaN, ép thành string, tạo cột text để train
    df["question"] = df["question"].fillna("").astype(str)
    df["answer"] = df["answer"].fillna("").astype(str)
    df["type"] = df["type"].fillna("").astype(str)
    
    # Chỉ preprocess question + thêm type để tăng context
    # Type được normalize: "Thanh toán" -> "thanh_toan" để dễ match
    def create_training_text(row):
        question_text = preprocess(row["question"])
        return f"{question_text}"
    
    df["text"] = df.apply(create_training_text, axis=1)
    return df


def build_model():

    # Lấy dataframe
    df = load_dataset_orm()

    vectorizer = TfidfVectorizer(
        # Không sử dụng vì đã được sử lý và lưu vào df["text"]
        preprocessor=None,
        tokenizer=None,
        lowercase=False,

        # Custom stop words tiếng việt
        stop_words=VIETNAMESE_STOPWORDS
    )

    tfidf_matrix = vectorizer.fit_transform(df["text"])

    # Lưu dataset và vectorizer để sử dụng sau
    os.makedirs(MODEL_DIR, exist_ok=True)

    joblib.dump(vectorizer, VEC_PATH)
    joblib.dump(tfidf_matrix, MAT_PATH)
    joblib.dump(df, DATA_PATH)
    print(f"{Fore.GREEN}INFO:     {Fore.CYAN}TF-IDF model saved.")

def answer_question(question: str):
    # Check exist model
    if not os.path.exists(VEC_PATH):
        raise FileNotFoundError(f"{Fore.RED}ERROR:    {Fore.CYAN}Chưa build model, hãy chạy build_model() trước")
    if not os.path.exists(MAT_PATH):
        raise FileNotFoundError(f"{Fore.RED}ERROR:    {Fore.CYAN}Chưa build model, hãy chạy build_model() trước")
    if not os.path.exists(DATA_PATH):
        raise FileNotFoundError(f"{Fore.RED}ERROR:    {Fore.CYAN}Chưa build model, hãy chạy build_model() trước")
    
    # Load model files
    vectorizer = joblib.load(VEC_PATH)
    tfidf_matrix = joblib.load(MAT_PATH)
    df = joblib.load(DATA_PATH)
    
    # Chuẩn hóa lại câu hỏi trước (Sửa lỗi chính tả, viết tắt,...)
    question_normalized = normalize_question(question)
    question_preprocessed = preprocess(question_normalized)
    print(f"{Fore.GREEN}INFO:     {Fore.CYAN}Preprocess       : {question} -> {question_normalized} -> {question_preprocessed}" )
    
    # Vector hóa câu hỏi
    q_vec = vectorizer.transform([question_preprocessed])
    
    # Tính độ tương đồng cosin
    sim = cosine_similarity(q_vec, tfidf_matrix).flatten()

    # Sắp xếp => lấy giá trị tốt nhất
    top_k = np.argsort(sim)[-3:][::-1]
    best = top_k[0]
    score_best = sim[best]
    

    # Nếu điểm quá thấp => Trả ra kết quả rằng không hiểu
    if score_best < 0.25:
        return {
            "answer": "Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Vui lòng liên hệ bộ phận hỗ trợ để được tư vấn chi tiết hơn.",
            "question": question,
            "accuracy": score_best,
            "answer_from": "model"
        }   
    # Lấy kết quả
    row = df.iloc[best]

    # INFO LOG
    print(f"""{Fore.GREEN}INFO:{Fore.CYAN}     ======= QUESTION INFO =======
          Question         : {question}
          Matching question: {row["question"]}
          Answer           : {row['answer']}
          Score            : {score_best}
          ======= QUESTION INFO =======
        """)
    
    return {
        "answer": row["answer"],
        "question": question,
        "accuracy": score_best,
        "answer_from": "model"
        }

    

def retrain():
    build_model()
    test_q = "Làm sao để thanh toán đơn hàng?"
    test_answer = answer_question(test_q)
    return test_answer
