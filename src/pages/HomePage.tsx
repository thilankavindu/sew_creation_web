import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ProductGrid } from '../components/ProductGrid';
import { OrderForm } from '../components/OrderForm';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { Product, CartItem } from '../types';
import { Truck, ShieldCheck, Palette } from 'lucide-react';
export function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => item.id === product.id ? {
          ...item,
          quantity: item.quantity + 1
        } : item);
      }
      return [...prev, {
        ...product,
        quantity: 1
      }];
    });
    setIsCartOpen(true);
  };
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return {
          ...item,
          quantity: newQuantity
        };
      }
      return item;
    }));
  };
  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };
  const handleCheckout = () => {
    setIsCartOpen(false);
    const formElement = document.getElementById('order-form');
    if (formElement) {
      formElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const handleClearCart = () => {
    setCartItems([]);
  };
  return <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-pink-100 selection:text-pink-900">
      <Header cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} onCartClick={() => setIsCartOpen(true)} />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} onCheckout={handleCheckout} />

      <main>
        <Hero />

        {/* Features Section */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center p-6 bg-pink-50 rounded-2xl">
                <div className="p-3 bg-white rounded-full shadow-sm text-pink-500 mr-4">
                  <Palette className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Handmade Quality</h3>
                  <p className="text-sm text-gray-600">
                    Crafted with care & passion
                  </p>
                </div>
              </div>
              <div className="flex items-center p-6 bg-purple-50 rounded-2xl">
                <div className="p-3 bg-white rounded-full shadow-sm text-purple-500 mr-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Durable Material</h3>
                  <p className="text-sm text-gray-600">
                    Premium corduroy fabric
                  </p>
                </div>
              </div>
              <div className="flex items-center p-6 bg-blue-50 rounded-2xl">
                <div className="p-3 bg-white rounded-full shadow-sm text-blue-500 mr-4">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Fast Shipping</h3>
                  <p className="text-sm text-gray-600">
                    Tracked delivery worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductGrid onAddToCart={handleAddToCart} />
        <OrderForm cartItems={cartItems} onClearCart={handleClearCart} />
      </main>
      <Footer />
    </div>;
}