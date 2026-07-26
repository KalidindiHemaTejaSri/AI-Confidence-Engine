from fastapi import APIRouter
from services.products_data import PRODUCTS

router = APIRouter()


@router.get("/products")
def get_products():
    return PRODUCTS


@router.get("/product/{product_id}")
def get_product(product_id: str):
    for product in PRODUCTS:
        if product["id"] == product_id:
            return product

    return {"message": "Product not found"}