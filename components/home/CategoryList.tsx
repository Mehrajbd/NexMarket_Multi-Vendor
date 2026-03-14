'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Smartphone, Shirt, Armchair, Utensils, Sparkles, Dumbbell, MoveDiagonal, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
    { name: 'Electronics', desc: 'Latest gadgets', icon: <Smartphone />, color: 'from-blue-500/20 to-cyan-500/5', iconColor: 'text-blue-400' },
    { name: 'Fashion', desc: 'Trendy wear', icon: <Shirt />, color: 'from-pink-500/20 to-rose-500/5', iconColor: 'text-pink-400' },
    { name: 'Home', desc: 'Interior design', icon: <Armchair />, color: 'from-amber-500/20 to-orange-500/5', iconColor: 'text-amber-400' },
    { name: 'Kitchen', desc: 'Culinary tools', icon: <Utensils />, color: 'from-emerald-500/20 to-teal-500/5', iconColor: 'text-emerald-400' },
    { name: 'Beauty', desc: 'Personal care', icon: <Sparkles />, color: 'from-purple-500/20 to-fuchsia-500/5', iconColor: 'text-purple-400' },
    { name: 'Fitness', desc: 'Workout gear', icon: <Dumbbell />, color: 'from-red-500/20 to-orange-500/5', iconColor: 'text-red-400' },
    { name: 'Sports', desc: 'Active lifestyle', icon: <MoveDiagonal />, color: 'from-indigo-500/20 to-blue-500/5', iconColor: 'text-indigo-400' },
];

const CategoryList = () => {
    return (
        <section className="py-32 bg-background relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4"
                        >
                            Explore Collections
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground text-lg"
                        >
                            Thoughtfully curated directories designed to elevate your premium shopping experience.
                        </motion.p>
                    </div>
                    <Link href="/products" className="group flex items-center gap-3">
                        <span className="text-primary font-black text-sm uppercase tracking-widest group-hover:text-primary/80 transition-colors">
                            View Directory
                        </span>
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <ArrowRight className="h-5 w-5 text-primary group-hover:text-white" />
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
                    {categories.map((cat, idx) => (
                        <Link href={`/products?category=${cat.name.toLowerCase()}`} key={cat.name}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: idx * 0.05, duration: 0.4, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="group relative h-full flex flex-col justify-between p-6 rounded-3xl bg-secondary/30 border border-border/50 hover:border-primary/50 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
                            >
                                {/* Gradient Hover Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                
                                <div className="relative z-10 flex flex-col items-start gap-4 h-full">
                                    <div className={`p-4 rounded-2xl bg-background border border-border/50 shadow-sm ${cat.iconColor} group-hover:scale-110 transition-transform duration-500`}>
                                        {React.cloneElement(cat.icon as React.ReactElement, { size: 28, strokeWidth: 1.5 })}
                                    </div>
                                    <div className="mt-auto pt-6">
                                        <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                            {cat.name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                                            {cat.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryList;
