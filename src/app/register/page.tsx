'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Phone, Facebook, Apple } from 'lucide-react';
import { IconBrandGoogle } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            toast.success('Account created successfully! Welcome to MARKETID.');
        }, 1500);
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-white">
            {/* Left Side: Illustration & Branding */}
            <div className="hidden lg:flex flex-col justify-center items-center bg-orange-500 p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full -ml-48 -mb-48 blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 text-center"
                >
                    <Link href="/" className="text-5xl font-black tracking-tighter mb-8 inline-block">
                        MARKET<span className="text-blue-600">ID</span>
                    </Link>
                    <h1 className="text-4xl font-bold mb-4">Bergabung Sekarang!</h1>
                    <p className="text-orange-50 text-lg mb-8 max-w-md mx-auto">
                        Mulai pengalaman belanja tak terlupakan dengan jaminan keamanan dan kenyamanan terbaik.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                            <ShieldCheck className="h-8 w-8 mb-2 mx-auto" />
                            <div className="text-sm font-bold">100% Produk Original</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                            <ShieldCheck className="h-8 w-8 mb-2 mx-auto" />
                            <div className="text-sm font-bold">Pengiriman Cepat</div>
                        </div>
                    </div>
                </motion.div>

                <div className="mt-auto relative z-10 text-orange-200 text-sm">
                    Tempat belanja idaman keluarga Indonesia.
                </div>
            </div>

            {/* Right Side: Register Form */}
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-20">
                <div className="max-w-md w-full mx-auto">
                    <div className="lg:hidden mb-8 text-center text-3xl font-black tracking-tighter text-blue-600">
                        MARKET<span className="text-orange-500">ID</span>
                    </div>

                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Daftar Akun Baru</h2>
                        <p className="text-slate-500 font-medium font-bold">Sudah punya akun? <Link href="/login" className="text-blue-600 font-bold hover:underline font-bold">Masuk di sini</Link></p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="fullname">Nama Lengkap</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input id="fullname" type="text" placeholder="Budi Santoso" className="pl-10 font-bold lowercase" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input id="email" type="email" placeholder="nama@email.com" className="pl-10 font-bold lowercase" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input id="password" type="password" placeholder="Min. 8 karakter" className="pl-10 font-bold lowercase" required />
                            </div>
                        </div>

                        <div className="pt-2">
                            <div className="flex items-start space-x-2">
                                <Checkbox id="terms" required />
                                <label htmlFor="terms" className="text-xs text-slate-500 font-medium leading-tight cursor-pointer">
                                    Saya setuju dengan <Link href="#" className="text-blue-600 font-bold hover:underline font-bold">Syarat & Ketentuan</Link> serta <Link href="#" className="text-blue-600 font-bold hover:underline font-bold">Kebijakan Privasi</Link> MARKETID.
                                </label>
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 h-12 text-lg font-bold rounded-xl text-white" disabled={isLoading}>
                            {isLoading ? 'Mendaftarkan...' : (
                                <>
                                    Buat Akun Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 relative hidden">
                        {/* Hidden divider as we use a cleaner text now */}
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-slate-500 mb-4">Daftar lebih cepat dengan</p>
                        <div className="flex justify-center gap-4">
                            <Button variant="outline" className="border-slate-200 h-12 w-12 rounded-full p-0 flex items-center justify-center">
                                <IconBrandGoogle className="h-5 w-5" />
                            </Button>
                            <Button variant="outline" className="border-slate-200 h-12 w-12 rounded-full p-0 flex items-center justify-center">
                                <Phone className="h-5 w-5 text-green-600" />
                            </Button>
                            <Button variant="outline" className="border-slate-200 h-12 w-12 rounded-full p-0 flex items-center justify-center">
                                <Facebook className="h-5 w-5 text-blue-600 fill-blue-600" />
                            </Button>
                            <Button variant="outline" className="border-slate-200 h-12 w-12 rounded-full p-0 flex items-center justify-center">
                                <Apple className="h-5 w-5 fill-black" />
                            </Button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-xs text-slate-400 font-medium font-bold italic hidden">
                        Dengan mendaftar, Anda akan mendapatkan akses ke seluruh fitur dan promo eksklusif kami.
                    </p>
                </div>
            </div>
        </div>
    );
}
