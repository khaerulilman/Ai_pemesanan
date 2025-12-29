import { useState } from "react";
import ConfirmOrder from "./ConfirmOrder";
import { type CartItem } from "../props/props";

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export default function Cart({ isOpen, onClose, items, setItems }: CartProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleReduce = (id: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === id);

      if (!existing) return prev;

      if (existing.qty === 1) {
        return prev.filter((item) => item.id !== id);
      }

      return prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      );
    });
  };

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40">
      <div className="bg-white w-full md:w-[480px] h-[90vh] md:h-auto md:max-h-[85vh] rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col">
        {/* Header - Fixed di atas */}
        <div className="flex-shrink-0 flex justify-between items-center px-6 py-5 border-b border-[#E4E7EB] bg-white rounded-t-2xl md:rounded-t-2xl">
          <h2 className="text-xl font-semibold text-[#1F2933]">Keranjang</h2>
          <button
            onClick={onClose}
            className="text-2xl text-[#616E7C] hover:text-[#1F2933] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-[#616E7C] text-center">
                Keranjang masih kosong
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start gap-4 pb-4 border-b border-[#E4E7EB] last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-[#1F2933] mb-1">
                      {item.name}
                    </p>
                    <p className="text-sm text-[#616E7C]">
                      {item.qty} × Rp {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="font-semibold text-[#1F2933] whitespace-nowrap">
                      Rp {(item.price * item.qty).toLocaleString("id-ID")}
                    </p>

                    <button
                      onClick={() => handleReduce(item.id)}
                      className="flex items-center justify-center w-8 h-8 rounded-full border border-[#E4E7EB] text-[#616E7C] hover:border-[#DC2626] hover:bg-[#DC2626] hover:text-white transition-colors"
                    >
                      −
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Fixed di bawah */}
        {items.length > 0 && (
          <div className="flex-shrink-0 px-6 py-5 border-t border-[#E4E7EB] bg-[#FAFAF8]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-base font-medium text-[#616E7C]">
                Total
              </span>
              <span className="text-xl font-bold text-[#1F2933]">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>

            <button
              onClick={() => setConfirmOpen(true)}
              className="w-full bg-[#3D5A4C] hover:bg-[#2F4A3E] text-white font-medium py-3 rounded-lg transition-colors"
            >
              Checkout
            </button>
          </div>
        )}

        {confirmOpen && (
          <ConfirmOrder
            isOpen={confirmOpen}
            items={items}
            onClose={() => setConfirmOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
