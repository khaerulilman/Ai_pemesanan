"use client";

import { useEffect, useState } from "react";
import { type CartItem, type Order } from "../props/props";
import { createOrder } from "../data/order";

type ConfirmOrderProps = {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
};

type FormData = {
  email: string;
  noMeja: string;
  note: string;
};

const STORAGE_KEY = "confirm_order_form";

export default function ConfirmOrder({
  isOpen,
  onClose,
  items = [],
}: ConfirmOrderProps) {
  const [form, setForm] = useState<FormData>({
    email: "",
    noMeja: "",
    note: "",
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setForm(JSON.parse(saved));
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form, isLoaded]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrder = async () => {
    setError(null);
    setSuccess(false);

    if (!form.noMeja) {
      setError("No meja wajib diisi");
      return;
    }

    if (items.length === 0) {
      setError("Keranjang kosong");
      return;
    }

    const order: Order = {
      email: form.email || undefined,
      noMeja: Number(form.noMeja), // convert di sini
      note: form.note || undefined,
      items,
    };

    try {
      await createOrder(order);

      setSuccess(true);
      localStorage.removeItem(STORAGE_KEY);
      onClose();
    } catch (err: any) {
      setError(err.message || "Gagal mengirim order");
    }
  };

  if (!isOpen || !isLoaded) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/50">
      <div className="bg-white w-full md:w-[480px] md:max-h-[90vh] rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-[#E4E7EB]">
          <h2 className="text-xl font-semibold text-[#1F2933]">
            Konfirmasi Pesanan
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-[#616E7C] hover:text-[#1F2933] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-5">
            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#1F2933]"
              >
                Email <span className="text-[#DC2626]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="contoh@email.com"
                className="w-full border border-[#E4E7EB] rounded-lg px-4 py-2.5 text-[#1F2933] placeholder:text-[#9AA5B1] focus:outline-none focus:ring-2 focus:ring-[#3D5A4C] focus:border-transparent transition-shadow"
              />
            </div>

            {/* Table Number Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="noMeja"
                className="text-sm font-medium text-[#1F2933]"
              >
                Nomor Meja <span className="text-[#DC2626]">*</span>
              </label>
              <input
                id="noMeja"
                name="noMeja"
                type="number"
                value={form.noMeja}
                onChange={handleChange}
                placeholder="Contoh: 12"
                className="w-full border border-[#E4E7EB] rounded-lg px-4 py-2.5 text-[#1F2933] placeholder:text-[#9AA5B1] focus:outline-none focus:ring-2 focus:ring-[#3D5A4C] focus:border-transparent transition-shadow"
              />
            </div>

            {/* Note Textarea */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="note"
                className="text-sm font-medium text-[#1F2933]"
              >
                Catatan{" "}
                <span className="text-[#616E7C] font-normal">(opsional)</span>
              </label>
              <textarea
                id="note"
                name="note"
                rows={3}
                value={form.note}
                onChange={handleChange}
                placeholder="Contoh: tanpa sambal, pedas sedang"
                className="w-full border border-[#E4E7EB] rounded-lg px-4 py-2.5 text-[#1F2933] placeholder:text-[#9AA5B1] resize-none focus:outline-none focus:ring-2 focus:ring-[#3D5A4C] focus:border-transparent transition-shadow"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg">
                <span className="text-[#DC2626] text-sm font-medium">
                  ⚠ {error}
                </span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-center gap-2 px-4 py-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg">
                <span className="text-[#16A34A] text-sm font-medium">
                  ✓ Pesanan berhasil dikonfirmasi!
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-[#E4E7EB] bg-[#FAFAF8]">
          <button
            onClick={handleOrder}
            disabled={success}
            className="w-full bg-[#3D5A4C] hover:bg-[#2F4A3E] disabled:bg-[#9AA5B1] disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
          >
            {success ? "Memproses..." : "Konfirmasi Pesanan"}
          </button>
        </div>
      </div>
    </div>
  );
}
