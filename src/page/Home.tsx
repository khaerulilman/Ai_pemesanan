import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { menuData, categories } from "../data/data";
import Cart from "../modals/Cart";
import {
  type MenuItem,
  type CategoryItem,
  type CartItem,
} from "../props/props";

function Home() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [cartOpen, setCartOpen] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([]);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const fetchData = async () => {
      const [menus, cats] = await Promise.all([menuData(), categories()]);
      setMenuItems(menus);
      setCategoryItems(cats);
    };
    fetchData();
  }, []);

  const addToCart = (menu: MenuItem) => {
    setCartItems((prev) => {
      const existingData = prev.find((item) => item.id === menu.id);

      if (existingData) {
        return prev.map((item) =>
          item.id === menu.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [
        ...prev,
        {
          id: menu.id,
          name: menu.name,
          price: menu.price,
          qty: 1,
        },
      ];
    });
  };

  const selectedCategory = categoryItems.find(
    (xCategorie: CategoryItem) => xCategorie.name === category
  );

  const displayMenus = selectedCategory
    ? menuItems.filter(
        (xMenu: MenuItem) => xMenu.categoryId === selectedCategory?.id
      )
    : menuItems;

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Kategori - Mobile Burger */}
        <div className="flex justify-between items-center mb-6 sm:hidden">
          <h2 className="text-lg font-medium text-[#1F2933]">Kategori</h2>
          <button
            onClick={() => setBurgerOpen(true)}
            className="text-2xl text-[#3D5A4C]"
          >
            ☰
          </button>
        </div>

        {/* Kategori - Desktop */}
        <div className="mb-10 hidden sm:block">
          <h2 className="text-lg font-medium text-[#1F2933] mb-4">Kategori</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate(`/`)}
              className={`px-5 py-2 rounded-lg border text-sm font-medium transition-colors ${
                !category
                  ? "bg-[#3D5A4C] text-white border-[#3D5A4C]"
                  : "bg-white text-[#616E7C] border-[#E4E7EB] hover:border-[#3D5A4C]"
              }`}
            >
              Semua
            </button>
            {categoryItems.map((cat: CategoryItem) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/category/${cat.name}`)}
                className={`px-5 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  category === cat.name
                    ? "bg-[#3D5A4C] text-white border-[#3D5A4C]"
                    : "bg-white text-[#616E7C] border-[#E4E7EB] hover:border-[#3D5A4C]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Burger Menu */}
        {burgerOpen && (
          <div className="fixed inset-0 z-50 bg-black/30 flex justify-end sm:hidden">
            <div className="bg-white w-72 h-full p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-[#1F2933]">Kategori</h2>
                <button
                  onClick={() => setBurgerOpen(false)}
                  className="text-2xl text-[#616E7C]"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    navigate(`/`);
                    setBurgerOpen(false);
                  }}
                  className={`text-left px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                    !category
                      ? "bg-[#3D5A4C] text-white border-[#3D5A4C]"
                      : "bg-white text-[#616E7C] border-[#E4E7EB]"
                  }`}
                >
                  Semua
                </button>

                {categoryItems.map((cat: CategoryItem) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      navigate(`/category/${cat.name}`);
                      setBurgerOpen(false);
                    }}
                    className={`text-left px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                      category === cat.name
                        ? "bg-[#3D5A4C] text-white border-[#3D5A4C]"
                        : "bg-white text-[#616E7C] border-[#E4E7EB]"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Menu Grid - WITH IMAGES */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayMenus.map((item: MenuItem) => (
            <div
              key={item.id}
              className="flex justify-between bg-white rounded-lg border border-[#E4E7EB] overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image */}
              {item.image && (
                <div className="w-full h-48 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-5 flex flex-col">
                <div className="flex-grow mb-4">
                  <h3 className="text-base font-semibold text-[#1F2933] mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#616E7C] leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <p className="text-lg font-semibold text-[#C9A961]">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-[#3D5A4C] hover:bg-[#2F4A3E] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
                >
                  + Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#3D5A4C] hover:bg-[#2F4A3E] text-white px-8 py-3.5 rounded-full shadow-lg flex items-center gap-3 z-40 transition-colors"
      >
        <span className="text-lg">🛒</span>
        <span className="font-medium">Cart</span>
        <span className="bg-white text-[#3D5A4C] text-xs font-bold px-2 py-0.5 rounded-full">
          {cartItems.length}
        </span>
      </button>

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        setItems={setCartItems}
      />
    </div>
  );
}

export default Home;
