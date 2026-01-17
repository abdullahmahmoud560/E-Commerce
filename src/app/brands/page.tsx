'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BrandCardProps {
  logo: string;
  name: string;
  id?: number;
}

const BrandCard = ({ logo, name, id }: BrandCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const router = useRouter();

  const handleClick = () => {
    // Convert brand name to URL-friendly format
    const brandSlug = name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/brands/${brandSlug}`);
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg transition-all duration-300 cursor-pointer ${
        isHovered ? 'shadow-lg border-gray-300' : 'shadow-sm'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative h-64 w-full flex items-center justify-center">
        {logo.startsWith('/') ? (
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="text-6xl font-bold p-4">
            {logo}
          </div>
        )}
      </div>
      <div className="border-t border-gray-200 p-4 text-center">
        <h3 className={`font-medium text-base transition-colors duration-300 ${
          isHovered ? 'text-orange-500' : 'text-gray-900'
        }`}>{name}</h3>
      </div>
    </div>
  );
};

const FreshCartBrands = () => {
  const brands = [
    { id: 1, logo: '/images/brands/1.jpg', name: 'Canon' },
    { id: 2, logo: '/images/brands/2.jpg', name: 'Dell' },
    { id: 3, logo: '/images/brands/3.jpg', name: 'Lenovo' },
    { id: 4, logo: '/images/brands/4.jpg', name: 'SONY' },
    { id: 5, logo: '/images/brands/5.jpg', name: 'Infinix' },
    { id: 6, logo: '/images/brands/6.jpg', name: 'Realme' },
    { id: 7, logo: '/images/brands/7.jpg', name: 'HONOR' },
    { id: 8, logo: '/images/brands/8.jpg', name: 'Nokia' },
    { id: 9, logo: '/images/brands/9.jpg', name: 'OPPO' },
    { id: 10, logo: '/images/brands/10.jpg', name: 'Huawei' },
    { id: 11, logo: '/images/brands/11.jpg', name: 'Apple' },
    { id: 12, logo: '/images/brands/12.jpg', name: 'Xiaomi' },
    { id: 13, logo: '/images/brands/13.jpg', name: 'Samsung' },
    { id: 14, logo: '/images/brands/14.jpg', name: 'Jack & Jones' },
    { id: 15, logo: '/images/brands/15.jpg', name: 'LC Waikiki' },
    { id: 16, logo: '/images/brands/16.jpg', name: 'Andora' },
    { id: 17, logo: '/images/brands/17.jpg', name: 'Puma' },
    { id: 18, logo: '/images/brands/18.jpg', name: 'Skechers' },
    { id: 19, logo: '/images/brands/19.jpg', name: 'Reserved' },
    { id: 20, logo: '/images/brands/20.jpg', name: 'Reebok' },
    { id: 21, logo: '/images/brands/21.jpg', name: 'Adidas' },
    { id: 22, logo: '/images/brands/22.jpg', name: 'Nike' },
    { id: 23, logo: '/images/brands/23.jpg', name: 'Defacto' },
    { id: 24, logo: '/images/brands/24.jpg', name: 'Beko' },
    { id: 25, logo: '/images/brands/25.jpg', name: 'Kenwood' },
    { id: 26, logo: '/images/brands/26.jpg', name: 'Black + Decker' },
    { id: 27, logo: '/images/brands/27.jpg', name: 'Mienta' },
    { id: 28, logo: '/images/brands/28.jpg', name: 'Fresh' },
    { id: 29, logo: '/images/brands/29.jpg', name: 'Philips' },
    { id: 30, logo: '/images/brands/30.jpg', name: 'Toshiba' },
    { id: 31, logo: '/images/brands/31.jpg', name: 'Tornado' },
    { id: 32, logo: '/images/brands/33.jpg', name: 'Braun' },
    { id: 34, logo: '/images/brands/34.jpg', name: 'Garnier' },
    { id: 35, logo: '/images/brands/35.jpg', name: 'Essence' },
    { id: 36, logo: '/images/brands/36.jpg', name: 'Bourjois' },
    { id: 37, logo: '/images/brands/37.jpg', name: 'Kemei' },
    { id: 38, logo: '/images/brands/38.jpg', name: 'Loreal' },
    { id: 39, logo: '/images/brands/39.jpg', name: 'Maybelline' },
    { id: 40, logo: '/images/brands/10.jpg', name: 'Huawei' },
    { id: 41, logo: '/images/brands/11.jpg', name: 'Apple' }
  ];


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <BrandCard key={brand.id} {...brand} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FreshCartBrands;