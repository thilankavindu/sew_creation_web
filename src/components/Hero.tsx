import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
export function Hero() {
  return <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28" style={{
    background: 'linear-gradient(135deg, #ffc0e0 0%, #e9d5ff 50%, #ffc0e0 100%)'
  }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="text-center relative z-10 max-w-4xl mx-auto">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/80 backdrop-blur-sm text-pink-800 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Handmade with Love
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6 font-serif">
            Carry Your Style with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Sew Creation
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Discover our collection of handcrafted corduroy tote bags featuring
            adorable embroidery and custom designs. Perfect for everyday
            adventures.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#products" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-pink-500 hover:bg-pink-600 md:text-lg transition-all shadow-lg hover:shadow-pink-200 hover:-translate-y-1">
              Shop Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a href="#custom" className="inline-flex items-center px-8 py-3 border-2 border-white/50 text-base font-medium rounded-full text-pink-600 bg-white/80 backdrop-blur-sm hover:bg-white md:text-lg transition-all hover:-translate-y-1 shadow-md">
              Custom Order
            </a>
          </div>
        </motion.div>
      </div>
    </section>;
}