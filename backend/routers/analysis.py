from fastapi import APIRouter

from services.myntra_service import get_reviews
from services.gemini_service import analyze_reviews

router = APIRouter()


@router.post("/analyze/{product_id}")
def analyze(product_id: str):

    # Fetch live reviews from Myntra
    reviews = get_reviews(product_id)

    if not reviews:
        return {
            "error": "No reviews found for this product"
        }

    print("REVIEWS FETCHED:", len(reviews))

    # Send reviews to Gemini
    analysis = analyze_reviews(reviews)

    return {
        "product_id": product_id,
        "reviews_analyzed": len(reviews),
        "analysis": analysis
    }