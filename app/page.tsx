'use client';

import Hero from '@/components/home/Hero';
import CategoryList from '@/components/home/CategoryList';
import ProductCard from '@/components/cards/ProductCard';
import { useProductStore } from '@/store/useProductStore';
import { ArrowRight, Zap, ShieldCheck, Truck, RotateCcw, Headphones, Star, ChevronRight, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Countdown Timer Hook
function useCountdown(targetHours: number) {
    const [time, setTime] = useState({ h: targetHours, m: 0, s: 0 });
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prev => {
                let { h, m, s } = prev;
                s--;
                if (s < 0) { s = 59; m--; }
                if (m < 0) { m = 59; h--; }
                if (h < 0) { h = targetHours; m = 0; s = 0; }
                return { h, m, s };
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [targetHours]);
    return time;
}

// Flash Deal Product (mock data for showcase)
const flashProducts = [
    {
        id: 'f1', name: 'Esonstyle Rose Golden Bluetooth Headphone',
        price: 79, originalPrice: 99, soldPercent: 19, available: 22,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400',
        rating: 4.5,
    },
    {
        id: 'f2', name: 'Premium Wireless Noise Cancelling Earbuds Pro',
        price: 59, originalPrice: 89, soldPercent: 45, available: 15,
        image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&q=80&w=400',
        rating: 4.8,
    },
    {
        id: 'f3', name: 'Smart Watch Fitness Tracker with Heart Monitor',
        price: 89, originalPrice: 129, soldPercent: 62, available: 8,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400',
        rating: 4.3,
    },
];

const promoItems = [
    {
        title: 'Home at the good',
        from: 69.99,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400',
        bg: '#f0f8ff', href: '/products?category=home',
    },
    {
        title: 'Snap Digital Camera',
        from: 19.99,
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=400',
        bg: '#fff0f6', href: '/products?category=camera',
    },
    {
        title: 'Minimal Gold Wall Clock',
        from: 39.99,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        bg: '#fffbeb', href: '/products?category=home',
    },
];

const brands = [
    { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png' },
    { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png' },
    { name: 'Sony', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/2560px-Sony_logo.svg.png' },
    { name: 'LG', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/LG_logo_%282015%29.svg/2560px-LG_logo_%282015%29.svg.png' },
    { name: 'ASUS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/2560px-ASUS_Logo.svg.png' },
];

const features = [
    { icon: Truck, title: 'Worldwide Delivery', desc: 'On all orders above ৳5000', color: '#00a6eb' },
    { icon: RotateCcw, title: 'Safe Payment', desc: '100% secure payment', color: '#e91e8c' },
    { icon: ShieldCheck, title: '30 Days Return', desc: '30 days money back', color: '#7c3aed' },
    { icon: Headphones, title: '24/7 Support', desc: 'Dedicated support', color: '#f59e0b' },
];

export default function Home() {
    const { products } = useProductStore();
    const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);
    const topRatedProducts = products.slice().sort((a, b) => b.rating - a.rating).slice(0, 8);
    const countdown = useCountdown(8);
    const [activeTab, setActiveTab] = useState<'featured' | 'top-rated' | 'most-gifted'>('featured');

    const activeProducts = activeTab === 'featured' ? featuredProducts : activeTab === 'top-rated' ? topRatedProducts : featuredProducts.slice().reverse();

    return (
        <main className="min-h-screen bg-[#f5f5f5]">
            <Hero />
            <CategoryList />

            {/* Flash Deals Section */}
            <section className="py-8 bg-white mt-4">
                <div className="container mx-auto px-4">
                    {/* Section Header with Countdown */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="h-1 w-6 rounded-full bg-[#e91e8c]" />
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-[#e91e8c] fill-[#e91e8c]" />
                                    Flash Deals
                                </h2>
                            </div>
                            {/* Countdown */}
                            <div className="flex items-center gap-1.5 bg-[#1a1a2e] text-white px-3 py-1.5 rounded-lg">
                                <span className="text-[10px] font-medium opacity-70">Ends in:</span>
                                {[
                                    { val: countdown.h, label: 'H' },
                                    { val: countdown.m, label: 'M' },
                                    { val: countdown.s, label: 'S' },
                                ].map((t, i) => (
                                    <div key={i} className="flex items-center gap-1">
                                        <div className="countdown-box !bg-[#00a6eb] !text-white !w-9 !h-9 rounded-md">
                                            <span className="text-sm font-black leading-none">{String(t.val).padStart(2, '0')}</span>
                                            <span className="text-[8px] opacity-70">{t.label}</span>
                                        </div>
                                        {i < 2 && <span className="font-black text-[#e91e8c]">:</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Link href="/deals" className="text-[#00a6eb] text-sm font-semibold hover:underline flex items-center gap-1">
                            View all deals <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Flash Products */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {flashProducts.map((p) => {
                            const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
                            return (
                                <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#00a6eb]/30 hover:shadow-lg transition-all group">
                                    <div className="relative h-44 mb-4 bg-[#f8f8f8] rounded-lg overflow-hidden">
                                        <Image src={p.image} alt={p.name} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-300" />
                                        <div className="absolute top-2 left-2 bg-[#e53935] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                                            -{discount}%
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg font-bold text-[#e53935]">${p.price}</span>
                                        <span className="text-xs text-gray-400 line-through">${p.originalPrice}</span>
                                    </div>
                                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-3 leading-snug group-hover:text-[#00a6eb] transition-colors">
                                        {p.name}
                                    </h3>
                                    {/* Progress Bar */}
                                    <div className="mb-1.5">
                                        <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                                            <span>{p.soldPercent}% already claimed</span>
                                            <span>Available: {p.available}</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="progress-bar h-full"
                                                style={{ width: `${p.soldPercent}%` }}
                                            />
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-2">
                                        Deal ends in: <span className="text-[#e91e8c] font-bold">
                                            {String(countdown.h).padStart(2,'0')}:{String(countdown.m).padStart(2,'0')}:{String(countdown.s).padStart(2,'0')}
                                        </span>
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Promo Banners */}
            <section className="py-6 bg-[#f5f5f5]">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {promoItems.map((item, idx) => (
                            <Link key={idx} href={item.href}>
                                <div
                                    className="rounded-xl overflow-hidden flex items-center justify-between p-6 group hover:shadow-lg transition-all cursor-pointer relative h-[170px]"
                                    style={{ backgroundColor: item.bg }}
                                >
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-1">{item.title}</h3>
                                        <p className="text-gray-500 text-sm mb-2">
                                            From <span className="text-[#e53935] font-black text-lg">{item.from}<sup className="text-xs">$</sup></span>
                                        </p>
                                        <span className="text-[#00a6eb] text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Shop now <ChevronRight className="h-3 w-3" />
                                        </span>
                                    </div>
                                    <div className="relative h-28 w-28 shrink-0">
                                        <Image src={item.image} alt={item.title} fill className="object-contain group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured / Top Rated / Most Gifted Tabs */}
            <section className="py-8 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    {/* Tab Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-1 border border-gray-200 rounded-full p-1">
                            {(['featured', 'top-rated', 'most-gifted'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                                        activeTab === tab
                                            ? 'ecome-gradient text-white shadow-sm'
                                            : 'text-gray-600 hover:text-[#00a6eb]'
                                    }`}
                                >
                                    {tab === 'featured' ? 'Featured' : tab === 'top-rated' ? 'Top Rated' : 'Most Gifted'}
                                </button>
                            ))}
                        </div>
                        <Link href="/products" className="text-[#00a6eb] text-sm font-semibold hover:underline flex items-center gap-1">
                            View all <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {(activeProducts.length > 0 ? activeProducts : Array(6).fill(null)).slice(0, 6).map((product, idx) =>
                            product ? (
                                <ProductCard key={product.id} product={product} />
                            ) : (
                                <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 h-72 animate-pulse">
                                    <div className="bg-gray-100 h-40 rounded-lg mb-3" />
                                    <div className="bg-gray-100 h-3 rounded mb-2" />
                                    <div className="bg-gray-100 h-3 w-2/3 rounded mb-3" />
                                    <div className="bg-gray-100 h-4 w-1/3 rounded" />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* Big Promo Banner */}
            <section className="py-6 bg-[#f5f5f5]">
                <div className="container mx-auto px-4">
                    <div className="rounded-2xl overflow-hidden relative h-[220px] md:h-[280px]">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0072ff] via-[#00c6ff] to-[#7c3aed]" />
                        <div className="absolute inset-0 flex items-center justify-between p-10 md:p-16 z-10">
                            <div>
                                <p className="text-white/60 text-sm font-medium mb-2">Limited Time Offer</p>
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                                    Save Up to <span className="text-yellow-300">75%</span><br />
                                    on Electronics
                                </h2>
                                <Link
                                    href="/deals"
                                    className="inline-flex items-center gap-2 bg-white text-[#0072ff] font-bold text-sm px-8 py-3.5 rounded-full hover:shadow-xl transition-all active:scale-95"
                                >
                                    Shop the Sale <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                            <div className="hidden md:block relative h-56 w-72">
                                <Image
                                    src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&q=80&w=600"
                                    alt="Electronics Sale"
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Best Sellers */}
            <section className="py-8 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="h-1 w-6 rounded-full bg-[#e53935]" />
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Star className="h-5 w-5 text-[#f59e0b] fill-[#f59e0b]" />
                                Best Sellers
                            </h2>
                        </div>
                        <Link href="/products?sort=popular" className="text-[#00a6eb] text-sm font-semibold hover:underline flex items-center gap-1">
                            View all <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {(products.length > 0 ? products : []).slice(0, 6).map((product, idx) =>
                            product ? (
                                <ProductCard key={product.id} product={product} />
                            ) : (
                                <div key={idx} className="bg-white border border-gray-200 rounded-lg h-72 animate-pulse" />
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* Partner Vendors */}
            <section className="py-8 bg-[#f5f5f5] border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="h-1 w-6 rounded-full ecome-gradient" />
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Users className="h-5 w-5 text-[#00a6eb]" />
                                Our Vendors
                            </h2>
                        </div>
                        <Link href="/vendors" className="text-[#00a6eb] text-sm font-semibold hover:underline flex items-center gap-1">
                            All Vendors <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { name: 'TechVision Pro', tag: 'VERIFIED ELITE', clients: '1.2k+ Satisfied Customers', initials: 'TV', color: 'from-blue-500 to-[#00a6eb]', rating: 4.9 },
                            { name: 'UrbanGear Store', tag: 'TOP RATED', clients: '800+ Products Sold', initials: 'UG', color: 'from-purple-500 to-[#e91e8c]', rating: 4.7 },
                            { name: 'EcoTech Solutions', tag: 'SUSTAINABILITY', clients: 'Certified Eco Partner', initials: 'ET', color: 'from-emerald-500 to-teal-600', rating: 4.6 },
                        ].map((vendor, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#00a6eb]/30 hover:shadow-lg transition-all group text-center"
                            >
                                <div className={`h-16 w-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${vendor.color} flex items-center justify-center text-white text-xl font-black shadow-lg group-hover:scale-110 transition-transform`}>
                                    {vendor.initials}
                                </div>
                                <h3 className="text-base font-bold text-gray-900 mb-1">{vendor.name}</h3>
                                <div className="flex items-center justify-center gap-1 mb-2">
                                    {[1,2,3,4,5].map(s => (
                                        <Star key={s} className={`h-3 w-3 ${s <= Math.round(vendor.rating) ? 'star-filled' : 'text-gray-200 fill-gray-200'}`} />
                                    ))}
                                    <span className="text-[10px] text-gray-500 ml-1">{vendor.rating}</span>
                                </div>
                                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#00a6eb] bg-blue-50 px-3 py-0.5 rounded-full mb-2">
                                    {vendor.tag}
                                </span>
                                <p className="text-xs text-gray-400">{vendor.clients}</p>
                                <Link
                                    href="/vendors"
                                    className="mt-4 inline-flex items-center gap-1 text-[#00a6eb] text-xs font-semibold hover:underline"
                                >
                                    Visit Store <ChevronRight className="h-3 w-3" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-10 bg-gradient-to-r from-[#1a1a2e] to-[#0f3460]">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <p className="text-[#00a6eb] text-sm font-semibold mb-2 flex items-center gap-2">
                                <Zap className="h-4 w-4 fill-[#00a6eb]" />
                                Exclusive Member Deals
                            </p>
                            <h2 className="text-2xl md:text-3xl font-black text-white mb-1">
                                Subscribe & Get 10% Off
                            </h2>
                            <p className="text-gray-400 text-sm">
                                Join NexMarket Elite for exclusive drops and member-only pricing.
                            </p>
                        </div>
                        <form className="flex flex-col sm:flex-row gap-3 w-full md:w-auto min-w-[400px]">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                required
                                className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 text-sm outline-none focus:border-[#00a6eb] transition-colors backdrop-blur-sm"
                            />
                            <button
                                type="submit"
                                className="px-8 py-3.5 rounded-full ecome-gradient text-white font-bold text-sm hover:opacity-90 transition-all active:scale-95 whitespace-nowrap shadow-lg"
                            >
                                Subscribe Now
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Feature Guarantees */}
            <section className="py-8 bg-[#fff9f0] border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {features.map((f, idx) => {
                            const Icon = f.icon;
                            return (
                                <div key={idx} className="flex items-start gap-4 group">
                                    <div
                                        className="h-12 w-12 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                                        style={{ backgroundColor: `${f.color}15` }}
                                    >
                                        <Icon className="h-5 w-5" style={{ color: f.color }} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-sm">{f.title}</h3>
                                        <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}
