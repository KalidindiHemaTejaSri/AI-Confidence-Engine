import requests

# 1. FETCH REVIEWS FROM MYNTRA

def get_reviews(product_id):

    session = requests.Session()

    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/150.0.0.0 Safari/537.36"
        ),
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9,en-IN;q=0.8",
        "Referer": f"https://www.myntra.com/{product_id}",
    }

    session.headers.update(headers)

    # Open product page first for cookies/session
    try:
        session.get(
            f"https://www.myntra.com/{product_id}",
            timeout=15
        )
    except requests.RequestException:
        pass

    url = (
        f"https://www.myntra.com/gateway/v1/reviews/product/{product_id}"
        "?size=15"
        "&sort=0"
        "&rating=0"
        "&page=1"
        "&includeMetaData=true"
    )

    try:
        response = session.get(url, timeout=15)
    except requests.RequestException as e:
        print("Review request failed:", e)
        return []

    print("\n========== REVIEW REQUEST ==========")
    print("URL:", url)
    print("STATUS:", response.status_code)
    print("====================================")

    if response.status_code != 200:
        return []

    try:
        data = response.json()
    except ValueError:
        return []

    reviews = []

    for item in data.get("reviews", []):

        review_text = item.get("review", "").strip()

        if review_text:
            reviews.append({
                "rating": item.get("userRating"),
                "review": review_text,
                "user": item.get("userName", "")
            })

    return reviews

# 2. FETCH PRODUCT DETAILS FROM MYNTRA

def get_product_details(product_id):

    session = requests.Session()

    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/150.0.0.0 Safari/537.36"
        ),
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9,en-IN;q=0.8",
        "Content-Type": "application/json",
        "Origin": "https://www.myntra.com",
        "Referer": f"https://www.myntra.com/{product_id}",
    }

    session.headers.update(headers)

    # First open product page to get cookies
    session.get(
        f"https://www.myntra.com/{product_id}",
        timeout=15
    )

    # Correct endpoint seen in browser Network tab
    url = (
        f"https://www.myntra.com/"
        f"gateway/v3/layout/lazy/2/{product_id}"
    )

    response = session.post(
        url,
        json={},
        timeout=20
    )

    print("\n========== PRODUCT REQUEST ==========")
    print("URL:", url)
    print("METHOD: POST")
    print("STATUS:", response.status_code)
    print("CONTENT TYPE:", response.headers.get("content-type"))
    print("FIRST 500:", response.text[:500])
    print("=====================================\n")

    if response.status_code != 200:
        return {
            "error": "Unable to fetch product details",
            "status_code": response.status_code,
            "response": response.text[:300]
        }

    try:
        return response.json()

    except ValueError:
        return {
            "error": "Myntra product API did not return JSON",
            "response": response.text[:300]
        }