'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast.success(`${product.name} added to cart!`, {
            description: "You've successfully added this item.",
            action: {
                label: "View Cart",
                onClick: () => window.location.href = "/cart",
            },
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
            <Card className="group overflow-hidden border-none bg-slate-50/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
                <CardContent className="p-0 relative aspect-square overflow-hidden bg-white">
                    {product.featured && (
                        <Badge className="absolute top-4 left-4 z-10 bg-blue-600 shadow-lg shadow-blue-600/20 px-3 py-1">
                            Featured
                        </Badge>
                    )}

                    <motion.div
                        className="w-full h-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Quick Actions Overlay */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
                        <Link href={`/products/${product.id}`}>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button variant="secondary" size="icon" className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl">
                                    <Eye className="h-4 w-4 text-slate-900" />
                                </Button>
                            </motion.div>
                        </Link>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl"
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart className="h-4 w-4 text-slate-900" />
                            </Button>
                        </motion.div>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col items-start p-6 bg-white transition-colors">
                    <div className="flex justify-between w-full items-start mb-2">
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">{product.category}</p>
                        <p className="font-bold text-slate-900">${product.price.toFixed(2)}</p>
                    </div>
                    <Link href={`/products/${product.id}`} className="hover:text-blue-600 transition-colors w-full">
                        <h3 className="font-bold text-slate-800 text-lg line-clamp-1 mb-1">{product.name}</h3>
                    </Link>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed h-10">{product.description}</p>

                    <Button
                        className="w-full mt-6 bg-slate-900 hover:bg-blue-600 text-white transition-all duration-500 rounded-full h-11 font-semibold group"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                        <motion.span
                            className="ml-2"
                            initial={{ x: 0 }}
                            whileHover={{ x: 3 }}
                        >
                            <ShoppingCart className="h-4 w-4" />
                        </motion.span>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

export default ProductCard;
