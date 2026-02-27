'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatNumber } from '@/lib/utils/format';

interface MarketplaceCardProps {
    product: Product;
    priority?: boolean;
}

const MarketplaceCard: React.FC<MarketplaceCardProps> = ({ product, priority = false }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast.success(`${product.name.substring(0, 20)}... ditambahkan!`, {
            style: { backgroundColor: '#2563eb', color: 'white' }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-full"
        >
            <Link href={`/products/${product.id}`}>
                <Card className="group h-full overflow-hidden border-slate-100 hover:shadow-lg transition-all duration-300 flex flex-col bg-white">
                    <div className="relative aspect-square overflow-hidden shrink-0">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            priority={priority}
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {product.discount && (
                            <Badge className="absolute top-2 left-2 bg-red-500 border-none font-bold">
                                {product.discount}% OFF
                            </Badge>
                        )}
                        <div className="absolute top-2 right-2 h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ShoppingCart className="h-4 w-4 text-white" />
                        </div>
                    </div>

                    <CardContent className="p-3 flex-grow flex flex-col gap-1">
                        <h3 className="text-sm font-medium text-slate-800 line-clamp-2 leading-tight min-h-[2.5rem]">
                            {product.name}
                        </h3>

                        <div className="mt-1">
                            <p className="text-blue-600 font-black text-lg">
                                {formatCurrency(product.price)}
                            </p>
                            {product.originalPrice && (
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-slate-400 line-through">
                                        {formatCurrency(product.originalPrice)}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="mt-auto pt-2 flex items-center justify-between text-[11px] text-slate-500">
                            <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="font-bold text-slate-700">{product.rating}</span>
                                <span>|</span>
                                <span>Terjual {formatNumber(product.soldCount)}</span>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="p-2 pt-0">
                        <Button
                            className="w-full h-8 text-xs font-bold bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                            onClick={handleAddToCart}
                        >
                            + Keranjang
                        </Button>
                    </CardFooter>
                </Card>
            </Link>
        </motion.div>
    );
};

export default MarketplaceCard;
