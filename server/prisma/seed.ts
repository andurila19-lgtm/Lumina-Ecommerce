import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

// Since the server is ES Modules (type: module), we might need to read the JSON manually
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // Read the products from the frontend src directory
    const productsPath = path.resolve(__dirname, '../../src/data/products.json');
    const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

    // Create products
    for (const p of productsData) {
        // Checking if product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id: p.id },
        });

        if (!existingProduct) {
            await prisma.product.create({
                data: {
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    price: p.price,
                    originalPrice: p.originalPrice || null,
                    discount: p.discount || null,
                    category: p.category,
                    image: p.image,
                    rating: p.rating,
                    soldCount: p.soldCount,
                    stockCount: 100 // default stock
                },
            });
            console.log(`Created product with id: ${p.id}`);
        } else {
            console.log(`Product with id: ${p.id} already exists.`);
        }
    }

    // Create a dummy admin user
    const adminEmail = 'admin@marketid.com';
    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail }
    });

    if (!existingAdmin) {
        await prisma.user.create({
            data: {
                email: adminEmail,
                fullName: 'Admin MarketID',
                phoneNumber: '08123456789',
            }
        });
        console.log('Created dummy admin user');
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
