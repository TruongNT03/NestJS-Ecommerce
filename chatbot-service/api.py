from fastapi import FastAPI, Request
from os import getenv
from dotenv import load_dotenv
import joblib
from sklearn.metrics.pairwise import cosine_similarity

load_dotenv()

MODEL_FILE = getenv("MODEL_FILE", "models/faq_model.pkl")

app = FastAPI()

# -------------------------------------
# Load ML Model (TF-IDF + dataset)
# -------------------------------------
model_data = None  # sẽ là tuple (df, vectorizer, X_tfidf)

def load_model():
    global model_data
    try:
        model_data = joblib.load(MODEL_FILE)
        print("ML model loaded successfully!")
    except Exception as e:
        print("Could not load model:", e)
        model_data = None

load_model()

# -------------------------------------
# Health check
# -------------------------------------
@app.get("/health")
def health():
    return {
        "model_file": MODEL_FILE,
        "status": "healthy" if model_data else "not loaded"
    }

# -------------------------------------
# Endpoint trả lời câu hỏi
# -------------------------------------
@app.post("/ask")
async def ask(request: Request):
    payload = await request.json()

    question = payload.get("data", "").get("question", "").strip()

    if not question:
        return {"error": "Missing question"}

    if model_data is None:
        return {"error": "Model not loaded"}

    df, vectorizer, X_tfidf = model_data
    q_vec = vectorizer.transform([question])
    sims = cosine_similarity(q_vec, X_tfidf)
    idx = sims.argmax()
    answer = df.iloc[idx]["answer"]

    return {"answer": answer}

# -------------------------------------
# Endpoint retrain
# -------------------------------------
@app.post("/retrain")
def retrain():
    import subprocess
    try:
        subprocess.run(["python", "training.py"], check=True)
        load_model()
        return {"message": "Model retrained and reloaded!"}
    except Exception as e:
        return {"message": f"Fail to retrain model: {e}"}
