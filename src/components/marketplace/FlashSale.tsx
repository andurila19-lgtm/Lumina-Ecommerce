'use client';

import React, { useState, useEffect } from 'react';
import { Zap, Clock } from 'lucide-react';
import MarketplaceCard from './MarketplaceCard';
import { Product } from '@/types';
import { ProductSkeleton } from '../product/ProductSkeleton';

const API_URL = 'http://localhost:5000/api';

const FlashSale = () => {
    const [timeLeft, setTimeLeft] = useState({ h: 2, m: 45, s: 30 });
    const [flashProducts, setFlashProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFlashProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/products`);
                if (response.ok) {
                    const data = await response.json();
                    // Filter for products with high discount for simulation
                    const filtered = (data as Product[]).filter(p => (p.discount || 0) > 20).slice(0, 5);
                    setFlashProducts(filtered);
                }
            } catch (error) {
                console.error('Error fetching flash sale products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFlashProducts();

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { h, m, s } = prev;
                if (s > 0) s--;
                else {
                    s = 59;
                    if (m > 0) m--;
                    else {
                        m = 59;
                        if (h > 0) h--;
                    }
                }
                return { h, m, s };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-6 text-white overflow-hidden relative">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Zap className="h-8 w-8 fill-yellow-300 text-yellow-300 animate-pulse" />
                        <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter">Flash Sale</h2>
                    </div>
                    <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md rounded-lg px-3 py-1.5 border border-white/20">
                        <Clock className="h-4 w-4" />
                        <div className="flex gap-1 font-mono font-bold text-lg">
                            <span className="bg-white text-red-600 px-1 rounded">{String(timeLeft.h).padStart(2, '0')}</span>
                            <span>:</span>
                            <span className="bg-white text-red-600 px-1 rounded">{String(timeLeft.m).padStart(2, '0')}</span>
                            <span>:</span>
                            <span className="bg-white text-red-600 px-1 rounded">{String(timeLeft.s).padStart(2, '0')}</span>
                        </div>
                    </div>
                </div>
                <button className="text-sm font-bold hover:underline">Lihat Semua</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
                {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-xl p-2"><ProductSkeleton /></div>
                    ))
                ) : (
                    flashProducts.map((product, index) => (
                        <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-xl">
                            <MarketplaceCard product={product} priority={index < 2} />
                        </div>
                    ))
                )}
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/10 rounded-full -ml-32 -mb-32 blur-3xl" />
        </div>
    );
};

export default FlashSale;
