export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    soldCount: number;
    image: string;
    category: string;
    featured: boolean;
}

export interface CartItem extends Product {
    quantity: number;
}
