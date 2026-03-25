'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Smartphone, Tv, Headphones, Watch, Laptop, Camera, Gamepad2,
    Car, Shirt, Armchair, Sparkles, Dumbbell, Utensils, Gift
} from 'lucide-react';

const categories = [
    { name: 'Phones', href: '/products?category=phones', icon: Smartphone, color: '#00a6eb', bg: '#e8f6fd' },
    { name: 'TV & Video', href: '/products?category=tv', icon: Tv, color: '#7c3aed', bg: '#f3f0ff' },
    { name: 'Audio', href: '/products?category=headphones', icon: Headphones, color: '#e91e8c', bg: '#fde7f3' },
    { name: 'Wearables', href: '/products?category=wearable', icon: Watch, color: '#f59e0b', bg: '#fffbeb' },
    { name: 'Laptops', href: '/products?category=computers', icon: Laptop, color: '#10b981', bg: '#ecfdf5' },
    { name: 'Cameras', href: '/products?category=camera', icon: Camera, color: '#ef4444', bg: '#fef2f2' },
    { name: 'Gaming', href: '/products?category=gaming', icon: Gamepad2, color: '#6366f1', bg: '#eef2ff' },
    { name: 'Fashion', href: '/products?category=fashion', icon: Shirt, color: '#ec4899', bg: '#fdf2f8' },
    { name: 'Home', href: '/products?category=home', icon: Armchair, color: '#f97316', bg: '#fff7ed' },
    { name: 'Beauty', href: '/products?category=beauty', icon: Sparkles, color: '#a855f7', bg: '#faf5ff' },
    { name: 'Fitness', href: '/products?category=fitness', icon: Dumbbell, color: '#14b8a6', bg: '#f0fdfa' },
    { name: 'Kitchen', href: '/products?category=kitchen', icon: Utensils, color: '#84cc16', bg: '#f7fee7' },
    { name: 'Car', href: '/products?category=car', icon: Car, color: '#64748b', bg: '#f8fafc' },
    { name: 'Gift Cards', href: '/products', icon: Gift, color: '#f43f5e', bg: '#fff1f2' },
];

const CategoryList = () => {
    return (
        <section className="bg-white py-10 border-b border-gray-100">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="h-1 w-6 rounded-full ecome-gradient" />
                        <h2 className="text-lg font-bold text-gray-900">Browse Categories</h2>
                    </div>
                    <Link href="/products" className="text-[#00a6eb] text-sm font-semibold hover:underline">
                        View All
                    </Link>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-10 lg:grid-cols-14 gap-3">
                    {categories.map((cat, idx) => {
                        const Icon = cat.icon;
                        return (
                            <Link href={cat.href} key={cat.name}>
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.04, duration: 0.35 }}
                                    className="flex flex-col items-center gap-2 group cursor-pointer"
                                >
                                    <div
                                        className="h-14 w-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                                        style={{ backgroundColor: cat.bg }}
                                    >
                                        <Icon
                                            className="h-6 w-6 transition-transform duration-300"
                                            style={{ color: cat.color }}
                                            strokeWidth={1.8}
                                        />
                                    </div>
                                    <span className="text-[11px] font-medium text-gray-600 group-hover:text-[#00a6eb] transition-colors text-center leading-tight">
                                        {cat.name}
                                    </span>
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoryList;
