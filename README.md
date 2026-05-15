# Smart Intelligence for Farmers (AgriMitra)

AgriMitra is a futuristic, AI-powered platform designed to empower Indian farmers with real-time guidance, smart irrigation management, and crop health diagnostics.

## Features
- **AI Farmer Assistant**: RAG-powered chatbot supporting Hindi and English.
- **Smart Irrigation**: Dashboard for moisture tracking and autonomous water management.
- **Disease Detection**: AI-based crop health diagnostics from images.
- **Weather & Market**: Live local forecasts and Mandi price tracking.
- **Govt Schemes**: Easy access to agricultural subsidies and insurance.

## Tech Stack
- **Frontend**: Premium Vanilla JS/HTML/CSS with Tailwind & Framer Motion.
- **Backend**: FastAPI with LangChain & Gemini AI.
- **RAG**: FAISS Vector DB for agriculture knowledge.

## Setup Instructions

### 1. Prerequisites
- Python 3.10+
- Google Gemini API Key

### 2. Backend Setup
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set your Google API Key:
   ```bash
   # Windows
   set GOOGLE_API_KEY=your_api_key_here
   # Linux/Mac
   export GOOGLE_API_KEY=your_api_key_here
   ```
4. Run the server:
   ```bash
   python main.py
   ```

### 3. Frontend Setup
1. Simply open `index.html` in your browser.
2. Ensure the backend is running at `http://localhost:8000`.

## Directory Structure
- `index.html`: Main UI Entry Point.
- `frontend/app.js`: Frontend logic and state.
- `backend/main.py`: FastAPI server.
- `backend/rag_pipeline.py`: AI/RAG logic.
- `backend/knowledge_base/`: Place your agriculture PDFs/text files here.

---
**Tagline**: "Technology Growing the Future of Farming"
