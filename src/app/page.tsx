'use client';

import React, { useState, useEffect } from 'react';
import MarketplaceNavbar from '@/components/layout/MarketplaceNavbar';
import Footer from '@/components/layout/Footer';
import HeroCarousel from '@/components/marketplace/HeroCarousel';
import CategoryNav from '@/components/marketplace/CategoryNav';
import FlashSale from '@/components/marketplace/FlashSale';
import PromoGrid from '@/components/marketplace/PromoGrid';
import MarketplaceCard from '@/components/marketplace/MarketplaceCard';
import { Product } from '@/types';
import { ProductSkeleton } from '@/components/product/ProductSkeleton';

const API_URL = 'http://localhost:5000/api';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching home products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const bestSellers = products.slice(0, 6);
  const recommended = [...products].sort(() => 0.5 - Math.random()).slice(0, 12);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <MarketplaceNavbar />

      <main className="flex-grow pt-[104px] pb-12">
        <div className="container mx-auto px-4 space-y-8">

          {/* Hero & Sidebar Area */}
          <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <HeroCarousel />
            </div>
            <div className="hidden lg:flex flex-col gap-4">
              <div className="bg-blue-600 rounded-2xl p-6 text-white h-full flex flex-col justify-center relative overflow-hidden">
                <h3 className="text-xl font-bold mb-2 relative z-10">Promo Pengguna Baru</h3>
                <p className="text-sm opacity-90 mb-4 relative z-10">Ambil voucher diskon 50k sekarang!</p>
                <button className="bg-white text-blue-600 font-bold py-2 rounded-lg text-sm relative z-10 shadow-lg">Klaim Voucher</button>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl" />
              </div>
              <div className="bg-orange-500 rounded-2xl p-6 text-white h-full flex flex-col justify-center relative overflow-hidden">
                <h3 className="text-xl font-bold mb-2 relative z-10">Kebutuhan Ramadhan</h3>
                <p className="text-sm opacity-90 mb-4 relative z-10">Diskon spesial takjil & kurma.</p>
                <button className="bg-white text-orange-500 font-bold py-2 rounded-lg text-sm relative z-10 shadow-lg">Lihat Promo</button>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl" />
              </div>
            </div>
          </section>

          {/* Categories */}
          <section>
            <CategoryNav />
          </section>

          {/* Flash Sale Section */}
          <section id="flash-sale" className="scroll-mt-24">
            <FlashSale />
          </section>

          {/* Promo Grid */}
          <section>
            <PromoGrid />
          </section>

          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-4 uppercase">Paling Populer</h2>
              <button className="text-blue-600 font-bold text-sm hover:underline">Lihat Semua</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
              ) : (
                bestSellers.map((product, index) => (
                  <MarketplaceCard key={product.id} product={product} priority={index < 4} />
                ))
              )}
            </div>
          </section>

          {/* Personalized Recommendations */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase">Rekomendasi Untukmu</h2>
              <p className="text-slate-500 font-medium italic">Barang-barang yang mungkin kamu sukai berdasarkan aktivitasmu.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
              {loading ? (
                Array.from({ length: 12 }).map((_, i) => <ProductSkeleton key={i} />)
              ) : (
                recommended.map(product => (
                  <MarketplaceCard key={product.id} product={product} />
                ))
              )}
            </div>
            <div className="mt-12 text-center">
              <button className="bg-slate-900 text-white font-bold px-12 py-3 rounded-full hover:bg-slate-800 transition-all uppercase font-medium bg-transparent border-white border text-white hover:text-white">Tampilkan Lebih Banyak</button>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
