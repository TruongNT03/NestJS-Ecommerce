from fastapi import FastAPI, Request
from dotenv import load_dotenv
import joblib
from training import answer_question
from colorama import Fore, Style, init
from training import retrain as retraining

load_dotenv()
init(autoreset=True)

MODEL_DIR = "models"
VEC_PATH = f"{MODEL_DIR}/faq_vectorizer.pkl"
MAT_PATH = f"{MODEL_DIR}/faq_matrix.pkl"
DATA_PATH = f"{MODEL_DIR}/faq_data.pkl"

app = FastAPI()

# -------------------------------------
# Load Model
# -------------------------------------
faq_data = None  
faq_matrix = None  
faq_vectorizer = None  

def load_model():
    global faq_data
    global faq_matrix
    global faq_vectorizer
    try:
        faq_data = joblib.load(VEC_PATH)
        faq_matrix = joblib.load(MAT_PATH)
        faq_vectorizer = joblib.load(DATA_PATH)
        print(f"{Fore.GREEN}INFO:     {Fore.CYAN}ML model loaded successfully!")
    except Exception as e:
        print(f"{Fore.RED}ERROR:    Could not load model.", e)
        faq_data = None  
        faq_matrix = None  
        faq_vectorizer = None  


load_model()

# -------------------------------------
# Health check
# -------------------------------------
@app.get("/health")
def health():
    return {
        "faq_data_file": VEC_PATH,
        "faq_matrix_file": MAT_PATH,
        "faq_vectorizer_file": DATA_PATH,
        "status": "healthy" if faq_data and faq_matrix and faq_vectorizer else "not loaded"
    }

# -------------------------------------
# Endpoint trả lời câu hỏi
# -------------------------------------
@app.post("/ask")
async def ask(request: Request):
    payload = await request.json()

    question = payload.get("data", "").get("question", "").strip()
    print(f"{Fore.GREEN}INFO{Style.RESET_ALL}:     Question from payload: {Fore.CYAN}{question}{Style.RESET_ALL}")

    if not question:
        return {"error": "Missing question"}

    answer = answer_question(question)

    return answer

# -------------------------------------
# Endpoint retrain
# -------------------------------------
@app.post("/retrain")
def retrain():
    try:
        answer = retraining()
        return answer
    except Exception as e:
        return {"message": f"Fail to retrain model: {e}"}
