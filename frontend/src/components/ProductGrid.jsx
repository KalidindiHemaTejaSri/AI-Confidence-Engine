import ProductCard from "./ProductCard";

function ProductGrid({ products }) {

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

      {products.map((product) => (

        <ProductCard
          key={product.id}
          product={product}
        />

      ))}

    </div>

  );

}

export default ProductGrid;