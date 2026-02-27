import type { CartItem, Product } from '../types/index.js';

class CartService {
    // In a real app, this would be in a DB or Redis per session
    private cart: CartItem[] = [];

    async getCart(): Promise<CartItem[]> {
        return this.cart;
    }

    async addToCart(product: Product): Promise<CartItem[]> {
        const existingItem = this.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        return this.cart;
    }

    async updateQuantity(id: string, quantity: number): Promise<CartItem[]> {
        const item = this.cart.find(item => item.id === id);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.cart = this.cart.filter(i => i.id !== id);
            }
        }
        return this.cart;
    }

    async removeFromCart(id: string): Promise<CartItem[]> {
        this.cart = this.cart.filter(item => item.id !== id);
        return this.cart;
    }

    async clearCart(): Promise<void> {
        this.cart = [];
    }
}

export default new CartService();
