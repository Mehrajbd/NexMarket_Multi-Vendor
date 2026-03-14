'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Store,
    ShoppingBag,
    BarChart3,
    Settings,
    LogOut,
    ShieldCheck,
    AlertCircle,
    UserCheck,
    Percent,
    Wallet,
    Flag,
    LayoutTemplate,
    ShieldAlert,
    Truck,
    Megaphone,
    X,
    Menu,
    Zap,
    Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
    { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Vendors', href: '/admin/vendors', icon: Store },
    { name: 'KYC & Approvals', href: '/admin/kyc', icon: UserCheck },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Orders', href: '/admin/orders', icon: AlertCircle },
    { name: 'Commissions', href: '/admin/commissions', icon: Percent },
    { name: 'Payouts', href: '/admin/payouts', icon: Wallet },
    { name: 'Disputes', href: '/admin/disputes', icon: Flag },
    { name: 'CMS Control', href: '/admin/cms', icon: LayoutTemplate },
    { name: 'Marketing & SEO', href: '/admin/marketing', icon: Megaphone },
    { name: 'Tax & Shipping', href: '/admin/shipping-tax', icon: Truck },
    { name: 'Security & Fraud', href: '/admin/security', icon: ShieldAlert },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
    headerRight?: React.ReactNode;
}

const SidebarContent = ({ onClose }: { onClose?: () => void }) => {
    const pathname = usePathname();

    return (
        <div className="flex h-full flex-col bg-slate-900 text-white">
            {/* Logo */}
            <div className="flex h-16 items-center justify-between px-5 border-b border-slate-800 flex-shrink-0">
                <Link href="/" className="flex items-center space-x-2.5" onClick={onClose}>
                    <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                        <Zap className="h-4 w-4 text-white fill-white" />
                    </div>
                    <span className="text-lg font-black tracking-tighter text-white">AdminPortal</span>
                </Link>
                {onClose && (
                    <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden text-slate-400 hover:text-white h-8 w-8">
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Nav Links */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group',
                                isActive
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            )}
                        >
                            <Icon className={cn('h-4 w-4 flex-shrink-0', isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400')} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-slate-800 flex-shrink-0">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 mb-2 border border-slate-700/50">
                    <div className="h-9 w-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="h-4 w-4 text-indigo-400" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-bold truncate text-white">System Admin</p>
                        <p className="text-[10px] text-indigo-400 uppercase font-extrabold tracking-wider">Super Control</p>
                    </div>
                </div>
                <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 font-semibold text-sm rounded-xl">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
};

const AdminLayout = ({ children, title, headerRight }: AdminLayoutProps) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-60 flex-shrink-0 flex-col border-r border-slate-200 dark:border-slate-800">
                <SidebarContent />
            </aside>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                            onClick={() => setIsMobileOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                            className="md:hidden fixed inset-y-0 left-0 w-72 z-50 border-r border-slate-700 shadow-2xl"
                        >
                            <SidebarContent onClose={() => setIsMobileOpen(false)} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden min-w-0">
                {/* Sticky Top Header */}
                <header className="h-14 md:h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 sticky top-0 z-30 flex-shrink-0">
                    <div className="flex items-center gap-3 min-w-0">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-slate-500 hover:text-slate-900 dark:hover:text-white h-9 w-9 flex-shrink-0"
                            onClick={() => setIsMobileOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        {title && (
                            <h1 className="text-base md:text-xl font-bold tracking-tight truncate">{title}</h1>
                        )}
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                        {headerRight}
                        <Button variant="ghost" size="icon" className="relative text-slate-500 h-9 w-9">
                            <Bell className="h-4 w-4 md:h-5 md:w-5" />
                            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-500 border-2 border-white dark:border-slate-900" />
                        </Button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
