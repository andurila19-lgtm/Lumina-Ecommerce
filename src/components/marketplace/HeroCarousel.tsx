'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const banners = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&q=80',
        title: 'Diskon Akhir Bulan!',
        subtitle: 'Hingga 70% untuk produk kecantikan.',
        color: 'bg-blue-600',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80',
        title: 'Gajian Berkah',
        subtitle: 'Gratis Ongkir sepuasnya tanpa minimum belanja.',
        color: 'bg-orange-500',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80',
        title: 'Super Gadget Sale',
        subtitle: 'Cicilan 0% hingga 24 bulan untuk iPhone & Samsung.',
        color: 'bg-indigo-700',
    },
];

const HeroCarousel = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const next = () => setCurrent((prev) => (prev + 1) % banners.length);
    const prev = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

    return (
        <div className="relative w-full h-[200px] md:h-[400px] overflow-hidden rounded-2xl group">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                >
                    <div className={`absolute inset-0 ${banners[current].color} opacity-20`} />
                    <Image
                        src={banners[current].image}
                        alt={banners[current].title}
                        fill
                        priority
                        sizes="100vw"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex flex-col justify-center px-8 md:px-20 text-white">
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl md:text-5xl font-black mb-2 md:mb-4 tracking-tight"
                        >
                            {banners[current].title}
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-sm md:text-xl font-medium max-w-md opacity-90"
                        >
                            {banners[current].subtitle}
                        </motion.p>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-4 md:mt-8"
                        >
                            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full font-bold px-8">
                                Cek Sekarang
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={prev}
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={next}
            >
                <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {banners.map((_, i) => (
                    <button
                        key={i}
                        className={`h-2 rounded-full transition-all ${i === current ? 'w-8 bg-white' : 'w-2 bg-white/50'
                            }`}
                        onClick={() => setCurrent(i)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
