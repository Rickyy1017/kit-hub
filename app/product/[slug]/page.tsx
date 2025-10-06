'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import Header from '../../../components/Header';

// Import data from the main page
const teams = [
  { name: 'Real Madrid Home 2024', slug: 'madrid', logo: '/madrid/madrid-home-2025.jpg', backImage: '/madrid/madrid-home-back-2025.jpg', price: 18999, description: 'Home Kit 2024' },
  { name: 'Barcelona Home 2024', slug: 'barcelona', logo: '/barcelona/barcelona-home-2025.jpg', backImage: '/barcelona/barcelona-home-back-2025.jpg', price: 18999, description: 'Home Kit 2024' },
  { name: 'Manchester City Home 2024', slug: 'mancity', logo: '/mancity/mancity-home-2024.jpg', backImage: '/mancity/mancity-home-2024-back.jpg', price: 18999, description: 'Home Kit 2024' },
  { name: 'Liverpool Home 2024', slug: 'liverpool', logo: '/liverpool/liverpool-home-2025.jpg', backImage: '/liverpool/liverpool-home-back-2025.jpg', price: 18999, description: 'Home Kit 2024' },
  { name: 'Arsenal Home 2025', slug: 'arsenal', logo: '/arsenal/arsenal-home-2025.jpg', backImage: '/arsenal/arsenal-home-back-2025.jpg', price: 18999, description: 'Home Kit 2025' },
  { name: 'Chelsea Home 2024', slug: 'chelsea', logo: '/chelsea/chelsea-home-2024.jpg', backImage: '/chelsea/chelsea-home-2024-back.jpg', price: 18999, description: 'Home Kit 2024' },
  { name: 'Manchester United Home 2024', slug: 'manU', logo: '/manU/manU-home-2025.jpg', backImage: '/manU/manU-home-back-2025.jpg', price: 18999, description: 'Home Kit 2024' },
  { name: 'AC Milan Home 2024', slug: 'acmilan', logo: '/acmilan/acmilan-home-2025.jpg', backImage: '/acmilan/acmilan-home-back-2025.jpg', price: 18999, description: 'Home Kit 2024' },
  { name: 'Argentina Home 2024', slug: 'argentina', logo: '/argentina/argentina-home-2024.jpg', backImage: '/argentina/argentina-home-2024-back.jpg', price: 18999, description: 'Home Kit 2024' },
  { name: 'Portugal Home 2024', slug: 'portugal', logo: '/portugal/portugal-home-2024.jpg', backImage: '/portugal/portugal-home-2024-back.jpg', price: 18999, description: 'Home Kit 2024' },
  { name: 'Athletic Club Home 2024', slug: 'athletic', logo: '/athletic/athletic-club-2025.jpg', backImage: '/athletic/athletic-club-2024-back.jpg', price: 18999, description: 'Home Kit 2024' },
  { name: 'Atlético Madrid Home 2024', slug: 'athletico', logo: '/athletico/athletico-home-2025.jpg', backImage: '/athletico/athletico-home-2025-back.jpg', price: 18999, description: 'Home Kit 2024' },
];

const specialEditionJerseys = [
  { name: 'Argentina Special Edition', slug: 'argentina-special', logo: '/special-edition/argentina-special-edition.jpg', backImage: '/special-edition/argentina-special-edition.jpg', price: 26999, description: 'Special Edition Kit' },
  { name: 'Barcelona Coldplay Special Edition', slug: 'barcelona-coldplay', logo: '/special-edition/barcelona-coldplay-special-edition.jpg', backImage: '/special-edition/barcelona-coldplay-special-edition-back.jpg', price: 26999, description: 'Special Edition Kit' },
  { name: 'Brazil Christ the Redeemer Special Edition', slug: 'brazil-christ', logo: '/special-edition/brazil-2024-christ-the-reedeemer-special jersey.jpg', backImage: '/special-edition/brazil-2024-christ-the-reedeemer-special jersey.jpg', price: 26999, description: 'Special Edition Kit' },
  { name: 'Brazil Special Pigeon Edition', slug: 'brazil-pigeon', logo: '/special-edition/brazil-special-pidgeon-edition.jpeg', backImage: '/special-edition/brazil-special-pidgeon-edition.jpeg', price: 26999, description: 'Special Edition Kit' },
  { name: 'Italy Special Edition', slug: 'italy-special', logo: '/special-edition/italy-special-edition.avif', backImage: '/special-edition/italy-special-edition-back.webp', price: 26999, description: 'Special Edition Kit' },
  { name: 'Japan Special Dragon Edition', slug: 'japan-dragon', logo: '/special-edition/japan-special-dragon.png', backImage: '/special-edition/japan-special-dragon-back.webp', price: 26999, description: 'Special Edition Kit' },
  { name: 'Messi All Teams Special Edition', slug: 'messi-all-teams', logo: '/special-edition/messi-all-teams-special-edition.png', backImage: '/special-edition/messi-all-teams-special-edition-back.jpg', price: 26999, description: 'Special Edition Kit' },
  { name: 'Real Madrid Dragon Special Edition', slug: 'madrid-dragon', logo: '/special-edition/Real_Madrid_Dragon_Special_Edition_Jersey_2025.webp', backImage: '/special-edition/Real_Madrid_Dragon_Special_Edition_Jersey_2025.webp', price: 26999, description: 'Special Edition Kit' },
  { name: 'Real Madrid Dragon Black Kit', slug: 'madrid-dragon-black', logo: '/special-edition/real-madrid-dragon-black-kit.webp', backImage: '/special-edition/real-madrid-dragon-black-kit.webp', price: 26999, description: 'Special Edition Kit' },
];

const additionalJerseys = [
  // Real Madrid
  { name: 'Real Madrid Away', slug: 'real-madrid-away', logo: '/madrid/madrid-away-2025.jpg', backImage: '/madrid/madrid-away-back-2025.jpg', price: 18999, isSpecialEdition: false, description: 'Away Kit 2024' },
  { name: 'Real Madrid Third', slug: 'real-madrid-third', logo: '/madrid/madrid-third-2025.jpg', backImage: '/madrid/madrid-third-back-2025.jpg', price: 18999, isSpecialEdition: false, description: 'Third Kit 2024' },
  // Barcelona
  { name: 'Barcelona Away', slug: 'barcelona-away', logo: '/barcelona/barcelona-away-2025.jpg', backImage: '/barcelona/barcelona-away-2025-back.jpg', price: 18999, isSpecialEdition: false, description: 'Away Kit 2024' },
  { name: 'Barcelona Retro 2010', slug: 'barcelona-retro-2010', logo: '/barcelona/barcelona-2010-retro.jpg', backImage: '/barcelona/barcelona-2010-retro.jpg', price: 18999, isSpecialEdition: false, description: 'Retro Kit 2010' },
  // Manchester City
  { name: 'Manchester City Away 2024', slug: 'mancity-away-2024', logo: '/mancity/mancity-away-2024.jpg', backImage: '/mancity/mancity-away-2024-back.jpg', price: 18999, isSpecialEdition: false, description: 'Away Kit 2024' },
  { name: 'Manchester City Home 2025', slug: 'mancity-home-2025', logo: '/mancity/mancity-home-2025.jpg', backImage: '/mancity/mancity-home-2025-back.jpg', price: 18999, isSpecialEdition: false, description: 'Home Kit 2025' },
  { name: 'Manchester City Third 2024', slug: 'mancity-third-2024', logo: '/mancity/mancity-third-2024.jpg', backImage: '/mancity/mancity-third-2024-back.jpg', price: 18999, isSpecialEdition: false, description: 'Third Kit 2024' },
  { name: 'Manchester City Third 2025', slug: 'mancity-third-2025', logo: '/mancity/mancity-third-2025.jpg', backImage: '/mancity/mancity-third-2025-back.jpg', price: 18999, isSpecialEdition: false, description: 'Third Kit 2025' },
  // Liverpool
  { name: 'Liverpool Away', slug: 'liverpool-away', logo: '/liverpool/liverpool-away-2025.jpg', backImage: '/liverpool/liverpool-away-2025-back.jpg', price: 18999, isSpecialEdition: false, description: 'Away Kit 2024' },
  { name: 'Liverpool Third', slug: 'liverpool-third', logo: '/liverpool/liverpool-third-2025.jpg', backImage: '/liverpool/liverpool-third-back-2025.jpg', price: 18999, isSpecialEdition: false, description: 'Third Kit 2024' },
  // Arsenal
  { name: 'Arsenal Away', slug: 'arsenal-away', logo: '/arsenal/arsenal-away-2025.jpg', backImage: '/arsenal/arsenal-away-2025-back.jpg', price: 18999, isSpecialEdition: false, description: 'Away Kit 2024' },
  { name: 'Arsenal Away 2024', slug: 'arsenal-away-2024', logo: '/arsenal/arsenal-2024-away.jpg', backImage: '/arsenal/arsenal-2024-away-back.jpg', price: 18999, isSpecialEdition: false, description: 'Away Kit 2024' },
  { name: 'Arsenal Retro 2005', slug: 'arsenal-retro-2005', logo: '/arsenal/arsenal-2005-retro.jpg', backImage: '/arsenal/arsenal-2005-retro-back.jpg', price: 18999, isSpecialEdition: false, description: 'Retro Kit 2005' },
  { name: 'Arsenal Third', slug: 'arsenal-third', logo: '/arsenal/arsenal-third-2025.jpg', backImage: '/arsenal/arsenal-third-2025-back.jpg', price: 18999, isSpecialEdition: false, description: 'Third Kit 2024' },
  // Chelsea
  { name: 'Chelsea Away 2024', slug: 'chelsea-away-2024', logo: '/chelsea/chelsea-away-2024.jpg', backImage: '/chelsea/chelsea-away-2024-back.jpg', price: 18999, isSpecialEdition: false, description: 'Away Kit 2024' },
  { name: 'Chelsea Away 2025', slug: 'chelsea-away-2025', logo: '/chelsea/chelsea-away-2025.jpg', backImage: '/chelsea/chelsea-away-2025-back.jpg', price: 18999, isSpecialEdition: false, description: 'Away Kit 2025' },
  { name: 'Chelsea Home 2024', slug: 'chelsea-home-2024', logo: '/chelsea/chelsea-home-2024.jpg', backImage: '/chelsea/chelsea-home-2024-back.jpg', price: 18999, isSpecialEdition: false, description: 'Home Kit 2024' },
  { name: 'Chelsea Home 2025', slug: 'chelsea-home-2025', logo: '/chelsea/chelsea-home-2025.jpg', backImage: '/chelsea/chelsea-home-2025-back.jpg', price: 18999, isSpecialEdition: false, description: 'Home Kit 2025' },
  { name: 'Chelsea Third 2024', slug: 'chelsea-third-2024', logo: '/chelsea/chelsea-third-2024.jpg', backImage: '/chelsea/chelsea-third-2024-back.jpg', price: 18999, isSpecialEdition: false, description: 'Third Kit 2024' },
  { name: 'Chelsea Third 2025', slug: 'chelsea-third-2025', logo: '/chelsea/chelsea-third-2025.jpg', backImage: '/chelsea/chelsea-third-2025-back.jpg', price: 18999, isSpecialEdition: false, description: 'Third Kit 2025' },
  // Manchester United
  { name: 'Manchester United Away', slug: 'manu-away', logo: '/manU/manU-away-2025.jpg', backImage: '/manU/manU-away-back-2025.jpg', price: 18999, isSpecialEdition: false, description: 'Away Kit 2024' },
  { name: 'Manchester United Third', slug: 'manu-third', logo: '/manU/manU-third-2025.jpg', backImage: '/manU/manU-third-back-2025.jpg', price: 18999, isSpecialEdition: false, description: 'Third Kit 2024' },
  // AC Milan
  { name: 'AC Milan Away', slug: 'acmilan-away', logo: '/acmilan/acmilan-away-2025.jpg', backImage: '/acmilan/acmilan-away-2025-back.jpg', price: 18999, isSpecialEdition: false, description: 'Away Kit 2024' },
  { name: 'AC Milan Away 2024', slug: 'acmilan-away-2024', logo: '/acmilan/acmilan-2024-away.jpg', backImage: '/acmilan/acmilan-2024-away-back.jpg', price: 18999, isSpecialEdition: false, description: 'Away Kit 2024' },
  { name: 'AC Milan Home 2024', slug: 'acmilan-home-2024', logo: '/acmilan/acmilan-home-2024.jpg', backImage: '/acmilan/acmilan-home-2024-back.jpg', price: 18999, isSpecialEdition: false, description: 'Home Kit 2024' },
  { name: 'AC Milan Retro 2006', slug: 'acmilan-retro-2006', logo: '/acmilan/ac-milan-2006-retro.jpg', backImage: '/acmilan/ac-milan-2006-retro.jpg', price: 18999, isSpecialEdition: false, description: 'Retro Kit 2006' },
  { name: 'AC Milan Third', slug: 'acmilan-third', logo: '/acmilan/acmilan-2025-third.jpg', backImage: '/acmilan/acmilan-2025-third-back.jpg', price: 18999, isSpecialEdition: false, description: 'Third Kit 2024' },
  { name: 'AC Milan Third 2025', slug: 'acmilan-third-2025', logo: '/acmilan/acmilan-2025-third.jpg', backImage: '/acmilan/acmilan-2025-third-back.jpg', price: 18999, isSpecialEdition: false, description: 'Third Kit 2025' },
  // Argentina
  { name: 'Argentina Away 2024', slug: 'argentina-away-2024', logo: '/argentina/argentina-away-2024.jpg', backImage: '/argentina/argentina-away-2024-back.jpg', price: 18999, isSpecialEdition: false, description: 'Away Kit 2024' },
  { name: 'Argentina Home 2024', slug: 'argentina-home-2024', logo: '/argentina/argentina-home-2024.jpg', backImage: '/argentina/argentina-home-2024-back.jpg', price: 18999, isSpecialEdition: false, description: 'Home Kit 2024' },
  { name: 'Argentina Home 2026', slug: 'argentina-home-2026', logo: '/argentina/argentina-home-2026.jpg', backImage: '/argentina/argentina-home-2026-back.jpg', price: 18999, isSpecialEdition: false, description: 'Home Kit 2026' },
  // Portugal
  { name: 'Portugal Away 2025', slug: 'portugal-away-2025', logo: '/portugal/portugal-away-2025.jpg', backImage: '/portugal/portugal-away-2025-back.jpg', price: 18999, isSpecialEdition: false, description: 'Away Kit 2025' },
  { name: 'Portugal Home 2024', slug: 'portugal-home-2024', logo: '/portugal/portugal-home-2024.jpg', backImage: '/portugal/portugal-home-2024-back.jpg', price: 18999, isSpecialEdition: false, description: 'Home Kit 2024' },
  { name: 'Portugal Home 2025', slug: 'portugal-home-2025', logo: '/portugal/portugal-home-2025.jpg', backImage: '/portugal/portugal-home-2025-back.jpg', price: 18999, isSpecialEdition: false, description: 'Home Kit 2025' },
  // Athletic Club
  { name: 'Athletic Club', slug: 'athletic-club', logo: '/athletic/athletic-club-2025.jpg', backImage: '/athletic/athletic-club-2024-back.jpg', price: 18999, isSpecialEdition: false, description: 'Home Kit 2024' },
  // Atlético Madrid
  { name: 'Atlético Madrid Away', slug: 'athletico-away', logo: '/athletico/athletico-away-2025.jpg', backImage: '/athletico/athletico-away-2025-back.jpg', price: 18999, isSpecialEdition: false, description: 'Away Kit 2024' },
  { name: 'Atlético Madrid Home', slug: 'athletico-home', logo: '/athletico/athletico-home-2025.jpg', backImage: '/athletico/athletico-home-2025-back.jpg', price: 18999, isSpecialEdition: false, description: 'Home Kit 2024' },
  { name: 'Atlético Madrid Third', slug: 'athletico-third', logo: '/athletico/athletico-third-2025.jpg', backImage: '/athletico/athletico-third-2025-back.jpg', price: 18999, isSpecialEdition: false, description: 'Third Kit 2024' },
  { name: 'Atlético Madrid Pre-Match', slug: 'athletico-pre-match', logo: '/athletico/athletico-pre-match-2025.jpg', backImage: '/athletico/athletico-pre-match-2025-back.jpg', price: 18999, isSpecialEdition: false, description: 'Pre-Match Kit 2024' },
];

const allProducts = [...teams, ...specialEditionJerseys, ...additionalJerseys];

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug?.toString() || '';
  const { addItem } = useCart();
  const router = useRouter();

  const product = allProducts.find(p => p.slug === slug);

  const [currentImage, setCurrentImage] = useState<'front' | 'back'>('front');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      name: product.name,
      image: product.logo,
      price: product.price || 18999,
      size: selectedSize,
      quantity: quantity,
      slug: product.slug
    });
    toast.success(`Added ${quantity} ${product.name} (Size: ${selectedSize}) to cart!`);
  };

  const handleCheckout = () => {
    addItem({
      name: product.name,
      image: product.logo,
      price: product.price || 18999,
      size: selectedSize,
      quantity: quantity,
      slug: product.slug
    });
    toast.success(`Added ${quantity} ${product.name} (Size: ${selectedSize}) to cart!`);
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden">
              <Image
                src={currentImage === 'front' ? product.logo : (product.backImage || product.logo)}
                alt={`${product.name} ${currentImage} view`}
                fill
                className="object-contain"
                onError={(e) => {
                  e.currentTarget.src = '/madrid/madrid-home-2025.jpg';
                }}
              />
            </div>

            {/* View Toggle Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentImage('front')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentImage === 'front'
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-text hover:bg-secondary/80'
                }`}
              >
                ←

              </button>
              <button
                onClick={() => setCurrentImage('back')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentImage === 'back'
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-text hover:bg-secondary/80'
                }`}
              >
                 →
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-text mb-2">{product.name}</h1>
              <p className="text-text-muted">{product.description}</p>
            </div>

            <div className="text-3xl font-bold text-primary">
              ₦{product.price?.toLocaleString() || '18999'}
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Size
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-card text-text focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {/* <option value="XS">XS</option> */}
                {/* <option value="S">S</option> */}
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>

            {/* Quantity Selection */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-card text-text focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full btn-primary py-3 text-lg font-semibold"
              >
                Add to Cart - ₦{(product.price || 18999) * quantity}
              </button>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold rounded-lg transition-colors"
              >
                Buy Now - ₦{(product.price || 18999) * quantity}
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <ul className="space-y-2 text-text-muted">
                <li>• Premium quality jersey material</li>
                <li>• Official team colors and design</li>
                <li>• Comfortable fit for all activities</li>
                <li>• Machine washable</li>
                <li>• Available in multiple sizes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
