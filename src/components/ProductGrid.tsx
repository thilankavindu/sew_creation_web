import React from 'react';
import { ProductCard } from './ProductCard';
import { PRODUCTS, Product } from '../types';
interface ProductGridProps {
  onAddToCart: (product: Product) => void;
}
export function ProductGrid({
  onAddToCart
}: ProductGridProps) {
  return <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-serif mb-4">
            Our Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each bag is lovingly handmade with high-quality corduroy fabric and
            detailed embroidery. Find the perfect companion for your daily
            adventures.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product, index) => <ProductCard key={product.id} product={product} index={index} onAddToCart={onAddToCart} />)}
        </div>
      </div>
    </section>;
}