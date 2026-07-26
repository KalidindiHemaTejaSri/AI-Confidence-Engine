import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Loading from "../components/Loading";
import AIAnalysis from "../components/AIAnalysis";

import {
  getProduct,
  analyzeProduct
} from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [productLoading, setProductLoading] =
    useState(true);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProduct(id);

        if (data.message === "Product not found") {
          setProduct(null);
        } else {
          setProduct(data);
        }
      } catch (error) {
        console.error(error);
        setError("Unable to load product.");
      } finally {
        setProductLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const analyzeReviews = async () => {
    try {
      setLoading(true);
      setError("");
      setResult(null);

      const data = await analyzeProduct(id);

      if (data.error) {
        setError(data.error);
        return;
      }

      setResult(data.analysis);

    } catch (error) {
      console.error(error);

      setError(
        "Unable to analyze reviews. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (productLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold">
          Product Not Found
        </h1>

        <button
          onClick={() => navigate("/")}
          className="text-pink-600 font-semibold mt-6"
        >
          ← Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F6] min-h-screen">
      <div className="max-w-7xl mx-auto p-10">

        <button
          onClick={() => navigate(-1)}
          className="text-pink-600 font-semibold mb-8"
        >
          ← Back
        </button>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[600px] object-contain"
              />
            ) : (
              <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-2xl text-gray-400">
                Product Image
              </div>
            )}

          </div>

          {/* RIGHT */}

          <div>

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <p className="text-gray-500">
                {product.brand}
              </p>

              <h1 className="text-4xl font-bold mt-2">
                {product.name}
              </h1>

              {product.category && (
                <p className="text-gray-500 mt-3">
                  {product.category}
                </p>
              )}

              {product.price > 0 && (
                <div className="flex items-center gap-4 mt-5">

                  <span className="text-pink-600 text-4xl font-bold">
                    ₹{product.price}
                  </span>

                  {product.oldPrice && (
                    <span className="line-through text-gray-400">
                      ₹{product.oldPrice}
                    </span>
                  )}

                </div>
              )}

              {product.rating > 0 && (
                <div className="mt-5 text-xl">
                  ⭐ {product.rating}
                </div>
              )}

              <button
                onClick={analyzeReviews}
                disabled={loading}
                className="bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 transition text-white w-full py-4 rounded-xl text-xl font-semibold mt-8"
              >
                {loading
                  ? "Analyzing Reviews..."
                  : "Analyze Reviews"}
              </button>

            </div>

            <div className="mt-8">

              {loading ? (
                <Loading />
              ) : error ? (
                <div className="bg-red-50 text-red-600 rounded-3xl p-6">
                  {error}
                </div>
              ) : result ? (
                <AIAnalysis analysis={result} />
              ) : (
                <div className="bg-pink-50 rounded-3xl p-6">

                  <h2 className="text-2xl font-bold">
                    AI Confidence Engine
                  </h2>

                  <p className="mt-4 text-gray-500">
                    Click Analyze Reviews to generate
                    AI-powered shopping insights.
                  </p>

                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;