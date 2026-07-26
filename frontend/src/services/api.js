const API_BASE_URL = "http://127.0.0.1:8000";

export async function getProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getProduct(productId) {
  const response = await fetch(
    `${API_BASE_URL}/product/${productId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export async function analyzeProduct(productId) {
  const response = await fetch(
    `${API_BASE_URL}/analyze/${productId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to analyze product");
  }

  return response.json();
}