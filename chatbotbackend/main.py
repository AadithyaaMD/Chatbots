import os
from typing import List, Dict, Any
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from langchain_community.llms import Ollama
from langchain_core.prompts import PromptTemplate
from pydantic import BaseModel, Field
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration class with environment variables
class Config:
    OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2")
    OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")  # Default frontend URL

# Your existing SUPPORT_CONTEXTS dictionary remains the same
SUPPORT_CONTEXTS = {
    "billing": """You are a helpful customer support agent for a laptop selling website. 
    Assist the customer with billing-related inquiries, such as payment methods, 
    invoice details, and refund processes.""",
    
    "technical": """You are a technical support agent for a laptop selling website. 
    Provide detailed, step-by-step troubleshooting guidance for laptop issues, 
    including hardware and software problems.""",
    
    "product_inquiry": """You are a product expert for a laptop selling website. 
    Help customers understand laptop specifications, compare models, 
    and provide recommendations based on their needs."""
}

class LaptopSupportChatbot:
    def __init__(self):
        try:
            self.llm = Ollama(
                model=Config.OLLAMA_MODEL,
                base_url=Config.OLLAMA_BASE_URL
            )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to initialize Ollama LLM: {str(e)}"
            )

    def create_context_prompt(self, context_type: str) -> PromptTemplate:
        return PromptTemplate(
            template="{context}\n\nCustomer Query: {query}\n\nResponse:",
            input_variables=["context", "query"]
        )

    def generate_response(self, context_type: str, query: str) -> str:
        try:
            context = SUPPORT_CONTEXTS.get(context_type)
            if not context:
                raise ValueError(f"Invalid context type: {context_type}")
                
            prompt = self.create_context_prompt(context_type)
            full_prompt = prompt.format(context=context, query=query)
            response = self.llm.invoke(full_prompt)
            return response
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error generating response: {str(e)}"
            )

class SupportRequest(BaseModel):
    context: str = Field(default="product_inquiry", description="Support context type")
    query: str = Field(..., description="Customer's support query")

class SupportResponse(BaseModel):
    response: str
    context: str
    status: str = "success"

# Initialize FastAPI app
app = FastAPI(
    title="Laptop Support Chatbot",
    description="AI-powered customer support chatbot for laptop sales"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[Config.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize chatbot
try:
    chatbot = LaptopSupportChatbot()
except Exception as e:
    print(f"Error initializing chatbot: {str(e)}")
    raise

# Static files and templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/support", response_model=SupportResponse)
async def handle_support_request(request: SupportRequest):
    try:
        response_text = chatbot.generate_response(
            context_type=request.context,
            query=request.query
        )
        return SupportResponse(
            response=response_text,
            context=request.context
        )
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"status": "error", "detail": exc.detail}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)