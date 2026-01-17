import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart } from 'react-icons/fa';

// Sample product data
const products = [
  { id: 1, name: 'Woman Shawl', image: '/images/FeaturedProducts/1.jpg', rating: 4.8, price: '191 EGP' },
  { id: 2, name: 'Woman Shawl', image: '/images/FeaturedProducts/2.jpg', rating: 4.8, price: '149 EGP' },
  { id: 3, name: 'Woman Shawl', image: '/images/FeaturedProducts/3.jpg', rating: 4.8, price: '149 EGP' },
  { id: 4, name: 'Woman Shawl', image: '/images/FeaturedProducts/4.jpg', rating: 4.8, price: '149 EGP' },
  { id: 5, name: 'Woman Shawl', image: '/images/FeaturedProducts/5.jpg', rating: 4.2, price: '349 EGP' },
  { id: 6, name: 'Woman Bordeaux Long Sleeve', image: '/images/FeaturedProducts/6.jpg', rating: 4.2, price: '499 EGP' },
  { id: 7, name: 'Woman Brown Long Sleeve', image: '/images/FeaturedProducts/7.jpg', rating: 4.7, price: '499 EGP' },
  { id: 8, name: 'Woman Standart Fit Knitted', image: '/images/FeaturedProducts/8.jpg', rating: 4.8, price: '499 EGP' },
  { id: 9, name: 'Relaxed Fit Knitted Joggers', image: '/images/FeaturedProducts/9.jpg', rating: 4.8, price: '499 EGP' },
  { id: 10, name: 'Woman Socks', image: '/images/FeaturedProducts/10.jpg', rating: 4.3, price: '199 EGP' },
  { id: 11, name: 'Woman Karma Socks Multicolour', image: '/images/FeaturedProducts/11.jpg', rating: 4.3, price: '199 EGP' },
  { id: 12, name: 'Logo T-Shirt Green', image: '/images/FeaturedProducts/12.jpg', rating: 2, price: '744 EGP' },
  { id: 13, name: 'Orca Leather Boots Anthracite', image: '/images/FeaturedProducts/13.jpg', rating: 4.9, price: '4829 EGP' },
  { id: 14, name: 'Softride Enzo NXT CASTLEROCK-High', image: '/images/FeaturedProducts/14.jpg', rating: 2.8, price: '2999 EGP' },
  { id: 15, name: 'ESS Big Logo Hoodie', image: '/images/FeaturedProducts/15.jpg', rating: 4.8, price: '2649 EGP' },
  { id: 16, name: 'Sportswear Club Graphic Hoodie', image: '/images/FeaturedProducts/16.jpg', rating: 4.8, price: '2449 EGP' },
  { id: 17, name: 'NSW Everyday Essentials No-Show', image: '/images/FeaturedProducts/17.jpg', rating: 4.2, price: '1079 EGP' },
  { id: 18, name: 'Court Tennis Track Pants', image: '/images/FeaturedProducts/18.jpg', rating: 2.8, price: '3159 EGP' },
  { id: 19, name: 'React Live Sneakers Black/White-Dk', image: '/images/FeaturedProducts/19.jpg', rating: 3.7, price: '4639 EGP' },
  { id: 20, name: 'Essentials Embroidered Linear Logo', image: '/images/FeaturedProducts/20.jpg', rating: 3.8, price: '749 EGP' },
  { id: 21, name: 'Salah Track Top', image: '/images/FeaturedProducts/21.jpg', rating: 3.2, price: '1749 EGP' },
  { id: 22, name: 'Adicolor Classics Beckenbauer Primeblue', image: '/images/FeaturedProducts/22.jpg', rating: 3.8, price: '2379 EGP' },
  { id: 23, name: 'Duramo 10 Running Shoes', image: '/images/FeaturedProducts/23.jpg', rating: 3.8, price: '1999 EGP' },
  { id: 24, name: 'Hoops 3.0 Low Classic', image: '/images/FeaturedProducts/24.jpg', rating: 4.5, price: '1629 EGP' },
  { id: 25, name: 'Galaxy 6 Running Shoes', image: '/images/FeaturedProducts/25.jpg', rating: 5, price: '1629 EGP' },
  { id: 26, name: 'Slim Fit Long Sleeve', image: '/images/FeaturedProducts/26.jpg', rating: 4.7, price: '549 EGP' },
  { id: 27, name: 'Crew Neck Long Sleeve', image: '/images/FeaturedProducts/27.jpg', rating: 4.7, price: '449 EGP' },
  { id: 28, name: 'Crew Neck Long Sleeve', image: '/images/FeaturedProducts/28.jpg', rating: 2, price: '599 EGP' },
  { id: 29, name: 'Crew Neck Long Sleeve', image: '/images/FeaturedProducts/29.jpg', rating: 5, price: '549 EGP' },
  { id: 30, name: 'Polo Collar Short Sleeve', image: '/images/FeaturedProducts/30.jpg', rating: 3, price: '349 EGP' },
  { id: 31, name: 'Crew Neck Long Sleeve', image: '/images/FeaturedProducts/31.jpg', rating: 3, price: '549 EGP' },
  { id: 32, name: 'Standard Pattern Plaid Fleece', image: '/images/FeaturedProducts/32.jpg', rating: 2.7, price: '699 EGP' },
  { id: 33, name: 'Slim Fit Stand Collar', image: '/images/FeaturedProducts/33.jpg', rating: 2.6, price: '1499 EGP' },
  { id: 34, name: 'Archer VR300 AC1200 Wireless', image: '/images/FeaturedProducts/34.jpg', rating: 4.5, price: '1699 EGP' },
  { id: 35, name: 'PIXMA G3420 Multi-Function Inkjet', image: '/images/FeaturedProducts/35.jpg', rating: 4.5, price: '5999 EGP' },
  { id: 36, name: 'EOS M50 Mark II', image: '/images/FeaturedProducts/36.jpg', rating: 4.3, price: '19699 EGP' },
  { id: 37, name: 'PS5 DualSense Charging Station', image: '/images/FeaturedProducts/37.jpg', rating: 4.3, price: '1045 EGP' },
  { id: 38, name: 'Galaxy Buds 2 Graphite', image: '/images/FeaturedProducts/38.jpg', rating: 4.3, price: '3999 EGP' },
  { id: 39, name: 'WH-CH510 Wireless On-Ear Bluetooth', image: '/images/FeaturedProducts/39.jpg', rating: 4.3, price: '1949 EGP' },
  { id: 40, name: 'Victus 16-D1016Ne Laptop', image: '/images/FeaturedProducts/40.jpg', rating: 4.3, price: '42960 EGP' },
];


const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star}>
        {rating >= star ? (
          <FaStar className="text-yellow-400" />
        ) : rating >= star - 0.5 ? (
          <FaStarHalfAlt className="text-yellow-400" />
        ) : (
          <FaRegStar className="text-yellow-400" />
        )}
      </span>
    ))}
  </div>
);

interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the product click handler from firing
    
    if (status === 'unauthenticated') {
      // Redirect to login with a return URL to the current page
      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    
    // TODO: Add to cart logic here
    console.log('Adding to cart:', product.id);
  };
  
  const handleProductClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on the "Add to Cart" button
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    
    if (status === 'unauthenticated') {
      // Redirect to login with a return URL to the product page
      router.push(`/login?callbackUrl=${encodeURIComponent(`/products/${product.id}`)}`);
    } else {
      // User is authenticated, navigate to product page
      router.push(`/products/${product.id}`);
    }
  };

  return (
    <div 
      onClick={handleProductClick}
      className="group bg-white rounded-lg overflow-hidden border-2 border-gray-200 hover:border-orange-400 transition-all hover:shadow-lg cursor-pointer h-full flex flex-col"
    >
      <div className="p-4 flex-1 flex flex-col">
        {/* Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 p-2"
          />
        </div>

        {/* Product Info */}
        <h3 className="text-base font-medium text-gray-900 mb-2 line-clamp-2 h-12">{product.name}</h3>
        
        <div className="mt-auto">
          <div className="mb-2">
            <StarRating rating={product.rating} />
          </div>

          {/* Price */}
          <p className="text-xl font-bold text-orange-600 mb-3">{product.price}</p>

          {/* Add to Cart */}
          <div className="overflow-hidden">
            <button
              onClick={handleAddToCart}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container m-auto px-4">
        <div className="max-w-4xl mb-10 px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
          <p className="text-gray-500">Discover our best products</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
