import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Product } from '../types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8')
);

class ProductService {
    private products: Product[] = productsData as Product[];

    async getAllProducts(category?: string, query?: string): Promise<Product[]> {
        let filtered = [...this.products];

        if (category) {
            filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }

        if (query) {
            const q = query.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q)
            );
        }

        return filtered;
    }

    async getProductById(id: string): Promise<Product | undefined> {
        return this.products.find(p => p.id === id);
    }
}

export default new ProductService();
