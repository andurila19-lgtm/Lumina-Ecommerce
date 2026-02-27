'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
    const pathname = usePathname();
    const { totalItems } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/products' },
        { name: 'Categories', href: '/categories' },
        { name: 'About', href: '/about' },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-slate-900">
                    LUMINA<span className="text-blue-600">.</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-blue-600 ${pathname === link.href ? 'text-blue-600' : 'text-slate-600'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 md:space-x-4">
                    <Button variant="ghost" size="icon" className="hidden sm:flex">
                        <Search className="h-5 w-5 text-slate-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hidden sm:flex">
                        <User className="h-5 w-5 text-slate-600" />
                    </Button>
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingCart className="h-5 w-5 text-slate-600" />
                            {totalItems > 0 && (
                                <Badge
                                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-blue-600"
                                >
                                    {totalItems}
                                </Badge>
                            )}
                        </Button>
                    </Link>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-6 w-6 text-slate-600" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <div className="flex flex-col space-y-6 mt-10">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-lg font-medium border-b border-slate-100 pb-2"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <div className="flex space-x-4 pt-4">
                                    <Button variant="outline" className="flex-1">Login</Button>
                                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Sign Up</Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
