import { Product } from '@/types';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Description for product 1',
    price: 99.99,
    originalPrice: 129.99,
    image: '/images/products/1.jpg',
    category: 'electronics',
    rating: 4.5,
    reviewCount: 12,
    inStock: true,
    badge: 'New',
    discount: 23,
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'Description for product 2',
    price: 149.99,
    image: '/images/products/2.jpg',
    category: 'clothing',
    rating: 4.8,
    reviewCount: 24,
    inStock: true,
    badge: 'Hot',
  },
  // Add more sample products as needed
];
