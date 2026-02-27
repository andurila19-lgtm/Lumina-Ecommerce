import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | MARKETID',
    default: 'MARKETID | Belanja Online Aman & Nyaman',
  },
  description: "Temukan jutaan produk impianmu dengan harga terbaik hanya di MARKETID. Gratis Ongkir, Flash Sale tiap hari!",
  keywords: ["ecommerce", "belanja online", "marketid", "promo", "gadget", "fashion"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.className} antialiased bg-white text-slate-900`}>
        <CartProvider>
          {children}
          <Toaster position="top-center" richColors />
        </CartProvider>
      </body>
    </html>
  );
}
