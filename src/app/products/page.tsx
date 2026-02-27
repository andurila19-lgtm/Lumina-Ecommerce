'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import MarketplaceNavbar from '@/components/layout/MarketplaceNavbar';
import Footer from '@/components/layout/Footer';
import MarketplaceCard from '@/components/marketplace/MarketplaceCard';
import { ProductSkeleton } from '@/components/product/ProductSkeleton';
import { Product } from '@/types';

const API_URL = 'http://localhost:5000/api';

function ProductsContent() {
    const searchParams = useSearchParams();
    const categoryFilter = searchParams.get('category');
    const searchQuery = searchParams.get('q');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = `${API_URL}/products`;
                const params = new URLSearchParams();
                if (categoryFilter) params.append('category', categoryFilter);
                if (searchQuery) params.append('q', searchQuery);

                if (params.toString()) {
                    url += `?${params.toString()}`;
                }

                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryFilter, searchQuery]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <main className="flex-grow pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16 border-l-4 border-blue-600 pl-6"
                >
                    <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-4 lowercase">
                        {searchQuery ? `Hasil: "${searchQuery}"` : categoryFilter ? `${categoryFilter}` : 'Koleksi Produk'}
                    </h1>
                    <p className="text-slate-500 max-w-2xl text-lg leading-relaxed italic font-light">
                        {searchQuery
                            ? `Menampilkan produk yang cocok dengan pencarian Anda.`
                            : categoryFilter
                                ? `Menjelajahi pilihan terbaik kami untuk kategori ${categoryFilter}.`
                                : 'Temukan produk berkualitas tinggi yang dirancang untuk kenyamanan dan gaya hidup modern Anda.'}
                    </p>
                </motion.div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <ProductSkeleton key={i} />
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
                    >
                        {products.map(product => (
                            <MarketplaceCard key={product.id} product={product} />
                        ))}
                    </motion.div>
                ) : (
                    <div className="py-20 text-center uppercase font-medium bg-transparent border-white border text-white hover:text-white">
                        <p className="text-xl text-slate-500 italic font-light">No products found.</p>
                    </div>
                )}
            </div>
        </main>
    );
}

export default function ProductsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <MarketplaceNavbar />
            <Suspense fallback={
                <div className="flex-grow pt-32 pb-20 container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <ProductSkeleton key={i} />)}
                    </div>
                </div>
            }>
                <ProductsContent />
            </Suspense>
            <Footer />
        </div>
    );
}
