import { Router } from 'express';
import * as productController from '../controllers/productController.js';
import * as cartController from '../controllers/cartController.js';

const router = Router();

// Product routes
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);

// Cart routes
router.get('/cart', cartController.getCart);
router.post('/cart', cartController.addToCart);
router.put('/cart/:id', cartController.updateQuantity);
router.delete('/cart/:id', cartController.removeFromCart);
router.post('/checkout', cartController.checkout);

export default router;
