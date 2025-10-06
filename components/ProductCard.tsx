import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  name: string;
  image: string;
  price: number;
  description?: string;
  onAddToCart?: () => void;
  isSpecialEdition?: boolean;
  slug: string;
}

export default function ProductCard({
  name,
  image,
  price,
  description = "Latest Home Kit",
  onAddToCart,
  isSpecialEdition = false,
  slug
}: ProductCardProps) {
  return (
    <Link href={`/product/${slug}`} className="block">
      <div className="product-card bg-card border border-border overflow-hidden group cursor-pointer">
        <div className="relative h-64 bg-secondary overflow-hidden">
          {isSpecialEdition && (
            <div className="absolute top-2 left-2 z-10">
              <span className="bg-primary text-white px-2 py-1 text-xs font-bold rounded">
                SPECIAL EDITION
              </span>
            </div>
          )}
          <Image
            src={image}
            alt={`${name} jersey`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback to a placeholder if image fails to load
              e.currentTarget.src = '/madrid/madrid-home-2025.jpg';
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        <div className="p-6">
          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-text-muted mb-4">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">₦{price.toLocaleString()}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart?.();
              }}
              className="btn-primary"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
