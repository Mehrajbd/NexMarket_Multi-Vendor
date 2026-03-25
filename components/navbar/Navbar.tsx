'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    Search, ShoppingCart, User, Menu, X, Heart, Zap, LogOut,
    Camera, Loader2, ChevronDown, MapPin, Package, Phone,
    Shield, Smartphone, Globe, ChevronRight, Tv, Headphones,
    Watch, Camera as CameraIcon, Laptop, Gamepad2, Printer
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import AuthDialog from '@/components/auth/AuthDialog';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const departments = [
    { name: 'New Arrivals', hot: false, new: false },
    { name: 'Top 100 Best Seller', hot: true, new: false },
    { name: 'TV & Video', icon: Tv, hot: false, new: false },
    { name: 'Home Audio & Theater', hot: false, new: false },
    { name: 'Camera, Photo & Video', icon: CameraIcon, hot: false, new: false },
    { name: 'Cell Phones & Accessories', icon: Smartphone, hot: false, new: false },
    { name: 'Headphones', icon: Headphones, hot: false, new: false },
    { name: 'Car Electronics', hot: false, new: false },
    { name: 'Electronics Showcase', hot: false, new: false },
    { name: 'Wearable Technology', icon: Watch, hot: false, new: true },
    { name: 'Computers & Laptops', icon: Laptop, hot: false, new: false },
    { name: 'Games & Accessories', icon: Gamepad2, hot: false, new: false },
    { name: 'Printers & Office', icon: Printer, hot: false, new: false },
];

const navTabs = [
    { name: 'Flash Deals', href: '/deals', badge: null },
    { name: 'Tech Discovery', href: '/products?category=electronics', badge: 'NEW' },
    { name: 'Trending Styles', href: '/products?category=fashion', badge: null },
    { name: 'Gift Cards', href: '/products', badge: 'SALE' },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isScanningImage, setIsScanningImage] = useState(false);
    const [isDeptOpen, setIsDeptOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All categories');
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const totalItems = useCartStore((state) => state.totalItems());
    const { isAuthenticated, user, logout } = useAuthStore();

    const categories = ['All categories', 'Electronics', 'Fashion', 'Home', 'Kitchen', 'Beauty', 'Fitness', 'Sports'];

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsScanningImage(true);
            setTimeout(() => {
                setIsScanningImage(false);
                router.push('/products?imageSearch=success');
            }, 2500);
        }
    };

    const isHidden = pathname?.startsWith('/admin') || (pathname?.startsWith('/vendor') && !pathname?.startsWith('/vendors'));
    if (isHidden) return null;

    return (
        <header className="fixed top-0 z-50 w-full bg-white shadow-sm">
            {/* Top Announcement Bar */}
            <div className="announce-bar text-white py-2 px-4">
                <div className="container mx-auto flex items-center justify-between text-xs">
                    <div className="flex items-center gap-6">
                        <Link href="#" className="flex items-center gap-1.5 hover:text-blue-300 transition-colors">
                            <MapPin className="h-3 w-3" />
                            <span>Dhaka, Bangladesh</span>
                        </Link>
                        <Link href="/orders" className="flex items-center gap-1.5 hover:text-blue-300 transition-colors">
                            <Package className="h-3 w-3" />
                            <span>Track Your Order</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="#" className="flex items-center gap-1.5 hover:text-blue-300 transition-colors">
                            <Shield className="h-3 w-3" />
                            <span>Buyer Protection</span>
                        </Link>
                        <Link href="#" className="hover:text-blue-300 transition-colors">Help</Link>
                        <Link href="#" className="flex items-center gap-1 hover:text-blue-300 transition-colors">
                            <Smartphone className="h-3 w-3" />
                            <span>Save big on our app!</span>
                        </Link>
                        <div className="flex items-center gap-1 cursor-pointer hover:text-blue-300 transition-colors">
                            <Globe className="h-3 w-3" />
                            <span>EN</span>
                            <ChevronDown className="h-3 w-3" />
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer hover:text-blue-300 transition-colors">
                            <span>BDT</span>
                            <ChevronDown className="h-3 w-3" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-white border-b border-gray-100 py-4">
                <div className="container mx-auto px-4 flex items-center gap-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 shrink-0">
                        <div className="h-10 w-10 rounded-xl flex items-center justify-center ecome-gradient shadow-lg">
                            <Zap className="text-white h-6 w-6 fill-white" />
                        </div>
                        <div>
                            <span className="text-xl font-black tracking-tight text-gray-900">NexMarket</span>
                            <p className="text-[10px] text-gray-400 leading-none">The online digital world</p>
                        </div>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl hidden md:block">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (searchQuery.trim()) {
                                    router.push(`/products?q=${encodeURIComponent(searchQuery)}`);
                                }
                            }}
                            className="flex items-center border-2 border-[#00a6eb] rounded-full overflow-hidden bg-white shadow-sm focus-within:shadow-md transition-shadow"
                        >
                            {/* Category Dropdown */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                    className="flex items-center gap-1 px-4 py-3 text-xs font-semibold text-gray-600 border-r border-gray-200 hover:bg-gray-50 whitespace-nowrap"
                                >
                                    {selectedCategory}
                                    <ChevronDown className="h-3 w-3" />
                                </button>
                                <AnimatePresence>
                                    {isCategoryOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 8 }}
                                            className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-2"
                                        >
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    onClick={() => { setSelectedCategory(cat); setIsCategoryOpen(false); }}
                                                    className="w-full px-4 py-2 text-xs text-left text-gray-700 hover:bg-[#f0f8ff] hover:text-[#00a6eb] transition-colors"
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <input
                                type="search"
                                placeholder="I'm shopping for..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent"
                            />

                            {/* Camera Search */}
                            <label className="cursor-pointer px-3 py-2 hover:bg-gray-50 transition-colors relative group">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                    disabled={isScanningImage}
                                />
                                {isScanningImage ? (
                                    <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />
                                ) : (
                                    <Camera className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                )}
                            </label>

                            <button type="submit" className="ecome-search-btn m-1 px-5">
                                <Search className="h-4 w-4" />
                            </button>
                        </form>

                        {/* Most Searched */}
                        <div className="flex items-center gap-2 mt-1.5 px-2">
                            <span className="text-[11px] text-gray-400 font-medium">Most searched:</span>
                            {['Smartphone', 'Headphones', 'Laptop', 'Gaming', 'Camera'].map((term) => (
                                <button
                                    key={term}
                                    onClick={() => router.push(`/products?q=${term}`)}
                                    className="text-[11px] text-gray-500 hover:text-[#00a6eb] transition-colors"
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-6 ml-auto md:ml-0 shrink-0">
                        {/* Phone */}
                        <div className="hidden lg:flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                                <Phone className="h-4 w-4 text-[#00a6eb]" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-medium">Call Us Free</p>
                                <p className="text-sm font-bold text-gray-800">+880 1700-000000</p>
                            </div>
                        </div>

                        {/* Vertical Divider */}
                        <div className="hidden lg:block h-8 w-px bg-gray-200" />

                        {/* User */}
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex flex-col items-center gap-1 outline-none group">
                                        <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-[#00a6eb]/30 group-hover:border-[#00a6eb] transition-colors">
                                            {user?.image ? (
                                                <Image src={user.image} alt={user.name} width={36} height={36} className="object-cover" />
                                            ) : (
                                                <div className="h-full w-full ecome-gradient flex items-center justify-center text-white text-xs font-bold">
                                                    {user?.name?.[0] || 'U'}
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-gray-500 hidden xl:block">Account</span>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 bg-white border-gray-200 rounded-2xl p-2 shadow-2xl">
                                    <div className="px-3 py-2 border-b border-gray-100 mb-2">
                                        <p className="text-xs font-bold text-[#00a6eb]">Account</p>
                                        <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
                                        <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
                                    </div>
                                    <DropdownMenuItem className="rounded-xl focus:bg-blue-50 focus:text-[#00a6eb] gap-2 cursor-pointer py-2">
                                        <User className="h-4 w-4" />
                                        <span className="text-xs font-semibold">Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="rounded-xl focus:bg-blue-50 gap-2 cursor-pointer py-2">
                                        <Package className="h-4 w-4" />
                                        <span className="text-xs font-semibold">My Orders</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="rounded-xl focus:bg-red-50 focus:text-red-500 gap-2 cursor-pointer py-2 mt-1 text-red-500"
                                        onClick={() => logout()}
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span className="text-xs font-semibold">Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <button
                                onClick={() => setIsAuthOpen(true)}
                                className="flex flex-col items-center gap-1 group"
                            >
                                <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                    <User className="h-4 w-4 text-gray-500 group-hover:text-[#00a6eb] transition-colors" />
                                </div>
                                <span className="text-[10px] text-gray-400 hidden xl:block group-hover:text-[#00a6eb] transition-colors">Sign In</span>
                            </button>
                        )}

                        {/* Wishlist */}
                        <Link href="/wishlist" className="flex flex-col items-center gap-1 group">
                            <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-pink-50 transition-colors">
                                <Heart className="h-4 w-4 text-gray-500 group-hover:text-pink-500 transition-colors" />
                            </div>
                            <span className="text-[10px] text-gray-400 hidden xl:block group-hover:text-pink-500 transition-colors">Wishlist</span>
                        </Link>

                        {/* Cart */}
                        <Link href="/cart" className="flex flex-col items-center gap-1 group relative">
                            <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors relative">
                                <ShoppingCart className="h-4 w-4 text-gray-500 group-hover:text-[#00a6eb] transition-colors" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full ecome-gradient text-[9px] font-bold text-white shadow-md">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] text-gray-400 hidden xl:block group-hover:text-[#00a6eb] transition-colors">Cart</span>
                        </Link>

                        {/* Mobile Menu */}
                        <button
                            className="md:hidden h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="bg-white border-b border-gray-100 hidden md:block">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    {/* All Departments Dropdown */}
                    <div className="relative">
                        <button
                            onMouseEnter={() => setIsDeptOpen(true)}
                            onMouseLeave={() => setIsDeptOpen(false)}
                            className="flex items-center gap-2 px-5 py-3.5 ecome-gradient text-white font-semibold text-sm rounded-t-none"
                        >
                            <Menu className="h-4 w-4" />
                            All Departments
                        </button>

                        <AnimatePresence>
                            {isDeptOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    onMouseEnter={() => setIsDeptOpen(true)}
                                    onMouseLeave={() => setIsDeptOpen(false)}
                                    className="absolute top-full left-0 w-64 bg-white border border-gray-200 shadow-2xl z-50 rounded-b-xl"
                                >
                                    {departments.map((dept, idx) => (
                                        <Link
                                            key={idx}
                                            href={`/products?category=${dept.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                                            className="category-sidebar-item group"
                                        >
                                            <span className="flex items-center gap-3">
                                                {dept.name}
                                                {dept.hot && (
                                                    <span className="ecome-tag bg-[#e53935] text-white">HOT</span>
                                                )}
                                                {dept.new && (
                                                    <span className="ecome-tag bg-[#00a6eb] text-white">NEW</span>
                                                )}
                                            </span>
                                            <ChevronRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-[#00a6eb] opacity-0 group-hover:opacity-100 transition-all" />
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Nav Tabs */}
                    <nav className="flex items-center gap-1">
                        {navTabs.map((tab) => (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className={`nav-tab flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium text-gray-700 hover:text-[#00a6eb] transition-colors relative ${pathname === tab.href ? 'text-[#00a6eb]' : ''}`}
                            >
                                {tab.name}
                                {tab.badge && (
                                    <span className={`ecome-tag ${tab.badge === 'NEW' ? 'bg-[#00a6eb] text-white' : 'bg-[#e91e8c] text-white'}`}>
                                        {tab.badge}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Free Shipping Note */}
                    <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
                        <Package className="h-4 w-4 text-[#00a6eb]" />
                        <span>Free Shipping on Orders ৳5000</span>
                    </div>
                </div>
            </div>

            <AuthDialog open={isAuthOpen} onOpenChange={setIsAuthOpen} />

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="p-4 space-y-4">
                            {/* Mobile Search */}
                            <div className="flex items-center border-2 border-[#00a6eb] rounded-full overflow-hidden">
                                <input
                                    type="search"
                                    placeholder="Search products..."
                                    className="flex-1 px-4 py-2.5 text-sm text-gray-700 outline-none"
                                />
                                <button className="ecome-search-btn m-1 px-4">
                                    <Search className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Mobile Nav Links */}
                            {navTabs.map((tab) => (
                                <Link
                                    key={tab.name}
                                    href={tab.href}
                                    className="flex items-center justify-between py-2.5 border-b border-gray-100 text-sm font-medium text-gray-700"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {tab.name}
                                    {tab.badge && (
                                        <span className={`ecome-tag ${tab.badge === 'NEW' ? 'bg-[#00a6eb] text-white' : 'bg-[#e91e8c] text-white'}`}>
                                            {tab.badge}
                                        </span>
                                    )}
                                </Link>
                            ))}

                            {/* Departments */}
                            <div>
                                <p className="text-xs font-bold uppercase text-gray-400 mb-3">Departments</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {departments.slice(0, 8).map((dept, idx) => (
                                        <Link
                                            key={idx}
                                            href={`/products?category=${dept.name.toLowerCase()}`}
                                            className="text-sm text-gray-600 hover:text-[#00a6eb] py-1"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {dept.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
