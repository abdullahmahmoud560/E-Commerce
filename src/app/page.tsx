// src/app/page.tsx
'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import { Toaster, toast } from 'sonner';

// Dynamically import components with SSR disabled to prevent build issues
const CategoriesSection = dynamic(
  () => import('@/components/CategoriesSection'),
  { 
    ssr: false,
    loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
  }
);

const FeaturedProducts = dynamic(
  () => import('@/components/FeaturedProducts'),
  { 
    ssr: false,
    loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
  }
);

// Main page component
function HomeContent() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const toastShownRef = useRef(false);

  // Handle login success toast
  useEffect(() => {
    if (searchParams.get('login') === 'success' && !toastShownRef.current) {
      toast.success('تم تسجيل الدخول بنجاح!');
      toastShownRef.current = true;
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Toaster position="top-center" richColors />
      
      <main className="flex-grow">
        <HeroSlider />
        
        <div className="container mx-auto px-4 py-8">
          <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
            <CategoriesSection />
          </Suspense>
          
          <div className="my-12">
            <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}>
              <FeaturedProducts />
            </Suspense>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// Wrap the main content in Suspense
export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}