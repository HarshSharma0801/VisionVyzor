from contextlib import asynccontextmanager
import uvicorn
from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from config.connection import *
from controllers.user_controller import router as user_router
from controllers.pdf_controller import router as pdf_router

@asynccontextmanager
async def lifespan(app: FastAPI):
  
    print("Starting up...")
    await db_connection.connect()
    yield
    print("Shutting down...")
    await db_connection.disconnect()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)


app.include_router(user_router, prefix="/users", tags=["Users"])
app.include_router(pdf_router, prefix="/pdf", tags=["PDF"])





@app.get("/")
async def read_root():
    return "Welcome to FastAPI with lifespan events!"

if __name__ == "__main__":
    uvicorn.run("server:app", host="127.0.0.1", port=4030, reload=True)
