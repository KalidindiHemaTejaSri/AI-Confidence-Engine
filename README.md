# AI Confidence Engine

## AI-Powered Review Intelligence for Smarter Shopping Decisions

AI Confidence Engine is an AI-powered shopping assistant designed to help customers make faster and more informed purchase decisions.

Instead of manually reading numerous customer reviews, the system dynamically retrieves product reviews and uses Gemini AI to transform them into concise and explainable shopping insights.

## Key Features

- AI-generated review summary
- Pros and cons extraction
- Confidence score
- Purchase recommendation
- Sentiment analysis
- Product search and filtering
- Dynamic review retrieval
- Clean and interactive product interface

## How It Works

1. The user selects a product from the product catalog.
2. The React frontend sends the selected product ID to the FastAPI backend.
3. The backend dynamically retrieves customer reviews for the selected product.
4. The reviews are passed to Gemini AI for analysis.
5. The system generates:
   - Review Summary
   - Pros & Cons
   - Confidence Score
   - Sentiment Insights
   - Purchase Recommendation
6. The generated insights are displayed to the user through the React frontend.

## Architecture

User Selects Product  
↓  
React Frontend  
↓  
FastAPI Backend  
↓  
Fetch Product Reviews  
↓  
Gemini AI  
↓  
Review Intelligence Engine  
↓  
Summary + Pros & Cons + Confidence Score  
↓  
Recommendation  
↓  
User

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- FastAPI
- Python

### AI
- Gemini AI

### Data
- Dynamically retrieved customer reviews
- Local product catalog for prototype demonstration

## Project Structure

AI-Confidence-Engine/
- backend/
  - routers/
  - services/
  - utils/
  - main.py
  - requirements.txt
- frontend/
  - public/
  - src/
  - package.json
- README.md
- .gitignore

## Prototype Note

The current prototype uses a small locally maintained product catalog and product images for demonstration.

When a user selects a product, customer reviews are dynamically retrieved and analyzed using Gemini AI. The system then generates a review summary, pros and cons, sentiment insights, confidence score, and purchase recommendation.

The local product catalog can be replaced with a production product-data integration when deployed at scale.

## Future Scope

- Personalized confidence scores based on individual user preferences
- Multilingual review analysis
- AI-powered product comparison
- Personalized AI shopping assistant
- Integration into a production-scale e-commerce ecosystem

## Potential Impact

- Faster and more confident purchase decisions
- Reduced effort in reading numerous reviews
- Improved customer trust and engagement
- Potential reduction in product returns
- Smarter and more explainable shopping decisions

## Security

API keys and environment variables are stored locally using environment files and are excluded from version control.

## Hackathon

Developed as part of the Myntra WeForShe Hackathon 2026.