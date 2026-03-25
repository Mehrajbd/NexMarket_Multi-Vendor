'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import Footer, { FooterFeatureBar, FooterCopyrightBar } from '@/components/footer/Footer';
import Image from 'next/image';
import {
    Star,
    ShoppingCart,
    Heart,
    Share2,
    ShieldCheck,
    Truck,
    RotateCcw,
    Check,
    Plus,
    Minus,
    ChevronRight,
    Tag,
    Package,
    Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockProducts } from '@/lib/api/mockData';
import { useCartStore } from '@/store/useCartStore';
import { useVendorStore } from '@/store/useVendorStore';
import VendorChatDialog from '@/components/chat/VendorChatDialog';
import Link from 'next/link';

const ProductDetail = ({ params }: { params: { id: string } }) => {
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore((state) => state.addItem);
    const vendors = useVendorStore((state) => state.vendors);

    // In a real app, we'd fetch based on params.id
    const product = mockProducts.find(p => p.id === params.id) || mockProducts[0];
    const vendor = vendors.find(v => v.id === product.vendorId);
    const vendorName = vendor ? vendor.name : product.vendorName;

    return (
        <div className="min-h-screen bg-[#f5f5f5]">
            <Navbar />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200 pt-[148px]">
                <div className="container mx-auto px-4 py-3">
                    <nav className="flex items-center gap-2 text-xs text-gray-500">
                        <Link href="/" className="hover:text-[#00a6eb] transition-colors">Home</Link>
                        <ChevronRight className="h-3 w-3" />
                        <Link href="/products" className="hover:text-[#00a6eb] transition-colors">Products</Link>
                        <ChevronRight className="h-3 w-3" />
                        <Link href={`/products?category=${product.category.toLowerCase()}`} className="hover:text-[#00a6eb] transition-colors">{product.category}</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-gray-800 font-medium line-clamp-1 max-w-[200px]">{product.name}</span>
                    </nav>
                </div>
            </div>

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    {/* Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f8f8f8] border border-gray-100">
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-contain p-8"
                                priority
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {[0, 0, 0, 0].map((_, i) => (
                                <div key={i} className={`relative aspect-square rounded-lg overflow-hidden bg-[#f8f8f8] border-2 cursor-pointer transition-all hover:border-[#00a6eb] ${i === 0 ? 'border-[#00a6eb]' : 'border-gray-200'}`}>
                                    <Image src={product.images[0]} alt={`Thumb ${i + 1}`} fill className="object-contain p-2 opacity-70 hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col">
                        {/* Category + Actions */}
                        <div className="flex items-center justify-between mb-3">
                            <Link href={`/products?category=${product.category.toLowerCase()}`}>
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#00a6eb] bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
                                    {product.category}
                                </span>
                            </Link>
                            <div className="flex gap-2">
                                <button className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#00a6eb] hover:border-[#00a6eb] transition-all">
                                    <Share2 className="h-4 w-4" />
                                </button>
                                <button className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#e91e8c] hover:border-[#e91e8c] transition-all">
                                    <Heart className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-snug">{product.name}</h1>

                        {/* Rating Row */}
                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className="h-4 w-4 fill-[#ff9f43] text-[#ff9f43]" />
                                ))}
                            </div>
                            <span className="text-sm font-bold text-gray-800">{product.rating}</span>
                            <span className="text-sm text-gray-400">({product.reviewsCount} Reviews)</span>
                            <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">✓ In Stock</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-4">
                            <span className="text-3xl font-black text-[#e53935]">${product.price}.00</span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-base text-gray-400 line-through">${product.originalPrice}</span>
                                    <span className="text-sm font-bold text-white bg-[#e53935] px-2 py-0.5 rounded">
                                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                            {product.description}
                        </p>

                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            {/* Qty + Add to Cart */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                                    <button
                                        className="h-12 w-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-12 text-center font-bold text-base border-x border-gray-200 h-12 flex items-center justify-center">{quantity}</span>
                                    <button
                                        className="h-12 w-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                                <button
                                    className="flex-1 h-12 rounded-md ecome-gradient text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-blue-200"
                                    onClick={() => addItem(product)}
                                >
                                    <ShoppingCart className="h-4 w-4" />
                                    Add to Cart
                                </button>
                            </div>
                            {/* Buy Now */}
                            <button className="w-full h-12 rounded-md bg-[#1a1a2e] text-white font-bold text-sm hover:bg-[#0f3460] active:scale-[0.98] transition-all">
                                Buy Now
                            </button>
                        </div>

                        {/* Trust badges */}
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            {[
                                { icon: Truck, label: 'Free Delivery', sub: 'Orders over ৳5000', color: '#00a6eb' },
                                { icon: RotateCcw, label: '30 Day Return', sub: 'No questions asked', color: '#e91e8c' },
                                { icon: ShieldCheck, label: 'Secure Payment', sub: 'AES-256 Encrypted', color: '#7c3aed' },
                                { icon: Globe, label: 'Worldwide Ship', sub: '200+ countries', color: '#f59e0b' },
                            ].map((b, i) => {
                                const Icon = b.icon;
                                return (
                                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-100">
                                        <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${b.color}15` }}>
                                            <Icon className="h-4 w-4" style={{ color: b.color }} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-xs text-gray-800">{b.label}</p>
                                            <p className="text-[10px] text-gray-400">{b.sub}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Vendor Card */}
                        <div className="mt-4 p-4 rounded-xl bg-[#1a1a2e] text-white relative overflow-hidden border border-white/5">
                            <div className="relative z-10 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full ecome-gradient flex items-center justify-center text-white font-black text-sm shrink-0">
                                        {vendorName?.[0] || 'V'}
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-[#00a6eb] uppercase tracking-wider font-bold">Verified Store</p>
                                        <h4 className="text-sm font-bold text-white">{vendorName}</h4>
                                        <p className="text-[10px] text-gray-400">{vendor?.totalSales?.toLocaleString() || '1.2k'}+ Sales</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <VendorChatDialog vendorName={vendorName} />
                                    <Link href="/vendors">
                                        <button className="px-3 py-1.5 rounded-md bg-white/10 border border-white/20 text-white text-xs font-semibold hover:bg-white/20 transition-colors">
                                            Visit Store
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 h-full w-24 bg-[#00a6eb]/10 blur-2xl" />
                        </div>
                    </div>
                </div>

                {/* Feature Tabs */}
                <section className="py-8 mt-2">
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <Tabs defaultValue="details" className="w-full">
                        <TabsList className="mb-6 p-0.5 bg-gray-100 rounded-lg h-auto border border-gray-200">
                            <TabsTrigger value="details" className="rounded-md px-6 py-2.5 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-[#00a6eb] data-[state=active]:shadow-sm transition-all">Product Details</TabsTrigger>
                            <TabsTrigger value="specs" className="rounded-md px-6 py-2.5 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-[#00a6eb] data-[state=active]:shadow-sm transition-all">Specifications</TabsTrigger>
                            <TabsTrigger value="reviews" className="rounded-md px-6 py-2.5 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-[#00a6eb] data-[state=active]:shadow-sm transition-all">Customer Reviews</TabsTrigger>
                        </TabsList>
                        <TabsContent value="details" className="space-y-6 max-w-4xl">
                            <h3 className="text-2xl font-bold">Unmatched Sound Quality</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Our proprietary driver technology delivers deep bass and crisp highs. The intelligent noise cancellation monitors ambient sound 700 times per second to ensure you only hear what you want.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    'Hi-Res Audio Certified',
                                    'Active Noise Cancellation',
                                    '40h Battery Life',
                                    'Bluetooth 5.2',
                                    'Built-in Voice Assistant',
                                    'Rapid Fast Charging'
                                ].map((feature) => (
                                    <div key={feature} className="flex items-center gap-2">
                                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <Check className="h-3 w-3" />
                                        </div>
                                        <span className="text-sm font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="specs">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border rounded-2xl overflow-hidden">
                                <div className="flex flex-col">
                                    <div className="p-4 border-b font-bold bg-muted/30">General</div>
                                    <div className="p-4 border-b flex justify-between">
                                        <span className="text-muted-foreground">Frequency Response</span>
                                        <span className="font-medium">4Hz - 40,000Hz</span>
                                    </div>
                                    <div className="p-4 flex justify-between">
                                        <span className="text-muted-foreground">Sensitivity</span>
                                        <span className="font-medium">105 dB/mW</span>
                                    </div>
                                </div>
                                <div className="flex flex-col border-l">
                                    <div className="p-4 border-b font-bold bg-muted/30">Battery</div>
                                    <div className="p-4 border-b flex justify-between">
                                        <span className="text-muted-foreground">Charging Time</span>
                                        <span className="font-medium">Approx. 3 hours</span>
                                    </div>
                                    <div className="p-4 flex justify-between">
                                        <span className="text-muted-foreground">Weight</span>
                                        <span className="font-medium">254g</span>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="reviews">
                            <div className="flex flex-col gap-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-3xl font-bold">4.8</h3>
                                        <div className="flex items-center gap-1 mt-1">
                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                                        </div>
                                        <p className="text-muted-foreground text-sm mt-2">Based on 1,240 ratings</p>
                                    </div>
                                    <Button size="lg" className="rounded-full font-bold">Write a Review</Button>
                                </div>

                                <div className="space-y-8 mt-8">
                                    {[
                                        { user: 'James D.', rating: 5, date: '2 weeks ago', text: 'Incredible battery life! I use these for my daily commute and work. I\'ve only had to charge them once in two weeks!' },
                                        { user: 'Sarah L.', rating: 4, date: '1 month ago', text: 'Great sound quality, slightly heavy for long sessions but the padding makes it bearable.' }
                                    ].map((review, i) => (
                                        <div key={i} className="border-b pb-8">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="font-bold">{review.user}</p>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        {Array.from({ length: 5 }).map((_, idx) => (
                                                            <Star key={idx} className={`h-3 w-3 ${idx < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-xs text-muted-foreground">{review.date}</span>
                                            </div>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">&quot;{review.text}&quot;</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                    </div>
                </section>
            </main>

            {/* ── Footer Feature Bar (2 bars) ── */}
            <FooterFeatureBar />
            <div className="bg-[#1a1a2e]">
                <div className="container mx-auto px-4 py-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'Quick Links', links: [{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Vendors', href: '/vendors' }, { label: 'Flash Deals', href: '/deals' }] },
                            { title: 'Categories', links: [{ label: 'Electronics', href: '/products?category=electronics' }, { label: 'Headphones', href: '/products?category=headphones' }, { label: 'Wearables', href: '/products?category=wearable' }, { label: 'Laptops', href: '/products?category=computers' }] },
                            { title: 'Customer Service', links: [{ label: 'Help Center', href: '#' }, { label: 'Track Order', href: '/orders' }, { label: 'Returns', href: '#' }, { label: 'Contact Us', href: '#' }] },
                            { title: 'About NexMarket', links: [{ label: 'About Us', href: '#' }, { label: 'Privacy Policy', href: '#' }, { label: 'Terms of Service', href: '#' }, { label: 'Sitemap', href: '#' }] },
                        ].map((col, idx) => (
                            <div key={idx}>
                                <h4 className="text-sm font-bold text-white mb-3 pb-2 border-b border-white/10">{col.title}</h4>
                                <ul className="space-y-2">
                                    {col.links.map((link) => (
                                        <li key={link.label}>
                                            <Link href={link.href} className="text-xs text-gray-400 hover:text-[#00a6eb] transition-colors flex items-center gap-1.5">
                                                <span className="h-1 w-1 rounded-full bg-gray-600" />
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <FooterCopyrightBar />
        </div>
    );
};

export default ProductDetail;
