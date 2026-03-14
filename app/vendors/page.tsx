'use client';

import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useVendorStore } from '@/store/useVendorStore';

const VendorsPage = () => {
    const { vendors } = useVendorStore();
    return (
        <div className="min-h-screen bg-slate-950 pt-32 pb-20 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-indigo-600/5 blur-[120px] rounded-full" />

            <main className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-px w-12 bg-indigo-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Elite Network</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 italic">
                        Verified <span className="text-indigo-500">Partners</span>
                    </h1>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed">
                        Curated collective of global makers, artisans, and innovators. Every partner is strictly vetted for quality, ethics, and technical excellence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {vendors.map((vendor) => (
                        <div key={vendor.id} className="group relative flex flex-col rounded-[48px] bg-slate-900/50 border border-white/5 overflow-hidden transition-all duration-500 hover:border-indigo-500/30 hover:bg-slate-900/80 hover:shadow-3xl hover:shadow-indigo-500/5">
                            {/* Card Header Background */}
                            <div className="h-40 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent group-hover:scale-150 transition-transform duration-1000" />
                            </div>

                            <div className="px-10 pb-12 relative">
                                {/* Logo Avatar */}
                                <div className="absolute -top-16 left-1/2 -translate-x-1/2 h-32 w-32 rounded-[32px] p-2 bg-slate-900 border border-white/5 shadow-2xl group-hover:-translate-y-2 transition-transform duration-500">
                                    <div className="h-full w-full rounded-[24px] overflow-hidden bg-white">
                                        <Image
                                            src={vendor.logo}
                                            alt={vendor.name}
                                            width={128}
                                            height={128}
                                            className="object-cover h-full w-full"
                                        />
                                    </div>
                                </div>

                                <div className="mt-20 text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <h2 className="text-2xl font-black text-white tracking-tight">{vendor.name}</h2>
                                        {vendor.isVerified && (
                                            <ShieldCheck className="h-5 w-5 text-indigo-500 fill-indigo-500/20" />
                                        )}
                                    </div>
                                    <div className="flex items-center justify-center gap-2 mb-6">
                                        <div className="h-1 w-1 rounded-full bg-slate-700" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Global Hub</span>
                                        <div className="h-1 w-1 rounded-full bg-slate-700" />
                                    </div>

                                    {/* Stats Display */}
                                    <div className="grid grid-cols-2 gap-4 mb-8 p-4 rounded-3xl bg-white/5 border border-white/5">
                                        <div className="flex flex-col">
                                            <div className="flex items-center justify-center gap-1.5 mb-1">
                                                <Star className="h-3 w-3 fill-indigo-500 text-indigo-500" />
                                                <span className="text-sm font-black text-white">{vendor.rating}</span>
                                            </div>
                                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Industry Rating</span>
                                        </div>
                                        <div className="flex flex-col border-l border-white/10 text-center">
                                            <span className="text-sm font-black text-white mb-1">{vendor.totalSales}+</span>
                                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Global Sales</span>
                                        </div>
                                    </div>

                                    <p className="text-slate-500 text-sm font-medium mb-10 line-clamp-2 px-2 leading-relaxed italic">
                                        "{vendor.description}"
                                    </p>

                                    <div className="flex gap-4">
                                        <Button className="flex-1 h-16 rounded-[24px] bg-white text-slate-900 hover:bg-indigo-50 font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95 group/btn">
                                            Enter Store <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                        <Button className="h-16 w-16 rounded-[24px] border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all active:scale-95">
                                            <ExternalLink className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default VendorsPage;
