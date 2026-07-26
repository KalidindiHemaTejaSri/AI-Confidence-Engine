import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>

      <div className="bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 overflow-hidden">

        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-contain bg-gray-100"
          />
        ) : (
          <div className="w-full h-72 bg-gray-100 flex items-center justify-center text-gray-400">
            Product Image
          </div>
        )}

        <div className="p-4">

          <p className="text-gray-500 text-sm">
            {product.brand}
          </p>

          <h2 className="font-bold text-lg mt-2">
            {product.name}
          </h2>

          {product.price > 0 && (
            <div className="flex items-center gap-3 mt-3">

              <span className="text-pink-600 font-bold text-xl">
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
            <div className="mt-3">
              ⭐ {product.rating}
            </div>
          )}

        </div>

      </div>

    </Link>
  );
}

export default ProductCard;