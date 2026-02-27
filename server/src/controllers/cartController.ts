import type { Request, Response } from 'express';
import cartService from '../services/cartService.js';

export const getCart = async (req: Request, res: Response) => {
    try {
        const cart = await cartService.getCart();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error });
    }
};

export const addToCart = async (req: Request, res: Response) => {
    try {
        const product = req.body;
        const cart = await cartService.addToCart(product);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error });
    }
};

export const updateQuantity = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { quantity } = req.body;
        const cart = await cartService.updateQuantity(id, quantity);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error updating quantity', error });
    }
};

export const removeFromCart = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const cart = await cartService.removeFromCart(id);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error removing from cart', error });
    }
};

export const checkout = async (req: Request, res: Response) => {
    try {
        // Mock checkout logic
        await cartService.clearCart();
        res.json({ message: 'Checkout successful! Order placement simulated.', orderId: Math.random().toString(36).substring(7).toUpperCase() });
    } catch (error) {
        res.status(500).json({ message: 'Error during checkout', error });
    }
};
