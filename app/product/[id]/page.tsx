'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
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
    Minus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockProducts } from '@/lib/api/mockData';
import { useCartStore } from '@/store/useCartStore';
import { useVendorStore } from '@/store/useVendorStore';
import VendorChatDialog from '@/components/chat/VendorChatDialog';

const ProductDetail = ({ params }: { params: { id: string } }) => {
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore((state) => state.addItem);
    const vendors = useVendorStore((state) => state.vendors);

    // In a real app, we'd fetch based on params.id
    const product = mockProducts.find(p => p.id === params.id) || mockProducts[0];
    const vendor = vendors.find(v => v.id === product.vendorId);
    const vendorName = vendor ? vendor.name : product.vendorName;

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-muted cursor-pointer ring-primary ring-offset-2 hover:ring-2 transition-all">
                                    <Image src={product.images[0]} alt={`Thumb ${i}`} fill className="object-cover opacity-60 hover:opacity-100" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <Badge variant="secondary" className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20">
                                {product.category}
                            </Badge>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="rounded-full border"><Share2 className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="icon" className="rounded-full border text-red-500"><Heart className="h-4 w-4" /></Button>
                            </div>
                        </div>

                        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-6 text-sm">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                                <span className="font-bold ml-1">{product.rating}</span>
                            </div>
                            <div className="w-px h-4 bg-muted" />
                            <span className="text-muted-foreground">{product.reviewsCount} Reviews</span>
                            <div className="w-px h-4 bg-muted" />
                            <span className="text-green-500 font-bold">In Stock</span>
                        </div>

                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-4xl font-bold text-primary">${product.price}</span>
                            {product.originalPrice && (
                                <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                            )}
                        </div>

                        <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                            {product.description}
                        </p>

                        <div className="space-y-6 pt-6 border-t">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center border rounded-full px-2 py-1 bg-muted/30">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full h-8 w-8"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full h-8 w-8"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Button className="flex-1 h-14 rounded-full text-lg font-bold shadow-xl shadow-primary/20 gap-3" onClick={() => addItem(product)}>
                                    <ShoppingCart className="h-5 w-5" />
                                    Add to Cart
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border">
                                <Truck className="text-primary h-6 w-6" />
                                <div>
                                    <p className="font-bold text-sm">Free Delivery</p>
                                    <p className="text-xs text-muted-foreground">Orders over $50</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border">
                                <RotateCcw className="text-primary h-6 w-6" />
                                <div>
                                    <p className="font-bold text-sm">30 Day Return</p>
                                    <p className="text-xs text-muted-foreground">No questions asked</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-6 rounded-2xl bg-slate-950 text-white relative overflow-hidden">
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Store Verified</p>
                                    <h4 className="text-lg font-bold">{vendorName}</h4>
                                    <p className="text-xs text-slate-500">{vendor?.totalSales.toLocaleString() || '1.2k'}+ Successful Sales</p>
                                </div>
                                <div className="flex gap-3">
                                    <VendorChatDialog vendorName={vendorName} />
                                    <Button variant="secondary" className="font-bold">Visit Store</Button>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 h-full w-32 bg-primary/20 blur-3xl" />
                        </div>
                    </div>
                </div>

                {/* Feature Tabs */}
                <section className="py-20 border-t">
                    <Tabs defaultValue="details" className="w-full">
                        <TabsList className="mb-8 p-1 bg-muted/50 rounded-xl h-auto">
                            <TabsTrigger value="details" className="rounded-lg px-8 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm">Product Details</TabsTrigger>
                            <TabsTrigger value="specs" className="rounded-lg px-8 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm">Specifications</TabsTrigger>
                            <TabsTrigger value="reviews" className="rounded-lg px-8 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm">Customer Reviews</TabsTrigger>
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
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetail;
