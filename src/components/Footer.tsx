import React from 'react';
import { Facebook, Instagram, Github, Linkedin } from 'lucide-react';

export default function FreshCartFooter() {
  return (
    <footer className="bg-slate-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About FreshCart */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">ABOUT FRESHCART</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted online marketplace for quality products at great prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition text-sm">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition text-sm">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition text-sm">
                  Brands
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">CUSTOMER SERVICE</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition text-sm">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition text-sm">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition text-sm">
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">CONTACT US</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <a href="mailto:samehsalehelkhayat@gmail.com" className="text-gray-400 hover:text-orange-500 transition text-sm">
                  samehsalehelkhayat@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <a href="tel:+201065369433" className="text-gray-400 hover:text-orange-500 transition text-sm">
                  (+2) 01065369433
                </a>
              </div>
              <div className="flex gap-3 mt-4">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-slate-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300 group"
                  aria-label="Facebook"
                >
                  <Facebook size={18} className="text-gray-300 group-hover:text-white" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-slate-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300 group"
                  aria-label="Instagram"
                >
                  <Instagram size={18} className="text-gray-300 group-hover:text-white" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-slate-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300 group"
                  aria-label="GitHub"
                >
                  <Github size={18} className="text-gray-300 group-hover:text-white" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-slate-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300 group"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} className="text-gray-300 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>2024 FreshCart. All Rights Reserved</p>
          <p>Designed & Developed by Sameh Saleh Elkhayat</p>
        </div>
      </div>
    </footer>
  );
}