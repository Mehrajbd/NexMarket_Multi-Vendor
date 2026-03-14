'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag, Zap } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-slate-950">
            {/* Background Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[10%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[100px]" />

            <div className="container relative mx-auto px-6">
                <div className="glass-morphism rounded-[64px] border border-white/5 bg-slate-900/40 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left Content */}
                        <div className="p-12 md:p-24 flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
                                    The New <br />
                                    <span className="text-slate-500 italic">Standard</span> <br />
                                    <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">of Excellence.</span>
                                </h1>
                                <p className="text-slate-400 text-lg md:text-xl font-medium max-w-lg mb-12 leading-relaxed">
                                    Discover a curated selection of premium essentials from the world's most innovative brands and makers.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-5 mb-16">
                                    <Button size="lg" className="h-16 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest shadow-2xl shadow-indigo-600/20 active:scale-95 transition-all">
                                        Explore Collection
                                    </Button>
                                    <Button size="lg" className="h-16 px-10 rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 font-black text-xs uppercase tracking-widest active:scale-95 transition-all">
                                        Become a Seller
                                    </Button>
                                </div>

                                <div className="flex items-center gap-12 pt-12 border-t border-white/5">
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-black text-white tracking-tighter">12k+</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Premium Brands</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-black text-white tracking-tighter">4.9/5</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Average Rating</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Image */}
                        <div className="relative h-[600px] lg:h-auto bg-[#1a1c24] overflow-hidden">
                            <motion.div
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.5 }}
                                className="h-full w-full"
                            >
                                <Image
                                    src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1000"
                                    alt="Luxury Goods"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent hidden lg:block" />
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-900 to-transparent lg:hidden" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
