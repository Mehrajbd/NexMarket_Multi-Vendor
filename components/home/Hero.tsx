'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ArrowRight, Zap, Star, Gift, Cpu, Shirt } from 'lucide-react';
import Image from 'next/image';

const banners = [
    {
        id: 1,
        tag: 'Power to the pro',
        title: 'The Vision Is\nBrighter Than Ever.',
        cta: 'Shop now',
        href: '/products',
        bg: 'from-[#00c6a7] to-[#0072ff]',
        image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&q=80&w=800',
        textColor: 'text-white',
    },
    {
        id: 2,
        tag: 'New Collection 2024',
        title: 'Next-Gen\nSmartphones\nArrived.',
        cta: 'Explore now',
        href: '/products?category=electronics',
        bg: 'from-[#1a1a2e] to-[#16213e]',
        image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&q=80&w=800',
        textColor: 'text-white',
    },
    {
        id: 3,
        tag: 'Summer Sale Up to 60%',
        title: 'Fashion\nForward\nStyle.',
        cta: 'Shop now',
        href: '/products?category=fashion',
        bg: 'from-[#f8b500] to-[#e91e8c]',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
        textColor: 'text-white',
    },
];

const departments = [
    { name: 'New Arrivals', href: '/products?sort=new', badge: null },
    { name: 'Top 100 Best Seller', href: '/products?sort=popular', badge: 'HOT' },
    { name: 'TV & Video', href: '/products?category=tv', badge: null },
    { name: 'Home Audio & Theater', href: '/products?category=audio', badge: null },
    { name: 'Camera, Photo & Video', href: '/products?category=camera', badge: null },
    { name: 'Cell Phones & Accessories', href: '/products?category=phones', badge: null },
    { name: 'Headphones', href: '/products?category=headphones', badge: null },
    { name: 'Car Electronics', href: '/products?category=car', badge: null },
    { name: 'Electronics Showcase', href: '/products?category=electronics', badge: null },
    { name: 'Wearable Technology', href: '/products?category=wearable', badge: 'NEW' },
    { name: 'Computers & Laptops', href: '/products?category=computers', badge: null },
    { name: 'Games & Accessories', href: '/products?category=gaming', badge: null },
    { name: 'Printers & Office', href: '/products?category=office', badge: null },
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index: number) => {
        setDirection(index > currentSlide ? 1 : -1);
        setCurrentSlide(index);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const nextSlide = () => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % banners.length);
    };

    const banner = banners[currentSlide];

    return (
        <section className="bg-[#f5f5f5] pt-[148px] pb-0">
            <div className="container mx-auto px-4">
                <div className="flex gap-4">
                    {/* Department Sidebar */}
                    <div className="hidden lg:block w-64 shrink-0">
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm h-full">
                            {departments.map((dept, idx) => (
                                <Link
                                    key={idx}
                                    href={dept.href}
                                    className="category-sidebar-item group"
                                >
                                    <span className="flex items-center gap-2 text-[13px]">
                                        <span>{dept.name}</span>
                                        {dept.badge && (
                                            <span className={`ecome-tag text-[9px] ${dept.badge === 'HOT' ? 'bg-[#e53935] text-white' : 'bg-[#00a6eb] text-white'}`}>
                                                {dept.badge}
                                            </span>
                                        )}
                                    </span>
                                    <ChevronRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-[#00a6eb] transition-colors shrink-0" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Hero Banner Slider */}
                    <div className="flex-1 rounded-xl overflow-hidden relative h-[420px] shadow-sm">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentSlide}
                                custom={direction}
                                initial={{ opacity: 0, x: direction * 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction * -60 }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                className={`absolute inset-0 bg-gradient-to-br ${banner.bg} flex`}
                            >
                                {/* Text Content */}
                                <div className="flex flex-col justify-center p-10 md:p-16 z-10 max-w-xs md:max-w-sm">
                                    <span className="text-white/80 text-sm font-medium mb-3">{banner.tag}</span>
                                    <h1 className="text-3xl md:text-5xl font-black leading-tight text-white mb-6 whitespace-pre-line">
                                        {banner.title}
                                    </h1>
                                    <Link
                                        href={banner.href}
                                        className="inline-flex items-center gap-2 bg-[#e91e8c] text-white font-bold text-sm px-7 py-3.5 rounded-full w-fit hover:bg-[#c2185b] transition-all shadow-lg hover:shadow-pink-500/30 active:scale-95"
                                    >
                                        {banner.cta}
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>

                                {/* Image */}
                                <div className="absolute right-0 top-0 bottom-0 w-1/2 md:w-3/5">
                                    <Image
                                        src={banner.image}
                                        alt={banner.title}
                                        fill
                                        className="object-cover object-center"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-current via-transparent to-transparent opacity-60" />
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all hover:scale-110"
                        >
                            <ChevronLeft className="h-5 w-5 text-gray-700" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all hover:scale-110"
                        >
                            <ChevronRight className="h-5 w-5 text-gray-700" />
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                            {banners.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goToSlide(idx)}
                                    className={`h-2 rounded-full transition-all ${idx === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Promo Column */}
                    <div className="hidden xl:flex flex-col gap-4 w-52 shrink-0">
                        {/* Promo Card 1 */}
                        <Link href="/deals" className="block rounded-xl overflow-hidden relative h-[200px] group shadow-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col justify-between p-5">
                                <div>
                                    <p className="text-blue-400 text-xs font-semibold mb-1">Mini Quick Charge</p>
                                    <p className="text-white font-black text-lg leading-tight">Next-Gen<br />Chargers</p>
                                    <p className="text-sm text-gray-400 mt-1">Sale up to <span className="text-[#e91e8c] font-bold text-base">40%</span></p>
                                </div>
                                <span className="text-[#00a6eb] text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Shop now <ArrowRight className="h-3 w-3" />
                                </span>
                            </div>
                            <Image
                                src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=400"
                                alt="Charger"
                                fill
                                className="object-cover opacity-30 group-hover:opacity-40 transition-opacity"
                            />
                        </Link>

                        {/* Promo Card 2 */}
                        <Link href="/products?category=headphones" className="block rounded-xl overflow-hidden relative h-[204px] group shadow-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-900 to-purple-900 flex flex-col justify-between p-5">
                                <div>
                                    <p className="text-pink-400 text-xs font-semibold mb-1">Premium Audio</p>
                                    <p className="text-white font-black text-lg leading-tight">Wireless<br />Headphones</p>
                                    <p className="text-sm text-gray-400 mt-1">From <span className="text-yellow-400 font-bold text-base">$29.99</span></p>
                                </div>
                                <span className="text-pink-400 text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Shop now <ArrowRight className="h-3 w-3" />
                                </span>
                            </div>
                            <Image
                                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400"
                                alt="Headphones"
                                fill
                                className="object-cover opacity-30 group-hover:opacity-40 transition-opacity"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
