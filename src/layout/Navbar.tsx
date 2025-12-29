import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#2C3E3B] border-b border-[#1F2B29]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-serif text-white tracking-wide hover:text-[#C9A961] transition-colors"
        >
          WebRestaurant
        </Link>

        {/* Menu Links */}
        <div className="flex gap-8">
          <Link
            to="/"
            className="text-white text-sm font-medium hover:text-[#C9A961] transition-colors"
          >
            Menu
          </Link>
          <Link
            to="/about"
            className="text-white text-sm font-medium hover:text-[#C9A961] transition-colors"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
