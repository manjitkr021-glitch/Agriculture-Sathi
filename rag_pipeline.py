import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

# Set up Gemini
# Note: GOOGLE_API_KEY should be set in environment variables
GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY")

class RAGAssistant:
    def __init__(self):
        self.embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        self.llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash")
        self.vector_db = None
        self.qa_chain = None

    def initialize_vector_db(self, texts: list):
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        chunks = text_splitter.create_documents(texts)
        self.vector_db = FAISS.from_documents(chunks, self.embeddings)
        
        prompt_template = """
        You are a Smart AI Farmer Assistant named 'Krishi Mitra'. 
        Use the following pieces of context to answer the farmer's question. 
        If you don't know the answer, just say you don't know, don't try to make up an answer.
        Answer in the same language as the question (Hindi or English).
        Keep the answer simple, practical, and farmer-friendly.

        Context: {context}
        Question: {question}

        Answer:
        """
        PROMPT = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
        
        self.qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=self.vector_db.as_retriever(),
            chain_type_kwargs={"prompt": PROMPT}
        )

    def ask(self, query: str):
        if not self.qa_chain:
            return "Assistant is not initialized with data yet."
        return self.qa_chain.run(query)

# Singleton instance
rag_assistant = RAGAssistant()
