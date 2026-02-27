'use client';

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Star, ShoppingCart, Shield, Truck, RefreshCw } from 'lucide-react';
import MarketplaceNavbar from '@/components/layout/MarketplaceNavbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import productsData from '@/data/products.json';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatCurrency, formatNumber } from '@/lib/utils/format';
import { Product } from '@/types';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
    const { id } = use(params);
    const { addToCart } = useCart();

    const product = productsData.find(p => p.id === id);

    if (!product) {
        return (
            <div className="flex flex-col min-h-screen">
                <MarketplaceNavbar />
                <main className="flex-grow flex items-center justify-center pt-24">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                        <Link href="/products">
                            <Button>Back to Shop</Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <MarketplaceNavbar />

            <main className="flex-grow pt-24 pb-20">
                <div className="container mx-auto px-4 md:px-6">
                    <Link
                        href="/products"
                        className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-8 transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to products
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Product Image */}
                        <div className="relative aspect-square overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 shadow-sm">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col">
                            <div className="mb-6">
                                <Badge className="mb-3 bg-blue-100 text-blue-600 border-none px-3 py-0.5">
                                    {product.category}
                                </Badge>
                                <h1 className="text-4xl font-bold text-slate-900 mb-2">{product.name}</h1>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                        <span className="ml-2 text-sm text-slate-500 font-medium">({product.rating}) | Terjual {formatNumber(product.soldCount)}</span>
                                    </div>
                                    <Separator orientation="vertical" className="h-4" />
                                    <span className="text-sm text-green-600 font-semibold">Stok tersedia</span>
                                </div>
                                <div className="flex items-baseline gap-3">
                                    <p className="text-4xl font-black text-blue-600">{formatCurrency(product.price)}</p>
                                    {product.originalPrice && (
                                        <p className="text-lg text-slate-400 line-through">{formatCurrency(product.originalPrice)}</p>
                                    )}
                                    {product.discount && (
                                        <Badge className="bg-red-500 text-white font-bold">-{product.discount}%</Badge>
                                    )}
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-semibold text-slate-900 mb-2">Description</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            <Separator className="mb-8" />

                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <Button
                                    size="lg"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 h-14 text-lg rounded-full"
                                    onClick={() => addToCart(product)}
                                >
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    Add to Cart
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="flex-1 h-14 text-lg rounded-full border-slate-200"
                                >
                                    Buy Now
                                </Button>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-8">
                                <div className="flex items-center gap-3">
                                    <Truck className="h-6 w-6 text-blue-600" />
                                    <span className="text-xs font-semibold text-slate-600 leading-tight italic font-light">Gratis Ongkir s/d 50rb</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Shield className="h-6 w-6 text-blue-600" />
                                    <span className="text-xs font-semibold text-slate-600 leading-tight italic font-light">Garansi Resmi 1 Tahun</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RefreshCw className="h-6 w-6 text-blue-600" />
                                    <span className="text-xs font-semibold text-slate-600 leading-tight italic font-light">7 Hari Pengembalian</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
