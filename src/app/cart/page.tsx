'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ChevronLeft, ShoppingCart } from 'lucide-react';
import MarketplaceNavbar from '@/components/layout/MarketplaceNavbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils/format';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

    const shipping = totalItems > 0 ? (totalPrice > 1000000 ? 0 : 25000) : 0;
    const tax = totalPrice * 0.11; // 11% PPN in Indonesia
    const finalTotal = totalPrice + shipping + tax;

    return (
        <div className="flex flex-col min-h-screen">
            <MarketplaceNavbar />

            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between mb-12"
                    >
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Your Shopping Cart</h1>
                        <div className="flex items-center bg-slate-100 px-4 py-2 rounded-full">
                            <span className="text-slate-600 font-bold mr-2 text-sm">{totalItems}</span>
                            <span className="text-slate-400 text-xs uppercase tracking-widest font-bold">Items</span>
                        </div>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {cart.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col items-center justify-center py-24 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0" />
                                <div className="relative mb-8">
                                    <motion.div
                                        animate={{
                                            y: [0, -10, 0],
                                            rotate: [0, 5, -5, 0]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="h-24 w-24 bg-white rounded-3xl shadow-2xl shadow-blue-500/10 flex items-center justify-center border border-slate-50"
                                    >
                                        <ShoppingCart className="h-12 w-12 text-blue-600" strokeWidth={1.5} />
                                    </motion.div>
                                    <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center border-4 border-slate-50">
                                        <ShoppingBag className="h-4 w-4 text-blue-600" />
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-3">Your cart is empty</h2>
                                <p className="text-slate-500 mb-10 max-w-sm text-center text-lg italic font-light">
                                    "The best things in life are yet to be added to your cart."
                                </p>
                                <Link href="/products">
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 rounded-full px-12 h-14 text-lg shadow-xl shadow-blue-600/20 group">
                                        Start Shopping
                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="cart"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-1 lg:grid-cols-3 gap-12"
                            >
                                {/* Product List */}
                                <div className="lg:col-span-2 space-y-4">
                                    <AnimatePresence>
                                        {cart.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                layout
                                            >
                                                <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden bg-white group">
                                                    <CardContent className="p-4 sm:p-6">
                                                        <div className="flex flex-col sm:flex-row gap-8">
                                                            <div className="relative h-40 w-full sm:w-40 rounded-3xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                                                                <Image
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    fill
                                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                                />
                                                            </div>
                                                            <div className="flex flex-col flex-grow justify-between py-2">
                                                                <div className="flex justify-between items-start">
                                                                    <div>
                                                                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-2">{item.category}</p>
                                                                        <Link href={`/products/${item.id}`} className="hover:text-blue-600 transition-colors">
                                                                            <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                                                                        </Link>
                                                                    </div>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                                                        onClick={() => removeFromCart(item.id)}
                                                                    >
                                                                        <Trash2 className="h-5 w-5" />
                                                                    </Button>
                                                                </div>

                                                                <div className="flex justify-between items-end mt-6">
                                                                    <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100">
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-9 w-9 text-slate-500 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-100"
                                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                            disabled={item.quantity <= 1}
                                                                        >
                                                                            <Minus className="h-4 w-4" />
                                                                        </Button>
                                                                        <span className="w-12 text-center font-bold text-slate-900">{item.quantity}</span>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-9 w-9 text-slate-500 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-100"
                                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                        >
                                                                            <Plus className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="text-sm text-slate-400 font-medium mb-1">Item Total</p>
                                                                        <p className="text-2xl font-bold text-slate-900">{formatCurrency(item.price * item.quantity)}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    <Link href="/products" className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors pt-6 group">
                                        <ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
                                        Continue Shopping
                                    </Link>
                                </div>

                                {/* Order Summary */}
                                <div className="lg:col-span-1">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <Card className="border-none shadow-2xl bg-slate-900 text-white rounded-[2.5rem] sticky top-32 overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16" />
                                            <CardContent className="p-8 relative z-10">
                                                <h2 className="text-2xl font-bold mb-8">Order Summary</h2>

                                                <div className="space-y-5 mb-8">
                                                    <div className="flex justify-between text-slate-400">
                                                        <span className="font-medium">Subtotal</span>
                                                        <span className="text-white font-bold">{formatCurrency(totalPrice)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-slate-400">
                                                        <span className="font-medium">Shipping</span>
                                                        <span className="text-green-400 font-bold">{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-slate-400">
                                                        <span className="font-medium italic font-light">Tax Estimate (11% PPN)</span>
                                                        <span className="text-white font-bold bg-transparent border-white border text-white hover:text-white px-2 rounded-lg">{formatCurrency(tax)}</span>
                                                    </div>
                                                    <Separator className="bg-slate-800" />
                                                    <div className="flex justify-between items-center pt-2">
                                                        <span className="text-lg font-medium text-slate-300">Total Price</span>
                                                        <span className="text-3xl font-bold text-orange-400">{formatCurrency(finalTotal)}</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-16 rounded-full text-lg font-bold shadow-lg shadow-blue-600/30 group">
                                                        Proceed to Checkout
                                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                                    </Button>
                                                    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                                                        <div className="h-px w-8 bg-slate-800" />
                                                        Secure Encrypted Payment
                                                        <div className="h-px w-8 bg-slate-800" />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Promo Code */}
                                        <div className="mt-8 p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                                            <p className="font-bold text-slate-900 mb-4 italic font-light">Promo Code?</p>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="LUMINA15"
                                                    className="flex-grow bg-white border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                                                />
                                                <Button variant="outline" className="rounded-2xl h-auto px-6 font-bold border-slate-200 uppercase font-medium bg-transparent border-white border text-white hover:text-white">Apply</Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <Footer />
        </div>
    );
}
