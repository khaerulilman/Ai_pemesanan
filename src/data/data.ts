import api from "../lib/api";
import { type MenuItem, type CategoryItem } from "../props/props";

export async function menuData(): Promise<MenuItem[]> {
  const res = await api.get("/menus");
  return res.data.data;
}

export async function categories(): Promise<CategoryItem[]> {
  const res = await api.get("/categories");
  return res.data.data;
}
