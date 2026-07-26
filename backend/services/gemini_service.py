import os
import json

from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env file")

client = genai.Client(api_key=api_key)


def analyze_reviews(reviews):

    if not reviews:
        return {
            "confidence": 0,
            "recommendation": "No reviews available",
            "risk_level": "Unknown",
            "summary": "No customer reviews were available.",
            "pros": [],
            "cons": [],
            "sentiment": {
                "positive": 0,
                "neutral": 0,
                "negative": 0
            }
        }

    review_text = ""

    for i, review in enumerate(reviews, start=1):

        review_text += (
            f"Review {i}:\n"
            f"Rating: {review.get('rating')}/5\n"
            f"Comment: {review.get('review', '')}\n\n"
        )

    prompt = f"""
You are an AI shopping confidence assistant.

Analyze the following real customer reviews from Myntra.

Determine whether a customer can confidently buy the product.

Consider:
- overall satisfaction
- product quality
- fabric/material
- comfort
- fit
- value for money
- repeated complaints
- repeated positive feedback
- inconsistencies between ratings and review text

Return ONLY valid JSON.

Use exactly this structure:

{{
    "confidence": 0,
    "recommendation": "",
    "risk_level": "",
    "summary": "",
    "pros": [],
    "cons": [],
    "sentiment": {{
        "positive": 0,
        "neutral": 0,
        "negative": 0
    }}
}}

confidence must be an integer from 0 to 100.

recommendation must be one of:
"Highly Recommended",
"Recommended",
"Buy with Caution",
"Not Recommended"

risk_level must be:
"Low",
"Medium",
or "High".

sentiment values should approximately total 100.

Do not invent complaints that are not present in the reviews.

CUSTOMER REVIEWS:

{review_text}
"""

    try:

        # response = client.models.generate_content(
        #     model="gemini-2.5-flash",
        #     contents=prompt
        # )
        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=prompt
        )
        text = response.text.strip()

        print("\n========== GEMINI RAW RESPONSE ==========")
        print(text)
        print("=========================================\n")

        # Remove markdown fences
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        return json.loads(text)

    except Exception as e:

        print("\n========== GEMINI ERROR ==========")
        print(type(e).__name__)
        print(str(e))
        print("==================================\n")

        return {
            "confidence": 0,
            "recommendation": "Analysis unavailable",
            "risk_level": "Unknown",
            "summary": f"Gemini analysis failed: {str(e)}",
            "pros": [],
            "cons": [],
            "sentiment": {
                "positive": 0,
                "neutral": 0,
                "negative": 0
            }
        }