'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const promos = [
    {
        title: 'Electronic Super Deal',
        desc: 'Hingga 5jt Cashback!',
        img: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800&q=80',
        color: 'from-blue-600/80 to-indigo-700/80'
    },
    {
        title: 'Fashion Week',
        desc: 'Beli 1 Gratis 1',
        img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
        color: 'from-pink-500/80 to-rose-600/80'
    },
    {
        title: 'Home Makeover',
        desc: 'Diskon s/d 80%',
        img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
        color: 'from-emerald-500/80 to-teal-600/80'
    }
];

const PromoGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promos.map((promo, i) => (
                <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="relative h-48 rounded-2xl overflow-hidden shadow-md group border border-slate-100"
                >
                    <Image
                        src={promo.img}
                        alt={promo.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${promo.color}`} />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                        <h3 className="text-xl font-black mb-1 leading-tight tracking-tight uppercase">{promo.title}</h3>
                        <p className="text-sm font-bold opacity-90">{promo.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default PromoGrid;
