import api from "../lib/api";
import { type Order } from "../props/props";

export async function createOrder(order: Order) {
  try {
    const response = await api.post("/order", order);

    return response.data;
  } catch (error: any) {
    console.error("Create order error:", error);

    throw (
      error.response?.data || {
        success: false,
        message: "Gagal membuat order",
      }
    );
  }
}
