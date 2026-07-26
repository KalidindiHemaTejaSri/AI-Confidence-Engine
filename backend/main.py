from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.products import router as product_router
from routers.analysis import router as analysis_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_router)
app.include_router(analysis_router)


@app.get("/")
def home():
    return {"message": "AI Confidence Engine Backend Running"}