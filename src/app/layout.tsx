import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LUMINA | Modern E-Commerce Store",
  description: "Experience premium shopping with our curated collection of minimalist products.",
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
