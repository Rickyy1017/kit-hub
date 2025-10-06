'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import SearchFilters from '../components/SearchFilters';
import { useCart } from './context/CartContext';
import toast from 'react-hot-toast';

// Sample data for demonstration
const teams = [
  { name: 'Real Madrid Home 2024', slug: 'madrid', logo: '/madrid/madrid-home-2025.jpg', backImage: '/madrid/madrid-home-back-2025.jpg', description: 'Home Kit 2024' },
  { name: 'Barcelona Home 2024', slug: 'barcelona', logo: '/barcelona/barcelona-home-2025.jpg', backImage: '/barcelona/barcelona-home-back-2025.jpg', description: 'Home Kit 2024' },
  { name: 'Manchester City Home 2024', slug: 'mancity', logo: '/mancity/mancity-home-2024.jpg', backImage: '/mancity/mancity-home-2024-back.jpg', description: 'Home Kit 2024' },
  { name: 'Liverpool Home 2024', slug: 'liverpool', logo: '/liverpool/liverpool-home-2025.jpg', backImage: '/liverpool/liverpool-home-back-2025.jpg', description: 'Home Kit 2024' },
  { name: 'Arsenal Home 2025', slug: 'arsenal', logo: '/arsenal/arsenal-home-2025.jpg', backImage: '/arsenal/arsenal-home-back-2025.jpg', description: 'Home Kit 2025' },
  { name: 'Chelsea Home 2024', slug: 'chelsea', logo: '/chelsea/chelsea-home-2024.jpg', backImage: '/chelsea/chelsea-home-2024-back.jpg', description: 'Home Kit 2024' },
  { name: 'Manchester United Home 2024', slug: 'manU', logo: '/manU/manU-home-2025.jpg', backImage: '/manU/manU-home-back-2025.jpg', description: 'Home Kit 2024' },
  { name: 'AC Milan Home 2024', slug: 'acmilan', logo: '/acmilan/acmilan-home-2025.jpg', backImage: '/acmilan/acmilan-home-back-2025.jpg', description: 'Home Kit 2024' },
  { name: 'Argentina Home 2024', slug: 'argentina', logo: '/argentina/argentina-home-2024.jpg', backImage: '/argentina/argentina-home-2024-back.jpg', description: 'Home Kit 2024' },
  { name: 'Portugal Home 2024', slug: 'portugal', logo: '/portugal/portugal-home-2024.jpg', backImage: '/portugal/portugal-home-2024-back.jpg', description: 'Home Kit 2024' },
  { name: 'Athletic Club Home 2024', slug: 'athletic', logo: '/athletic/athletic-club-2025.jpg', backImage: '/athletic/athletic-club-2024-back.jpg', description: 'Home Kit 2024' },
  { name: 'Atlético Madrid Home 2024', slug: 'athletico', logo: '/athletico/athletico-home-2025.jpg', backImage: '/athletico/athletico-home-2025-back.jpg', description: 'Home Kit 2024' },
];

// Special edition jerseys (excluding those with "back" in the name)
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

// Additional jerseys for each team
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

// Combine all products
const allProducts = [
  ...teams.map(team => ({ ...team, price: 18999, isSpecialEdition: false })),
  ...additionalJerseys,
  ...specialEditionJerseys.map(jersey => ({ ...jersey, isSpecialEdition: true }))
];

const years = ['2024', '2025', 'retro'];

export default function Home() {
  const { addItem } = useCart();
  const [selectedClub, setSelectedClub] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [filteredTeams, setFilteredTeams] = useState(teams);
  const [showAllProducts, setShowAllProducts] = useState(false);

  useEffect(() => {
    let filteredProductsList = allProducts;

    if (selectedClub) {
      filteredProductsList = filteredProductsList.filter(product =>
        product.name.toLowerCase().includes(selectedClub.toLowerCase())
      );
    }

    if (selectedYear) {
      // This would filter by year in a real application
      // For now, we'll just keep all products as we don't have year-specific data
    }

    setFilteredProducts(filteredProductsList);

    let filteredTeamsList = teams;

    if (selectedClub) {
      filteredTeamsList = filteredTeamsList.filter(team =>
        team.name.toLowerCase().includes(selectedClub.toLowerCase())
      );
    }

    setFilteredTeams(filteredTeamsList);
  }, [selectedClub, selectedYear]);

  const handleAddToCart = (product: any) => {
    addItem({
      name: product.name,
      image: product.logo,
      price: product.price,
      size: 'M', // Default size
      quantity: 1,
      slug: product.slug
    });
    toast.success(`Added ${product.name} to cart!`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section id="home" className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="section-title text-foreground mb-6">
            Welcome to <span className="text-primary">Kit-Hub</span>
          </h1>
          <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
            Discover authentic football jerseys from the world&apos;s top clubs.
            From classic retro kits to the latest season releases.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <button className="btn-primary">
              Shop Now
            </button> */}
            <button className="btn-secondary">
              View Collections
            </button>
          </div>
        </div>
      </section>

      <SearchFilters
        selectedClub={selectedClub}
        selectedYear={selectedYear}
        onClubChange={setSelectedClub}
        onYearChange={setSelectedYear}
        resultsCount={filteredProducts.length}
      />

      {/* Featured Products */}
      <section id="products" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="section-title text-center mb-12">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.slice(0, showAllProducts ? filteredProducts.length : 8).map((product) => (
              <ProductCard
                key={product.slug}
                name={product.name}
                image={product.logo}
                price={product.price}
                description={product.description || (product.isSpecialEdition ? "Special Edition Kit" : "Latest Home Kit")}
                onAddToCart={() => handleAddToCart(product)}
                isSpecialEdition={product.isSpecialEdition}
                slug={product.slug}
              />
            ))}
          </div>

          {!showAllProducts && filteredProducts.length > 8 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllProducts(true)}
                className="btn-secondary"
              >
                View More Products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Teams Showcase */}
      <section id="teams" className="py-16 px-4 bg-secondary">
        <div className="container mx-auto">
          <h2 className="section-title text-center mb-12">
            Available Teams
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {filteredTeams.map((team) => (
              <div key={team.slug} className="text-center group cursor-pointer">
                <div className="relative w-20 h-20 mx-auto mb-3 bg-card rounded-full p-2 border border-border group-hover:border-primary transition-colors">
                  <Image
                    src={team.logo}
                    alt={team.name}
                    fill
                    className="object-cover rounded-full"
                    onError={(e) => {
                      e.currentTarget.src = '/madrid/madrid-home-2025.jpg';
                    }}
                  />
                </div>
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                  {team.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Bebas Neue, cursive' }}>KIT-HUB</h3>
              <p className="text-text-muted">
                Your ultimate destination for authentic football jerseys and sports merchandise.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-text-muted">
                <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Teams</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Products</a></li>
                {/* <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li> */}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-text-muted">
                <li><a href="#" className="hover:text-primary transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-text-muted">
                {/* <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li> */}
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                {/* <li><a href="#" className="hover:text-primary transition-colors">Facebook</a></li> */}
                {/* <li><a href="#" className="hover:text-primary transition-colors">YouTube</a></li> */}
                <li><a href="https://wa.link/zxhd2a" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-text-muted">
            <p>&copy; 2025 Kit-Hub. Designed and constructed by eR1k. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
