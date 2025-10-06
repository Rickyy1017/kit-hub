'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import Header from '../../components/Header';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
  slug: string;
}

export default function CartPage() {
  const { state, updateQuantity, removeItem, clearCart } = useCart();

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    } else {
      removeItem(id);
    }
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12">
        <Header />
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-text mb-4">Your Cart is Empty</h1>
            <p className="text-text-muted mb-8">Add some amazing jerseys to get started!</p>
            <Link href="/" className="btn-primary px-6 py-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.total;
  const shipping = 2500; // Fixed shipping cost
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background py-8">
      <Header />
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-3/4">
            <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-6">
              <h1 className="text-2xl font-bold text-text mb-4">Shopping Cart</h1>
              <p className="text-text-muted mb-6">{totalItems} items in your cart</p>
              
              {state.items.map((item: CartItem) => (
                <div key={item.id} className="flex items-center space-x-4 border-b border-border pb-4 mb-4 last:border-b-0 last:mb-0">
                  <div className="relative w-20 h-20 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text truncate">{item.name}</h3>
                    <p className="text-sm text-text-muted">Size: {item.size}</p>
                    <p className="text-lg font-bold text-primary">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-secondary hover:bg-accent flex items-center justify-center text-text transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-secondary hover:bg-accent flex items-center justify-center text-text transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <Link href="/" className="btn-secondary px-6 py-3">
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="btn-secondary px-6 py-3 ml-4"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/4">
            <div className="bg-card rounded-lg shadow-sm border border-border p-6 sticky top-8">
              <h2 className="text-xl font-bold text-text mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Subtotal ({totalItems} items):</span>
                  <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Shipping:</span>
                  <span className="font-semibold">₦{shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span>Total:</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              <Link href="/checkout" className="w-full btn-primary py-3 block text-center">
                Proceed to Checkout
              </Link>
              
              <p className="text-xs text-text-muted text-center mt-3">
                Secure checkout with multiple payment options
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
