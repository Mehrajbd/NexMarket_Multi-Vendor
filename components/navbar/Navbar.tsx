'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingBag, User, Menu, X, Heart, Zap, LogOut, Camera, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import AuthDialog from '@/components/auth/AuthDialog';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isScanningImage, setIsScanningImage] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const totalItems = useCartStore((state) => state.totalItems());
    const { isAuthenticated, user, logout } = useAuthStore();

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsScanningImage(true);
            // Simulate AI Image Search scanning delay
            setTimeout(() => {
                setIsScanningImage(false);
                router.push('/products?imageSearch=success');
            }, 2500);
        }
    };

    const navLinks = [
        { name: 'Explore', href: '/products' },
        { name: 'Brands', href: '/vendors' },
        { name: 'Gallery', href: '/gallery' },
    ];

    const isHidden = pathname?.startsWith('/admin') || pathname?.startsWith('/vendor');

    if (isHidden) return null;

    return (
        <nav className="fixed top-0 z-50 w-full bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex h-20 items-center justify-between gap-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
                            <Zap className="text-white h-6 w-6 fill-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-white">
                            NexMarket
                        </span>
                    </Link>

                    {/* Search Bar - Centered */}
                    <div className="hidden lg:flex flex-1 max-w-xl relative">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (searchQuery.trim()) {
                                    router.push(`/products?q=${encodeURIComponent(searchQuery)}`);
                                }
                            }}
                            className="w-full relative flex items-center"
                        >
                            <Search className="absolute left-4 h-4 w-4 text-slate-500" />
                            <Input
                                type="search"
                                placeholder="Search curated products and premium vendors..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 pl-12 pr-28 bg-white/5 border-white/10 rounded-full text-white placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-white/20 transition-all"
                            />
                            
                            <div className="absolute right-2 flex items-center gap-2">
                                {/* Image Search Feature */}
                                <label className="cursor-pointer p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center relative group">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="hidden" 
                                        onChange={handleImageUpload}
                                        disabled={isScanningImage}
                                    />
                                    {isScanningImage ? (
                                        <Loader2 className="h-4 w-4 text-indigo-400 animate-spin" />
                                    ) : (
                                        <Camera className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
                                    )}
                                    {/* Tooltip */}
                                    <span className="absolute -bottom-8 right-0 w-max bg-black text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        Scan Product Image
                                    </span>
                                </label>

                                <div className="px-1.5 py-0.5 rounded border border-white/10 text-[10px] text-slate-500 font-bold uppercase tracking-widest hidden xl:block">
                                    Ctrl K
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Navigation Links & Actions */}
                    <div className="flex items-center gap-8">
                        <div className="hidden xl:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-xs font-black uppercase tracking-widest transition-all hover:text-white ${pathname === link.href ? 'text-white' : 'text-slate-400'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <Link href="/cart">
                                <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white hover:bg-white/5 rounded-xl">
                                    <ShoppingBag className="h-5 w-5" />
                                    {totalItems > 0 && (
                                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-black text-white shadow-lg shadow-indigo-600/20">
                                            {totalItems}
                                        </span>
                                    )}
                                </Button>
                            </Link>

                            {isAuthenticated ? (
                                <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="h-10 w-10 rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all shadow-xl outline-none group">
                                                {user?.image ? (
                                                    <Image src={user.image} alt={user.name} width={40} height={40} className="object-cover" />
                                                ) : (
                                                    <div className="h-full w-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-black group-hover:scale-110 transition-transform">
                                                        {user?.name?.[0] || 'U'}
                                                    </div>
                                                )}
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56 bg-slate-900 border-white/10 text-slate-200 rounded-2xl p-2 shadow-2xl">
                                            <div className="px-3 py-2 border-b border-white/5 mb-2">
                                                <p className="text-xs font-black uppercase tracking-widest text-indigo-400">Account</p>
                                                <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                                                <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
                                            </div>
                                            <DropdownMenuItem className="rounded-xl focus:bg-white/5 focus:text-white gap-3 cursor-pointer py-2.5">
                                                <User className="h-4 w-4 text-indigo-400" />
                                                <span className="text-xs font-bold uppercase tracking-widest">Profile Details</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="rounded-xl focus:bg-white/5 focus:text-white gap-3 cursor-pointer py-2.5">
                                                <ShoppingBag className="h-4 w-4 text-indigo-400" />
                                                <span className="text-xs font-bold uppercase tracking-widest">My Orders</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="rounded-xl focus:bg-red-500/10 focus:text-red-500 gap-3 cursor-pointer py-2.5 mt-2 text-red-400"
                                                onClick={() => logout()}
                                            >
                                                <LogOut className="h-4 w-4" />
                                                <span className="text-xs font-bold uppercase tracking-widest">Logout</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            ) : (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-slate-400 hover:text-white hover:bg-white/5 rounded-xl"
                                    onClick={() => setIsAuthOpen(true)}
                                >
                                    <User className="h-5 w-5" />
                                </Button>
                            )}

                            <Button
                                variant="ghost"
                                size="icon"
                                className="xl:hidden text-slate-400"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <AuthDialog open={isAuthOpen} onOpenChange={setIsAuthOpen} />

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="xl:hidden border-t border-white/5 bg-slate-950 p-6 space-y-6"
                    >
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="w-full h-12 pl-12 bg-white/5 border-white/10 rounded-xl text-white"
                            />
                        </div>
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-black uppercase tracking-widest text-slate-400"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
