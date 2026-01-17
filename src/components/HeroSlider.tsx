'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

const HeroSlider = () => {
  const swiperRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "Fresh Products Daily",
      subtitle: "Discover amazing deals on quality products",
      image: "/images/hero-1.jpg",
      alt: "Fresh groceries delivery",
      width: 869,
      height: 560
    },
    {
      id: 2,
      title: "Best Prices Guaranteed",
      subtitle: "Shop with confidence and save more",
      image: "/images/hero-2.jpg",
      alt: "Summer sale",
      width: 869,
      height: 560
    },
    {
      id: 3,
      title: "Fast & Free Delivery",
      subtitle: "Get your orders delivered quickly",
      image: "/images/hero-3.jpg",
      alt: "Organic food",
      width: 869,
      height: 560
    }
  ];

  return (
    <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
      <Swiper
        ref={swiperRef}
        spaceBetween={0}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          renderBullet: (index, className) => {
            return `<span class="${className} bg-white h-1 mx-1 w-6 rounded-sm opacity-50 transition-all duration-300"></span>`;
          },
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Bottom Shadow Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-[calc(35%)] bg-gradient-to-t from-black/80 to-transparent z-10" />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-end pb-8 z-20">
              <div className="w-full">
                <div className="text-center -translate-y-1">
                  <h3 className="text-[28px] font-bold mb-2 leading-[36.4px] text-black">
                    {slide.title}
                  </h3>
                  <p className="text-[16px] leading-[25.6px] text-white">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                className="w-full h-full object-cover object-center"
                priority
              />
            </div>
          </SwiperSlide>
        ))}

{/* Navigation Buttons */}
<div className="swiper-button-prev" />
<div className="swiper-button-next" />

        {/* Pagination */}
        <div className="swiper-pagination absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex justify-center space-x-1" />
      </Swiper>
    </div>
  );
};

export default HeroSlider;