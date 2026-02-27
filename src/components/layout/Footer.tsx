import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-3xl font-black tracking-tighter text-blue-600 mb-6 block uppercase">
                            MARKET<span className="text-orange-500">ID</span>
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-sm italic font-light">
                            MarketID adalah marketplace terpercaya di Indonesia yang menghubungkan jutaan pembeli dengan produk-produk berkualitas terbaik dari ribuan merchant.
                        </p>
                        <div className="flex gap-4 mt-8">
                            {/* Social Icons placeholders */}
                            <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-bold">f</span>
                            </div>
                            <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-400 font-bold">t</span>
                            </div>
                            <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center">
                                <span className="text-pink-600 font-bold">i</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs italic font-light">Layanan Pelanggan</h4>
                        <ul className="space-y-4 text-sm text-slate-500 italic font-light">
                            <li><Link href="#" className="hover:text-blue-600">Pusat Bantuan</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Cara Pembelian</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Pengiriman</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Pengembalian Barang</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs italic font-light">Jelajahi MarketID</h4>
                        <ul className="space-y-4 text-sm text-slate-500 italic font-light">
                            <li><Link href="/about" className="hover:text-blue-600">Tentang Kami</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Karir</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Kebijakan Privasi</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Blog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs italic font-light">Unduh Aplikasi</h4>
                        <div className="space-y-4">
                            <div className="bg-slate-900 text-white p-3 rounded-xl flex items-center gap-3 cursor-pointer">
                                <div className="h-8 w-8 bg-white/20 rounded-lg" />
                                <div>
                                    <p className="text-[10px] opacity-70">Download on the</p>
                                    <p className="text-sm font-bold">App Store</p>
                                </div>
                            </div>
                            <div className="bg-slate-900 text-white p-3 rounded-xl flex items-center gap-3 cursor-pointer">
                                <div className="h-8 w-8 bg-white/20 rounded-lg" />
                                <div>
                                    <p className="text-[10px] opacity-70">GET IT ON</p>
                                    <p className="text-sm font-bold">Google Play</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter italic font-light">
                        © 2026 MARKETID. Toko Online Aman & Terpercaya.
                    </p>
                    <div className="flex gap-6 uppercase font-medium bg-transparent border-white border text-white hover:text-white">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_visa.png" alt="Visa" className="h-4 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/72/Mastercard-logo.png" alt="Mastercard" className="h-4 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Logo_BCA.png" alt="BCA" className="h-4 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
