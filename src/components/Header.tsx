import React from 'react';
import { ShoppingBag, Menu, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}
export function Header({
  cartCount,
  onCartClick
}: HeaderProps) {
  return <motion.header initial={{
    y: -100
  }} animate={{
    y: 0
  }} className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button className="p-2 -ml-2 mr-2 md:hidden text-gray-600 hover:text-pink-500 transition-colors">
              <Menu className="h-6 w-6" />
            </button>
            <a href="#" className="text-2xl font-bold text-pink-500 flex items-center gap-2">
              <ShoppingBag className="h-6 w-6" />
              <span className="font-serif tracking-tight">Sew Creation</span>
            </a>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#products" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">
              Shop
            </a>
            <a href="#about" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">
              About
            </a>
            <a href="#custom" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">
              Custom Orders
            </a>
            <a href="#contact" className="text-gray-600 hover:text-pink-500 font-medium transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-pink-500 transition-colors">
              <Heart className="h-6 w-6" />
            </button>
            <div className="relative">
              <button onClick={onCartClick} className="p-2 text-gray-600 hover:text-pink-500 transition-colors relative group">
                <ShoppingBag className="h-6 w-6 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-pink-500 rounded-full shadow-sm animate-in zoom-in duration-200">
                    {cartCount}
                  </span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>;
}