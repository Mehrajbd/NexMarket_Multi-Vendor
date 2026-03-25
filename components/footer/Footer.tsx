'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Facebook, Twitter, Instagram, Youtube, Zap, Mail, Phone, MapPin,
    ShieldCheck, Truck, RotateCcw, Headphones, Globe
} from 'lucide-react';

// ============================================================
// FEATURE BAR (Ecome Top Footer Bar) - Beige/Warm background
// ============================================================
export const FooterFeatureBar = () => (
    <div className="bg-[#fef6ea] border-t border-[#f0e0c0] py-8">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {[
                    {
                        icon: Globe,
                        title: 'Worldwide Delivery',
                        desc: "With sites in 5 languages, we ship to over 200 countries & regions.",
                        color: '#00a6eb',
                    },
                    {
                        icon: ShieldCheck,
                        title: 'Safe Payment',
                        desc: 'Pay with the world\'s most popular and secure payment methods.',
                        color: '#e91e8c',
                    },
                    {
                        icon: RotateCcw,
                        title: 'Shop with Confidence',
                        desc: 'Our Buyer Protection covers your purchase from click to delivery.',
                        color: '#7c3aed',
                    },
                    {
                        icon: Headphones,
                        title: '24/7 Help Center',
                        desc: 'Round-the-clock assistance for a smooth shopping experience.',
                        color: '#f59e0b',
                    },
                ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <div key={idx} className="flex flex-col items-center text-center group">
                            <div
                                className="h-14 w-14 rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: `${item.color}18` }}
                            >
                                <Icon className="h-6 w-6" style={{ color: item.color }} strokeWidth={1.8} />
                            </div>
                            <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                            <p className="text-xs text-gray-500 leading-relaxed max-w-[180px]">{item.desc}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
);

// ============================================================
// COPYRIGHT BAR (Ecome Bottom Footer Bar) - Dark background
// ============================================================
export const FooterCopyrightBar = () => (
    <div className="bg-[#111827] py-4 border-t border-white/10">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-400">
                © {new Date().getFullYear()} <span className="text-[#00a6eb] font-semibold">NexMarket</span>. All Rights Reserved. Powered by NexroLab.
            </p>
            <div className="flex items-center gap-2">
                {['VISA', 'MC', 'AMEX', 'PayPal', 'bKash', 'Nagad'].map((method) => (
                    <span
                        key={method}
                        className="px-2.5 py-1 bg-white/10 border border-white/10 rounded text-[10px] font-bold text-gray-300 hover:bg-white/20 hover:text-white transition-all cursor-pointer"
                    >
                        {method}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

// ============================================================
// MAIN FOOTER
// ============================================================
const Footer = () => {
    const pathname = usePathname();
    const isHidden = pathname?.startsWith('/admin') || (pathname?.startsWith('/vendor') && !pathname?.startsWith('/vendors'));

    if (isHidden) return null;

    return (
        <footer>
            {/* ── Feature Bar ── */}
            <FooterFeatureBar />

            {/* ── Main Footer Body ── */}
            <div className="bg-[#1a1a2e] text-white">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                        {/* Brand */}
                        <div className="lg:col-span-2 space-y-5">
                            <Link href="/" className="flex items-center gap-2.5">
                                <div className="h-10 w-10 rounded-xl flex items-center justify-center ecome-gradient shadow-lg">
                                    <Zap className="h-6 w-6 text-white fill-white" />
                                </div>
                                <div>
                                    <span className="text-xl font-black tracking-tight text-white">NexMarket</span>
                                    <p className="text-[10px] text-gray-400 leading-none">The online digital world</p>
                                </div>
                            </Link>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                                Your premier destination for electronics and gadgets. Quality products from verified vendors worldwide.
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-2.5">
                                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
                                    <MapPin className="h-4 w-4 text-[#00a6eb] shrink-0" />
                                    <span className="text-sm">Dhaka, Bangladesh</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
                                    <Phone className="h-4 w-4 text-[#00a6eb] shrink-0" />
                                    <span className="text-sm">+880 1700-000000</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
                                    <Mail className="h-4 w-4 text-[#00a6eb] shrink-0" />
                                    <span className="text-sm">support@nexmarket.com</span>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-3">
                                {[
                                    { Icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
                                    { Icon: Twitter, href: '#', color: 'hover:bg-sky-500' },
                                    { Icon: Instagram, href: '#', color: 'hover:bg-pink-600' },
                                    { Icon: Youtube, href: '#', color: 'hover:bg-red-600' },
                                ].map(({ Icon, href, color }, idx) => (
                                    <Link
                                        key={idx}
                                        href={href}
                                        className={`h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white ${color} transition-all duration-300`}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-sm font-bold text-white mb-4 pb-2 border-b border-white/10">Quick Menu</h4>
                            <ul className="space-y-2.5">
                                {[
                                    { label: 'New Arrivals', href: '/products?sort=new' },
                                    { label: 'Flash Deals', href: '/deals' },
                                    { label: 'Best Sellers', href: '/products?sort=popular' },
                                    { label: 'All Products', href: '/products' },
                                    { label: 'Our Vendors', href: '/vendors' },
                                    { label: 'Gallery', href: '/gallery' },
                                ].map((item) => (
                                    <li key={item.label}>
                                        <Link href={item.href} className="text-sm text-gray-400 hover:text-[#00a6eb] transition-colors flex items-center gap-1.5 group">
                                            <span className="h-1 w-1 rounded-full bg-gray-600 group-hover:bg-[#00a6eb] transition-colors" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Customer Service */}
                        <div>
                            <h4 className="text-sm font-bold text-white mb-4 pb-2 border-b border-white/10">Customer Service</h4>
                            <ul className="space-y-2.5">
                                {[
                                    { label: 'Help Center', href: '#' },
                                    { label: 'Track My Order', href: '/orders' },
                                    { label: 'Returns & Refunds', href: '#' },
                                    { label: 'Shipping Info', href: '#' },
                                    { label: 'Size Guide', href: '#' },
                                    { label: 'Contact Us', href: '#' },
                                ].map((item) => (
                                    <li key={item.label}>
                                        <Link href={item.href} className="text-sm text-gray-400 hover:text-[#00a6eb] transition-colors flex items-center gap-1.5 group">
                                            <span className="h-1 w-1 rounded-full bg-gray-600 group-hover:bg-[#00a6eb] transition-colors" />
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Security */}
                        <div>
                            <h4 className="text-sm font-bold text-white mb-4 pb-2 border-b border-white/10">Security</h4>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                                    <ShieldCheck className="h-5 w-5 text-[#00a6eb] shrink-0" />
                                    <div>
                                        <p className="text-[11px] font-bold text-white">Secured by AES-256</p>
                                        <p className="text-[10px] text-gray-400">Encrypted Transactions</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                                    <Truck className="h-5 w-5 text-[#e91e8c] shrink-0" />
                                    <div>
                                        <p className="text-[11px] font-bold text-white">Fast Delivery</p>
                                        <p className="text-[10px] text-gray-400">Free on orders ৳5000+</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Copyright Bar ── */}
            <FooterCopyrightBar />
        </footer>
    );
};

export default Footer;
