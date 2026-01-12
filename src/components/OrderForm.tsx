import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Loader2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
interface OrderFormProps {
  cartItems: CartItem[];
  onClearCart: () => void;
}
export function OrderForm({
  cartItems,
  onClearCart
}: OrderFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.address) newErrors.address = 'Shipping address is required';
    if (cartItems.length === 0) newErrors.cart = 'Your cart is empty';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    onClearCart();
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      notes: ''
    });
    // Reset success message after 5 seconds
    setTimeout(() => setStatus('idle'), 5000);
  };
  if (cartItems.length === 0 && status !== 'success') {
    return <section id="order-form" className="py-20 bg-pink-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add some beautiful bags to your cart to place an order.
            </p>
            <a href="#products" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-pink-500 hover:bg-pink-600 transition-colors">
              Browse Collection
            </a>
          </div>
        </div>
      </section>;
  }
  return <section id="order-form" className="py-20 bg-pink-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-pink-500 px-8 py-6 text-white text-center">
            <h2 className="text-2xl font-bold font-serif">
              Complete Your Order
            </h2>
            <p className="text-pink-100 mt-2">
              You're just a few steps away from your new bags!
            </p>
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {status === 'success' ? <motion.div initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} exit={{
              opacity: 0,
              scale: 0.9
            }} className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Order Received!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for your order. We'll contact you shortly to
                    confirm payment and shipping details.
                  </p>
                  <button onClick={() => setStatus('idle')} className="mt-8 text-pink-500 font-medium hover:text-pink-600">
                    Place another order
                  </button>
                </motion.div> : <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input type="text" id="name" value={formData.name} onChange={e => setFormData({
                        ...formData,
                        name: e.target.value
                      })} className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-pink-200'} focus:border-pink-500 focus:ring-4 transition-all outline-none`} placeholder="Jane Doe" />
                          {errors.name && <p className="mt-1 text-sm text-red-500 flex items-center">
                              <AlertCircle className="w-3 h-3 mr-1" />{' '}
                              {errors.name}
                            </p>}
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input type="tel" id="phone" value={formData.phone} onChange={e => setFormData({
                        ...formData,
                        phone: e.target.value
                      })} className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-pink-200'} focus:border-pink-500 focus:ring-4 transition-all outline-none`} placeholder="+1 (555) 000-0000" />
                          {errors.phone && <p className="mt-1 text-sm text-red-500 flex items-center">
                              <AlertCircle className="w-3 h-3 mr-1" />{' '}
                              {errors.phone}
                            </p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input type="email" id="email" value={formData.email} onChange={e => setFormData({
                      ...formData,
                      email: e.target.value
                    })} className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-pink-200'} focus:border-pink-500 focus:ring-4 transition-all outline-none`} placeholder="jane@example.com" />
                        {errors.email && <p className="mt-1 text-sm text-red-500 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />{' '}
                            {errors.email}
                          </p>}
                      </div>

                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Shipping Address
                        </label>
                        <textarea id="address" rows={3} value={formData.address} onChange={e => setFormData({
                      ...formData,
                      address: e.target.value
                    })} className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-pink-200'} focus:border-pink-500 focus:ring-4 transition-all outline-none`} placeholder="Street, City, State, Zip Code" />
                        {errors.address && <p className="mt-1 text-sm text-red-500 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />{' '}
                            {errors.address}
                          </p>}
                      </div>

                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                          Special Instructions (Optional)
                        </label>
                        <textarea id="notes" rows={2} value={formData.notes} onChange={e => setFormData({
                      ...formData,
                      notes: e.target.value
                    })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-200 transition-all outline-none" placeholder="Any specific requests?" />
                      </div>

                      <button type="submit" disabled={status === 'submitting'} className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-200 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-pink-200 transform hover:-translate-y-1">
                        {status === 'submitting' ? <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </> : 'Place Order'}
                      </button>
                    </form>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="font-bold text-gray-900 mb-4">
                        Order Summary
                      </h3>
                      <div className="space-y-4 mb-6">
                        {cartItems.map(item => <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {item.quantity}x {item.name}
                            </span>
                            <span className="font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>)}
                      </div>
                      <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg text-gray-900">
                        <span>Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>;
}