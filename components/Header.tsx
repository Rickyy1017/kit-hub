'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../app/context/CartContext';
import { useTheme } from '../app/context/ThemeContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Bebas Neue, cursive' }}>KIT-HUB</h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#teams" className="hover:text-primary transition-colors">Teams</a>
            <a href="#products" className="hover:text-primary transition-colors">Products</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-secondary hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <Link href="/cart" className="btn-primary relative">
              Cart ({cartCount})
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 pt-4">
              <a href="#home" className="hover:text-primary transition-colors">Home</a>
              <a href="#teams" className="hover:text-primary transition-colors">Teams</a>
              <a href="#products" className="hover:text-primary transition-colors">Products</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-secondary hover:bg-accent transition-colors"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? '☀️' : '🌙'}
                </button>
                <Link href="/cart" className="btn-primary relative text-sm">
                  Cart ({cartCount})
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
