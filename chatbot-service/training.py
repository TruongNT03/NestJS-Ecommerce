import os
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from models import FAQ
import joblib
from dotenv import load_dotenv

load_dotenv()

MODEL_DIR = "models"
MODEL_PATH = os.path.join(MODEL_DIR, "faq_model.pkl")

def load_dataset_orm():
    # Get database config from environment variables
    DATABASE_URL = os.getenv("DATABASE_URL")
    
    if not DATABASE_URL:
        # Fallback to individual env variables
        DB_HOST = os.getenv("POSTGRES_HOST")
        DB_PORT = os.getenv("POSTGRES_PORT")
        DB_USER = os.getenv("POSTGRES_USER")
        DB_PASS = os.getenv("POSTGRES_PASSWORD")
        DB_NAME = os.getenv("POSTGRES_DB")
        DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(bind=engine)
    session = SessionLocal()

    records = session.query(FAQ.question, FAQ.answer).all()
    session.close()

    df = pd.DataFrame(records, columns=["question", "answer"])
    return df

def build_model():
    df = load_dataset_orm()
    vectorizer = TfidfVectorizer()
    X_tfidf = vectorizer.fit_transform(df["question"])
    # Lưu dataset và vectorizer để sử dụng sau
    os.makedirs(MODEL_DIR, exist_ok=True)
    joblib.dump((df, vectorizer, X_tfidf), MODEL_PATH)
    print("TF-IDF model saved.")

def answer_question(question: str):
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError("Chưa build model, hãy chạy build_model() trước")
    
    df, vectorizer, X_tfidf = joblib.load(MODEL_PATH)
    q_vec = vectorizer.transform([question])
    sims = cosine_similarity(q_vec, X_tfidf)
    idx = sims.argmax()
    return df.iloc[idx]["answer"]

if __name__ == "__main__":
    build_model()
    test_q = "Làm sao để thanh toán đơn hàng?"
    print("Question:", test_q)
    print("Answer:", answer_question(test_q))
