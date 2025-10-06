import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
  slug: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      total: 0,

      addItem: (item) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (existingItem) => existingItem.slug === item.slug && existingItem.size === item.size
          );

          let newItems;
          if (existingItemIndex > -1) {
            newItems = [...state.items];
            newItems[existingItemIndex].quantity += item.quantity;
          } else {
            const newItem: CartItem = {
              ...item,
              id: `${item.slug}-${item.size}-${Date.now()}`
            };
            newItems = [...state.items, newItem];
          }

          const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

          return {
            items: newItems,
            total: newTotal
          };
        });
      },

      removeItem: (id) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
          return {
            items: newItems,
            total: newTotal
          };
        });
      },

      updateQuantity: (id, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            const newItems = state.items.filter((item) => item.id !== id);
            const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            return {
              items: newItems,
              total: newTotal
            };
          }

          const newItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );
          const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

          return {
            items: newItems,
            total: newTotal
          };
        });
      },

      clearCart: () => {
        set({ items: [], total: 0 });
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items, total: state.total })
    }
  )
);
