'use client';

import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import ProductCard from '@/components/cards/ProductCard';
import { mockProducts } from '@/lib/api/mockData';
import { Timer, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DealsPage = () => {
    const deals = mockProducts.filter(p => p.discount && p.discount > 0);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 py-12">
                {/* Flash Sale Banner */}
                <div className="relative rounded-3xl bg-slate-950 text-white p-8 md:p-16 mb-16 overflow-hidden">
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500 text-xs font-bold uppercase tracking-wider">
                                <Zap className="h-3 w-3 fill-white" />
                                Limited Time Offer
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                                Mega Summer <br />
                                <span className="text-primary italic">Flash Sale</span>
                            </h1>
                            <p className="text-slate-400 text-lg max-w-md">
                                Get up to 70% off on premium electronics and fashion. Every second counts!
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold">08</span>
                                    <span className="text-xs uppercase text-slate-500 font-bold">Hours</span>
                                </div>
                                <span className="text-3xl font-bold text-slate-700">:</span>
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold">42</span>
                                    <span className="text-xs uppercase text-slate-500 font-bold">Mins</span>
                                </div>
                                <span className="text-3xl font-bold text-slate-700">:</span>
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold">19</span>
                                    <span className="text-xs uppercase text-slate-500 font-bold">Secs</span>
                                </div>
                            </div>
                            <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-full group">
                                Grab Deals Now
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                        <div className="relative h-64 md:h-96 hidden lg:block">
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                            {/* Decorative elements */}
                        </div>
                    </div>

                    {/* Background decorative Orbs */}
                    <div className="absolute top-0 right-0 h-96 w-96 bg-primary opacity-20 blur-[120px]" />
                    <div className="absolute bottom-0 left-0 h-64 w-64 bg-red-500 opacity-10 blur-[100px]" />
                </div>

                <div>
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <Timer className="text-primary h-8 w-8" />
                        Todays Hot Deals
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {deals.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                        {/* Duplicate for demo mapping if needed */}
                        {deals.map((product) => (
                            <ProductCard key={`${product.id}-2`} product={product} />
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default DealsPage;
