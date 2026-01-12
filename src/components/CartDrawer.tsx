import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}
export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />

          {/* Drawer */}
          <motion.div initial={{
        x: '100%'
      }} animate={{
        x: 0
      }} exit={{
        x: '100%'
      }} transition={{
        type: 'spring',
        damping: 25,
        stiffness: 200
      }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold font-serif flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-pink-500" />
                Your Cart (
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
              </h2>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-pink-300" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      Your cart is empty
                    </p>
                    <p className="text-gray-500 mt-1">
                      Looks like you haven't added any bags yet.
                    </p>
                  </div>
                  <button onClick={onClose} className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition-colors">
                    Start Shopping
                  </button>
                </div> : cartItems.map(item => <motion.div layout key={item.id} className="flex gap-4 bg-white">
                    <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-900 line-clamp-1">
                            {item.name}
                          </h3>
                          <button onClick={() => onRemoveItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">{item.color}</p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                          <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 hover:bg-white rounded-md transition-colors disabled:opacity-50" disabled={item.quantity <= 1}>
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">
                            {item.quantity}
                          </span>
                          <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 hover:bg-white rounded-md transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </motion.div>)}
            </div>

            {cartItems.length > 0 && <div className="border-t border-gray-100 p-6 bg-gray-50 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Shipping and taxes calculated at checkout
                </p>
                <button onClick={onCheckout} className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-pink-500 transition-colors shadow-lg hover:shadow-pink-200">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>}
          </motion.div>
        </>}
    </AnimatePresence>;
}