'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CategoriesSection = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const categories = [
    { id: 1, name: 'Beauty & Health', image: '/images/categories/beauty.jpg' },
    { id: 2, name: 'Mobiles', image: '/images/categories/mobiles.jpg' },
    { id: 3, name: 'Electronics', image: '/images/categories/electronics.jpg' },
    { id: 4, name: 'Music', image: '/images/categories/music.jpg' },
    { id: 5, name: "Men's Fashion", image: '/images/categories/men-fashion.jpg' },
    { id: 6, name: "Women's Fashion", image: '/images/categories/women-fashion.jpg' },
    { id: 7, name: "SuperMarket", image: '/images/categories/SuperMarket.jpg' },
    { id: 8, name: "Baby & Toys", image: '/images/categories/Baby.jpg' },
    { id: 9, name: "Home", image: '/images/categories/Home.jpg' },
    { id: 10, name: "Books", image: '/images/categories/Books.jpg' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container m-auto px-4" dir="rtl">
        <div className="max-w-4xl mb-10 px-4 mr-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-left">Shop by Category</h2>
          <p className="text-gray-500 text-left">Browse our popular categories</p>
        </div>

        <div className="relative px-10">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={16}
            slidesPerView={6}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            pagination={{ clickable: true }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 3, spaceBetween: 8 },
              1024: { slidesPerView: 6, spaceBetween: 8 }
            }}
            className="swiper-container"
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id} className="flex justify-center">
                <div className="flex-shrink-0 w-48 cursor-pointer">
                  <div className="flex flex-col items-center group">
                    <div className="w-48 h-48 md:w-52 md:h-52 rounded-full bg-gray-50 flex items-center justify-center
                      shadow-sm transition-all duration-300 mb-4 overflow-hidden border-2 border-gray-100 relative
                      hover:shadow-md hover:scale-105"> {/* Hover تأثير فقط */}
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={192}
                        height={192}
                        className="w-full h-full object-cover transition-transform duration-300"
                      />
                    </div>
                    <span
                      className="text-gray-800 text-center"
                      style={{
                        fontSize: '14px',
                        lineHeight: '18.2px',
                        fontWeight: 600,
                        letterSpacing: 'normal'
                      }}
                    >
                      {category.name}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Previous button */}
            <button 
              ref={prevRef}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-orange-500 shadow-md flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
            >
              <FaChevronRight className="w-5 h-5" />
            </button>

            {/* Next button */}
            <button 
              ref={nextRef}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-orange-500 shadow-md flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>

          </Swiper>

          {/* Custom CSS for pagination bullets */}
          <style jsx>{`
            .swiper-pagination {
              bottom: -25px !important;
            }
            .swiper-pagination-bullet {
              width: 14px;
              height: 14px;
              background: #ccc;
              margin: 0 12px !important; /* زيادة المسافة بين النقط */
              opacity: 1;
            }
            .swiper-pagination-bullet-active {
              background: #f97316;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
