import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Plus } from 'lucide-react';
import { Product } from '../types';
interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
}
export function ProductCard({
  product,
  index,
  onAddToCart
}: ProductCardProps) {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    delay: index * 0.1
  }} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100 relative">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-pink-50 text-gray-600 hover:text-pink-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
        {index === 1 && <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
              BESTSELLER
            </span>
          </div>}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">{product.color} Corduroy</p>
          </div>
          <p className="text-lg font-bold text-pink-600">${product.price}</p>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <button onClick={() => onAddToCart(product)} className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-bold rounded-xl text-white bg-gray-900 hover:bg-pink-500 active:scale-95 transition-all duration-200 gap-2 shadow-md hover:shadow-pink-200">
          <Plus className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </motion.div>;
}