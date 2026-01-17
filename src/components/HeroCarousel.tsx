// src/components/HeroCarousel.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import Link from 'next/link';

const HeroCarousel = () => {
  const slides = [
    {
      id: 1,
      title: 'Fresh Vegetables Big Discount',
      subtitle: 'Save up to 50%',
      image: '/images/hero/slide1.jpg',
      buttonText: 'Shop Now',
      link: '/categories/vegetables',
    },
    {
      id: 2,
      title: 'Fresh Fruits Collection',
      subtitle: 'Best Price & Quality',
      image: '/images/hero/slide2.jpg',
      buttonText: 'Shop Now',
      link: '/categories/fruits',
    },
    {
      id: 3,
      title: 'Organic Food For Healthy Life',
      subtitle: '100% Fresh & Organic',
      image: '/images/hero/slide3.jpg',
      buttonText: 'Shop Now',
      link: '/categories/organic',
    },
  ];

  return (
    <div className="relative bg-gray-50">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[400px] md:h-[500px] w-full">
              {/* Placeholder for the image - replace with actual Image component */}
              <div className="absolute inset-0 bg-gray-200 flex items-center">
                <div className="container mx-auto px-4 z-10">
                  <div className="max-w-xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-xl text-gray-700 mb-6">{slide.subtitle}</p>
                    <Link
                      href={slide.link}
                      className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-md transition duration-300"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;