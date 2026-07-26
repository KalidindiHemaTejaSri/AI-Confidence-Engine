import { FiSearch } from "react-icons/fi";

function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-[#FF3F6C]">
            AI Confidence Engine
          </h1>

          <p className="text-gray-500 text-sm">
            AI Powered Shopping Assistant
          </p>

        </div>

        <button className="flex items-center gap-2 bg-[#FF3F6C] text-white px-6 py-3 rounded-xl hover:bg-pink-700 transition">

          <FiSearch />

          Analyze Reviews

        </button>

      </div>

    </nav>
  );
}

export default Navbar;