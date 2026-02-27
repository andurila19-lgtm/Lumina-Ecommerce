'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Heart, Globe, Users, Trophy } from 'lucide-react';
import MarketplaceNavbar from '@/components/layout/MarketplaceNavbar';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
    const values = [
        { icon: ShieldCheck, title: "Quality First", desc: "Every product in our catalog undergoes rigorous quality checks to ensure it meets our high standards." },
        { icon: Zap, title: "Fast Innovation", desc: "We stay ahead of trends to bring you the latest in minimalist design and functional technology." },
        { icon: Heart, title: "Customer Centric", desc: "Your experience is at the heart of everything we do, from browsing to unboxing." },
        { icon: Globe, title: "Sustainability", desc: "We prioritize eco-friendly packaging and ethical sourcing for a better planet." },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <MarketplaceNavbar />

            <main className="flex-grow pt-32 pb-20">
                {/* Hero Section */}
                <section className="container mx-auto px-4 md:px-6 mb-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 mb-8 lowercase">
                                Defining <span className="text-blue-600">modern</span> lifestyle.
                            </h1>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl text-slate-500 leading-relaxed font-light mb-12"
                        >
                            LUMINA was founded in 2024 with a simple mission: to bridge the gap between aesthetics and utility. We believe that the objects you surround yourself with should not only serve a purpose but also inspire calm and creativity.
                        </motion.p>
                    </div>
                </section>

                {/* Story Section */}
                <section className="bg-slate-50 py-24 mb-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center uppercase font-medium bg-transparent border-white border text-white hover:text-white">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80"
                                    alt="Our Studio"
                                    className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl rotate-3"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-4xl font-bold text-slate-900 mb-8 italic font-light">Crafted for the Minimalist</h2>
                                <div className="space-y-6 text-slate-600 leading-relaxed italic font-light">
                                    <p>
                                        Our journey started in a small studio with one goal: to find the perfect balance in design. We were tired of cluttered markets and disposable products.
                                    </p>
                                    <p>
                                        Today, LUMINA is a global community of designers, curators, and dreamers. We source materials responsibly and collaborate with artisans who share our dedication to craftsmanship.
                                    </p>
                                    <p>
                                        Every item in our store is a testament to the belief that "less is more."
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="container mx-auto px-4 md:px-6 mb-24">
                    <div className="text-center mb-16 uppercase font-medium bg-transparent border-white border text-white hover:text-white">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4 italic font-light">Our Values</h2>
                        <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 uppercase font-medium bg-transparent border-white border text-white hover:text-white">
                        {values.map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-white border border-slate-100 rounded-[2rem] hover:shadow-xl transition-all duration-500 group"
                            >
                                <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <v.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 italic font-light">{v.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed italic font-light">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Stats Section */}
                <section className="container mx-auto px-4 md:px-6 py-20 bg-slate-900 rounded-[4rem] text-white">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center uppercase font-medium bg-transparent border-white border text-white hover:text-white">
                        {[
                            { label: "Active Customers", value: "50k+", icon: Users },
                            { label: "Global Reach", value: "120+", icon: Globe },
                            { label: "Design Awards", value: "15", icon: Trophy },
                            { label: "Products", value: "800+", icon: Zap },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-2 uppercase font-medium bg-transparent border-white border text-white hover:text-white">
                                <stat.icon className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                                <p className="text-4xl font-bold italic font-light">{stat.value}</p>
                                <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
