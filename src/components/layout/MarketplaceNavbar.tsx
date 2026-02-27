'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Search, User, Menu, ChevronDown, Bell, Mail } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MarketplaceNavbar = () => {
    const { totalItems } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const categories = [
        { name: 'Electronics', slug: 'Electronics' },
        { name: 'Home & Living', slug: 'Home' },
        { name: 'Fashion', slug: 'Fashion' },
        { name: 'Furniture', slug: 'Furniture' },
        { name: 'Kitchen', slug: 'Kitchen' },
        { name: 'Shoes', slug: 'Shoes' },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-200">
            {/* Top bar for promos */}
            <div className="bg-slate-50 border-b border-slate-100 py-1 hidden md:block">
                <div className="container mx-auto px-4 flex justify-between items-center text-[10px] text-slate-500 font-medium font-bold uppercase">
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-blue-600">Download App</Link>
                        <Link href="#" className="hover:text-blue-600">Merchant Center</Link>
                        <Link href="#" className="hover:text-blue-600">Customer Care</Link>
                    </div>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-blue-600">Help</Link>
                        <Link href="#" className="hover:text-blue-600">Promo</Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center gap-4 lg:gap-8">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-black tracking-tighter text-blue-600 shrink-0">
                        MARKET<span className="text-orange-500">ID</span>
                    </Link>

                    {/* Category Dropdown (Desktop) */}
                    <div className="hidden lg:block shrink-0">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="text-slate-600 font-semibold gap-1 font-bold lowercase">
                                    Kategori <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                {categories.map((cat) => (
                                    <DropdownMenuItem key={cat.slug} asChild>
                                        <Link href={`/products?category=${cat.slug}`} className="w-full cursor-pointer">
                                            {cat.name}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuItem asChild>
                                    <Link href="/products" className="w-full font-bold text-blue-600">
                                        Lihat Semua
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex-grow relative">
                        <Input
                            type="text"
                            placeholder="Cari barang favoritmu di sini..."
                            className="w-full bg-slate-50 border-slate-200 pl-4 pr-12 h-10 rounded-lg focus-visible:ring-blue-500 font-bold lowercase"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            className="absolute right-0 top-0 h-10 w-10 bg-blue-600 hover:bg-blue-700 rounded-l-none rounded-r-lg"
                        >
                            <Search className="h-4 w-4 text-white" />
                        </Button>
                    </form>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 lg:gap-4 shrink-0">
                        <div className="hidden md:flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="relative text-slate-600">
                                <Bell className="h-5 w-5" />
                                <Badge className="absolute -top-1 -right-1 h-4 min-w-[16px] flex items-center justify-center p-0 text-[8px] bg-red-500 font-bold italic">3</Badge>
                            </Button>
                            <Button variant="ghost" size="icon" className="relative text-slate-600">
                                <Mail className="h-5 w-5" />
                                <Badge className="absolute -top-1 -right-1 h-4 min-w-[16px] flex items-center justify-center p-0 text-[8px] bg-red-500 font-bold italic">5</Badge>
                            </Button>
                        </div>

                        <div className="w-px h-6 bg-slate-200 hidden md:block" />

                        <Link href="/cart">
                            <Button variant="ghost" size="icon" className="relative text-slate-600">
                                <ShoppingCart className="h-5 w-5" />
                                {totalItems > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-5 min-w-[20px] flex items-center justify-center p-0 text-[10px] bg-red-500 font-bold italic">
                                        {totalItems}
                                    </Badge>
                                )}
                            </Button>
                        </Link>

                        <div className="hidden md:flex items-center gap-2">
                            <Link href="/login">
                                <Button variant="outline" className="text-blue-600 border-blue-600 rounded-lg text-xs font-bold px-4 hover:bg-blue-50 lowercase font-bold">Masuk</Button>
                            </Link>
                            <Link href="/register">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold px-4 lowercase font-bold">Daftar</Button>
                            </Link>
                        </div>

                        {/* Mobile Menu */}
                        <Button variant="ghost" size="icon" className="md:hidden text-slate-600">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MarketplaceNavbar;
