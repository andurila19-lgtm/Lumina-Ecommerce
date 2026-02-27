'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Phone, Facebook, Apple } from 'lucide-react';
import { IconBrandGoogle } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
    email: z.string().email({ message: 'Alamat email tidak valid' }),
    password: z.string().min(1, { message: 'Password wajib diisi' }),
    remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            remember: false
        }
    });

    const onSubmit = (data: LoginFormValues) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            console.log("Login Data Validated:", data);
            toast.success('Berhasil masuk! (Simulasi)');
        }, 1500);
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-white">
            {/* Left Side: Illustration & Branding */}
            <div className="hidden lg:flex flex-col justify-center items-center bg-blue-600 p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full -ml-48 -mb-48 blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 text-center"
                >
                    <Link href="/" className="text-5xl font-black tracking-tighter mb-8 inline-block">
                        MARKET<span className="text-orange-400">ID</span>
                    </Link>
                    <h1 className="text-4xl font-bold mb-4">Selamat Datang Kembali!</h1>
                    <p className="text-blue-100 text-lg mb-8 max-w-md mx-auto">
                        Nikmati pengalaman belanja terbaik dengan ribuan promo eksklusif setiap harinya.
                    </p>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center font-bold text-xl">100+</div>
                            <div className="text-left font-medium">Promo Flash Sale hari ini hanya untuk kamu!</div>
                        </div>
                    </div>
                </motion.div>

                <div className="mt-auto relative z-10 text-blue-200 text-sm">
                    © 2026 MARKETID Indonesia. All rights reserved.
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-20">
                <div className="max-w-md w-full mx-auto">
                    <div className="lg:hidden mb-8 text-center text-3xl font-black tracking-tighter text-blue-600">
                        MARKET<span className="text-orange-500">ID</span>
                    </div>

                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Masuk ke Akun</h2>
                        <p className="text-slate-500 font-medium">Belum punya akun? <Link href="/register" className="text-blue-600 font-bold hover:underline">Daftar Sekarang</Link></p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                                <Input id="email" type="email" placeholder="nama@email.com" className={`pl-10 font-bold lowercase ${errors.email ? 'border-red-500' : ''}`} {...register('email')} />
                            </div>
                            {errors.email && <span className="text-xs text-red-500 font-bold">{errors.email.message}</span>}
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="text-xs text-blue-600 font-bold hover:underline">Lupa Password?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                                <Input id="password" type="password" placeholder="••••••••" className={`pl-10 font-bold ${errors.password ? 'border-red-500' : ''}`} {...register('password')} />
                            </div>
                            {errors.password && <span className="text-xs text-red-500 font-bold">{errors.password.message}</span>}
                        </div>

                        <div className="flex items-center space-x-2 pt-2">
                            <Checkbox
                                id="remember"
                                checked={watch('remember')}
                                onCheckedChange={(checked) => setValue('remember', checked as boolean)}
                            />
                            <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Ingat saya
                            </label>
                        </div>

                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg font-bold rounded-xl" disabled={isLoading}>
                            {isLoading ? 'Memproses...' : (
                                <>
                                    Masuk Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 relative hidden">
                        {/* Hidden divider as we use a cleaner text now */}
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-slate-500 mb-4">Atau Masuk Dengan</p>
                        <div className="flex justify-center gap-4">
                            <Button variant="outline" type="button" className="border-slate-200 h-12 w-12 rounded-full p-0 flex items-center justify-center hover:bg-slate-50">
                                <IconBrandGoogle className="h-5 w-5" />
                            </Button>
                            <Button variant="outline" type="button" className="border-slate-200 h-12 w-12 rounded-full p-0 flex items-center justify-center hover:bg-slate-50">
                                <Phone className="h-5 w-5 text-green-600" />
                            </Button>
                            <Button variant="outline" type="button" className="border-slate-200 h-12 w-12 rounded-full p-0 flex items-center justify-center hover:bg-slate-50">
                                <Facebook className="h-5 w-5 text-blue-600 fill-blue-600" />
                            </Button>
                            <Button variant="outline" type="button" className="border-slate-200 h-12 w-12 rounded-full p-0 flex items-center justify-center hover:bg-slate-50">
                                <Apple className="h-5 w-5 fill-black" />
                            </Button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-xs text-slate-500 font-medium">
                        Dengan log in, kamu menyetujui <Link href="#" className="text-blue-600 hover:underline">Kebijakan Privasi</Link> dan <Link href="#" className="text-blue-600 hover:underline">Syarat & Ketentuan</Link> MARKETID.
                    </p>
                </div>
            </div>
        </div>
    );
}
