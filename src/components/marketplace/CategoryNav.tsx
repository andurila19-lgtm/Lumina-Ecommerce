'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Laptop, Smartphone, Watch, Shirt, Home,
    Utensils, Gamepad2, ShoppingBasket, Car, Zap
} from 'lucide-react';

const categories = [
    { name: 'Electronics', icon: Laptop, color: 'bg-blue-100 text-blue-600', slug: 'Electronics' },
    { name: 'Gadget', icon: Smartphone, color: 'bg-indigo-100 text-indigo-600', slug: 'Gadget' },
    { name: 'Fashion', icon: Shirt, color: 'bg-pink-100 text-pink-600', slug: 'Fashion' },
    { name: 'Arloji', icon: Watch, color: 'bg-amber-100 text-amber-600', slug: 'Watch' },
    { name: 'Kitchen', icon: Utensils, color: 'bg-orange-100 text-orange-600', slug: 'Kitchen' },
    { name: 'Furniture', icon: Home, color: 'bg-green-100 text-green-600', slug: 'Furniture' },
    { name: 'Gaming', icon: Gamepad2, color: 'bg-purple-100 text-purple-600', slug: 'Gaming' },
    { name: 'Home', icon: ShoppingBasket, color: 'bg-emerald-100 text-emerald-600', slug: 'Home' },
    { name: 'Otomotif', icon: Car, color: 'bg-slate-100 text-slate-600', slug: 'Automotive' },
    { name: 'Flash Sale', icon: Zap, color: 'bg-red-100 text-red-600', slug: 'FlashSale' },
];

const CategoryNav = () => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="grid grid-cols-5 md:grid-cols-10 gap-x-4 gap-y-8">
                {categories.map((cat, i) => (
                    <Link
                        key={i}
                        href={cat.slug === 'FlashSale' ? '#flash-sale' : `/products?category=${cat.slug}`}
                    >
                        <motion.button
                            whileHover={{ y: -5 }}
                            className="flex flex-col items-center gap-2 group w-full"
                        >
                            <div className={`h-12 w-12 md:h-14 md:w-14 rounded-2xl ${cat.color} flex items-center justify-center transition-all group-hover:shadow-md group-hover:scale-105`}>
                                <cat.icon className="h-6 w-6 md:h-7 md:w-7" />
                            </div>
                            <span className="text-[10px] md:text-xs font-bold text-slate-600 text-center leading-none">
                                {cat.name}
                            </span>
                        </motion.button>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryNav;
