import { Metadata } from 'next';
import productsData from '@/data/products.json';
import ProductDetailClient from './ProductDetailClient';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = productsData.find((p) => p.id === id);

    if (!product) {
        return {
            title: 'Produk Tidak Ditemukan',
        };
    }

    return {
        title: product.name,
        description: product.description.substring(0, 160) + '...',
        openGraph: {
            title: `${product.name} | MARKETID`,
            description: product.description.substring(0, 160) + '...',
            images: [
                {
                    url: product.image,
                    width: 800,
                    height: 800,
                    alt: product.name,
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: product.name,
            description: product.description.substring(0, 160) + '...',
            images: [product.image],
        },
    };
}

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;

    // In a real database, you would fetch the product from PostgreSQL/Prisma here:
    // const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });

    const product = productsData.find(p => p.id === id);

    return <ProductDetailClient product={product} />;
}
