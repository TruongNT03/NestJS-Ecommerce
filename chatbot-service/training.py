import os
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from models import FAQ
import joblib
from dotenv import load_dotenv
from colorama import Fore, Back, Style, init
from stopwords import VIETNAMESE_STOPWORDS
from spell_correction import normalize_question, fuzzy_match_question
import unicodedata
import re
import numpy as np
from underthesea import word_tokenize
import warnings

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
    # điện thoại (nếu tách riêng điện và  thì không có nghĩa gì) => điện_thoại
    text = word_tokenize(text, format="text")  # tách đa âm

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

        # Normalize type: loại bỏ dấu, chuyển space thành underscore
        type_normalized = preprocess(row["type"]).replace(" ", "_")
        
        # Ghép question với type (type có trọng số thấp hơn)
        return f"{question_text} {type_normalized}"
    
    df["text"] = df.apply(create_training_text, axis=1)
    return df


def build_model():

    # Lấy dataframe
    df = load_dataset_orm()

    vectorizer = TfidfVectorizer(
        preprocessor=None,
        stop_words=VIETNAMESE_STOPWORDS,
        ngram_range=(1, 2),
        min_df=1,
        max_df=0.9,
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
    print(f"{Fore.GREEN}INFO:     {Fore.CYAN}[NORMALIZE]     {question} -> {question_normalized}")
    
    # Thử fuzzy matching trước giảm thao tác server
    all_questions = df['question'].tolist()
    fuzzy_match, fuzzy_score, fuzzy_idx = fuzzy_match_question(question_normalized, all_questions, threshold=75)
    
    if fuzzy_match and fuzzy_score >= 85:
        # Nếu có fuzzy_match với điểm số cao => trả ra kết quả luôn
        row = df.iloc[fuzzy_idx]
        print(f"{Fore.GREEN}INFO:     {Fore.CYAN}[FUZZY MATCH]   Score={fuzzy_score}, Matched='{fuzzy_match}'")
        return {
            "answer": row["answer"],
            "question": question,
            "accuracy": fuzzy_score/100,
            "answer_from": "fuzzy"
        }
    
    # Nếu không tìm thấy câu trả lời ở fuzzy_match
    question_preprocessed = preprocess(question_normalized)
    
    # Vector hóa câu hỏi
    q_vec = vectorizer.transform([question_preprocessed])
    
    # Tính độ tương đồng cosin
    sim = cosine_similarity(q_vec, tfidf_matrix).flatten()

    # Sắp xếp => lấy giá trị tốt nhất
    top_k = np.argsort(sim)[-3:][::-1]
    best = top_k[0]
    score_best = sim[best]
    
    # Nếu TF-IDF có điểm thấp hơn fuzzy => trả ra kết quả của fuzzy
    if score_best < 0.25 and fuzzy_match and fuzzy_score >= 75:
        row = df.iloc[fuzzy_idx]
        print(f"{Fore.GREEN}INFO:     {Fore.CYAN}[FUZZY FALLBACK] TF-IDF={score_best:.2f}, Fuzzy={fuzzy_score}")
        return {
            "answer": row["answer"],
            "question": question,
            "accuracy": score_best,
            "answer_from": "fuzzy"
        }

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
    print(f"{Fore.GREEN}INFO:     {Fore.CYAN}Question: {question}\n          Answer: {row['answer']}\n          Score: {score_best}")

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
    print(f"{Fore.GREEN}INFO:     {Fore.CYAN}[TEST QUESTION] {test_q}")
    print(f"{Fore.GREEN}INFO:     {Fore.CYAN}[TEST ANSWER]   {test_answer["answer"]}")
    return test_answer
