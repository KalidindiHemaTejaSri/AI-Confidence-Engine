import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import ProductGrid from "../components/ProductGrid";

import { getProducts } from "../services/api";

function Home() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const name = product.name || "";
    const brand = product.brand || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      brand.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="bg-[#F5F5F6] min-h-screen">
      <Navbar />

      <Hero />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold">
          All Products
        </h1>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        {loading && (
          <p className="text-center mt-10">
            Loading products...
          </p>
        )}

        {error && (
          <p className="text-center mt-10 text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && (
          <ProductGrid products={filteredProducts} />
        )}
      </div>
    </div>
  );
}

export default Home;