import type { Request, Response } from 'express';
import productService from '../services/productService.js';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const { category, q } = req.query;
        const products = await productService.getAllProducts(
            category as string,
            q as string
        );
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const product = await productService.getProductById(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};
