'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, LayoutGrid, Watch, Laptop, Home, ShoppingBag, Utensils, Plane } from 'lucide-react';
import MarketplaceNavbar from '@/components/layout/MarketplaceNavbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';

const categoryIcons: Record<string, any> = {
    'Accessories': Watch,
    'Electronics': Laptop,
    'Home': Home,
    'Travel': Plane,
    'Kitchen': Utensils,
    'Furniture': LayoutGrid,
};

const categories = [
    { name: 'Accessories', count: 12, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80' },
    { name: 'Electronics', count: 8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80' },
    { name: 'Home', count: 15, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80' },
    { name: 'Travel', count: 6, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80' },
    { name: 'Kitchen', count: 9, image: 'https://images.unsplash.com/photo-1544787210-282.jpg?w=800&q=80' },
    { name: 'Furniture', count: 4, image: 'https://images.unsplash.com/photo-1505843490701-5be5d0b19d58?w=800&q=80' },
];

export default function CategoriesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <MarketplaceNavbar />

            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-4 italic font-light">Browse Categories</h1>
                        <p className="text-slate-500 max-w-2xl text-lg lg:max-w-3xl">
                            Find exactly what you're looking for. Our collections are curated to help you discover tools for a better lifestyle.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((cat, idx) => {
                            const Icon = categoryIcons[cat.name] || ShoppingBag;
                            return (
                                <motion.div
                                    key={cat.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -10 }}
                                >
                                    <Link href={`/products?category=${cat.name}`}>
                                        <Card className="group relative h-80 overflow-hidden border-none rounded-[2.5rem] bg-slate-100 italic font-light">
                                            <img
                                                src={cat.image}
                                                alt={cat.name}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-50"
                                            />
                                            <CardContent className="relative h-full flex flex-col justify-end p-8 text-white z-10">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                                                        <Icon className="h-6 w-6" />
                                                    </div>
                                                    <span className="text-sm font-bold uppercase tracking-widest text-white/80">{cat.count} Items</span>
                                                </div>
                                                <h2 className="text-3xl font-bold mb-4 italic">{cat.name}</h2>
                                                <div className="flex items-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
