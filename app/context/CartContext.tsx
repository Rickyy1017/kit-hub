import { useCartStore } from '../../lib/store';

export const useCart = () => {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  return {
    state: { items, total },
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
};
