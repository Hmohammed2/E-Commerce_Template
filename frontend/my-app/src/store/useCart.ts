import { create } from "zustand";
import { cartItem } from "../types/cart";
import { persist } from "zustand/middleware";
import { toast } from "react-hot-toast";

interface CartState {
  items: cartItem[];
  addItem: (item: cartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemCount: (id: number) => number;
  getCartItems: () => cartItem[];
  isInCart: (id: number) => boolean;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id);
        if (existingItem) {
          set({
            items: get().items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
          toast.success(
            `Increased quantity of ${item.title} to ${existingItem.quantity + item.quantity}`
          );
        } else {
          set({ items: [...get().items, item] });
          toast.success(`Added ${item.title} to cart`);
        }
      },
      removeItem: (id) => {
        const item = get().items.find((i) => i.id === id);
        if (item) {
          set({ items: get().items.filter((i) => i.id !== id) });
          toast.success(`Removed ${item.title} from cart`);
        }
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        const item = get().items.find((i) => i.id === id);
        if (item) {
          set({
            items: get().items.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
          });
          toast.success(`Updated quantity of ${item.title} to ${quantity}`);
        }
      },
      clearCart: () => {
        set({ items: [] });
        toast.success("Cleared cart");
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      getItemCount: (id) => {
        const item = get().items.find((i) => i.id === id);
        return item ? item.quantity : 0;
      },
      getCartItems: () => {
        return get().items;
      },
      isInCart: (id) => {
        return get().items.some((i) => i.id === id);
      },
    }),
    {
      name: "cart-storage", // unique name
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);
