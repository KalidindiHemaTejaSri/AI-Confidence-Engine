function SearchBar({ search, setSearch }) {
  return (
    <div className="my-8">

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-pink-500"
      />

    </div>
  );
}

export default SearchBar;