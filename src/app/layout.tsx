// src/app/layout.tsx
import { Inter } from 'next/font/google';
import ClientLayout from './client-layout';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FreshCart - Your Online Grocery Store',
  description: 'Fresh groceries delivered to your doorstep',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}