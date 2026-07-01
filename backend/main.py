import os
os.environ.setdefault("HF_HUB_OFFLINE", "1")
os.environ.setdefault("TRANSFORMERS_OFFLINE", "1")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np
import faiss
import pandas as pd
from sentence_transformers import SentenceTransformer
from google import genai
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load all models at startup
with open("../models/xgb_model.pkl", "rb") as f:
    xgb_model = pickle.load(f)
with open("../models/tfidf_vectorizer.pkl", "rb") as f:
    tfidf = pickle.load(f)

faiss_index = faiss.read_index("../models/faiss_index.bin")
fake_df = pd.read_csv("../models/fake_postings.csv")
embedder = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")

class JobPosting(BaseModel):
    text: str

class ChatMessage(BaseModel):
    posting: str
    message: str

def get_fraud_score(text: str):
    vec = tfidf.transform([text])
    prob = xgb_model.predict_proba(vec)[0][1]
    return round(float(prob), 3)

def get_similar_scams(text: str, top_k=3):
    embedding = embedder.encode([text]).astype("float32")
    distances, indices = faiss_index.search(embedding, top_k)
    results = []
    for idx in indices[0]:
        results.append(fake_df.iloc[idx]["clean_text"][:300])
    return results

def get_gemini_explanation(posting: str, similar_scams: list):
    context = "\n\n".join([f"Scam Example {i+1}: {s}" for i, s in enumerate(similar_scams)])
    prompt = f"""You are a job scam detection expert.

A student submitted this job posting for analysis:
{posting}

Here are 3 real scam postings it resembles:
{context}

Explain in simple language:
1. Why this posting may be suspicious
2. Specific red flags to watch out for
3. What the student should verify before applying

Be direct and concise."""
    response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
    return response.text

@app.post("/analyze")
def analyze(job: JobPosting):
    text = job.text
    fraud_score = get_fraud_score(text)
    similar_scams = get_similar_scams(text)
    explanation = get_gemini_explanation(text, similar_scams)
    label = "FAKE" if fraud_score > 0.5 else "REAL"
    return {
        "label": label,
        "fraud_score": fraud_score,
        "explanation": explanation,
        "similar_scams_found": len(similar_scams)
    }

@app.post("/chat")
def chat(msg: ChatMessage):
    prompt = f"""You are a job scam detection assistant.

The user is asking about this job posting:
{msg.posting}

User question: {msg.message}

Answer helpfully and concisely based on scam detection knowledge."""
    response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
    return {"reply": response.text}

@app.get("/health")
def health():
    return {"status": "ok"}