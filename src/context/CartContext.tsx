'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, CartContextType } from '@/types';

const API_URL = 'http://localhost:5000/api';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Fetch initial cart from backend
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`${API_URL}/cart`);
                if (response.ok) {
                    const data = await response.json();
                    setCart(data);
                } else {
                    // Fallback to localStorage if server is down
                    const savedCart = localStorage.getItem('cart');
                    if (savedCart) setCart(JSON.parse(savedCart));
                }
            } catch (error) {
                console.error('Failed to fetch cart from server:', error);
                const savedCart = localStorage.getItem('cart');
                if (savedCart) setCart(JSON.parse(savedCart));
            }
        };
        fetchCart();
    }, []);

    // Sync localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = async (product: Product) => {
        try {
            const response = await fetch(`${API_URL}/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });
            if (response.ok) {
                const data = await response.json();
                setCart(data);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            // Optimistic update fallback
            setCart((prevCart) => {
                const existingItem = prevCart.find((item) => item.id === product.id);
                if (existingItem) {
                    return prevCart.map((item) =>
                        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                }
                return [...prevCart, { ...product, quantity: 1 }];
            });
        }
    };

    const removeFromCart = async (productId: string) => {
        try {
            const response = await fetch(`${API_URL}/cart/${productId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const data = await response.json();
                setCart(data);
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
            setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
        }
    };

    const updateQuantity = async (productId: string, quantity: number) => {
        if (quantity < 1) return;
        try {
            const response = await fetch(`${API_URL}/cart/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity }),
            });
            if (response.ok) {
                const data = await response.json();
                setCart(data);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.id === productId ? { ...item, quantity } : item
                )
            );
        }
    };

    const clearCart = async () => {
        try {
            await fetch(`${API_URL}/checkout`, { method: 'POST' });
            setCart([]);
        } catch (error) {
            console.error('Error clearing cart:', error);
            setCart([]);
        }
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalPrice,
                totalItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
