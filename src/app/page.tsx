'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Toaster, toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';

const CategoriesSection = dynamic(
  () => import('@/components/CategoriesSection'),
  { ssr: true }
);

const FeaturedProducts = dynamic(
  () => import('@/components/FeaturedProducts'),
  { ssr: true }
);

export default function Home() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const hasShownToast = useRef(false);

  useEffect(() => {
    const loginSuccess = searchParams.get('login');
    
    // Only show the toast if we haven't shown it yet and we have a valid session
    if (loginSuccess === 'success' && session?.user && !hasShownToast.current) {
      hasShownToast.current = true;
      
      // Show welcome toast with user's name (1 second duration)
      toast.success(`Welcome ${session.user.name || 'back'}!`, {
        duration: 1000,
        position: 'top-center',
        style: {
          background: '#10B981',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 500,
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#10B981',
        },
      });

      // Clean up the URL without refreshing the page
      if (typeof window !== 'undefined') {
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, '', cleanUrl);
      }
    }
  }, [searchParams, session]);

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      <Header />
      <main className="flex-grow">
        <HeroSlider />
        <CategoriesSection />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
}