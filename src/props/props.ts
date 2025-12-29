export type MenuItem = {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  image: string;
  description: string;
};

export type CategoryItem = {
  id: number;
  name: string;
};

export type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

export type Order = {
  email?: string;
  noMeja?: number;
  note?: string;
  items: CartItem[];
};
