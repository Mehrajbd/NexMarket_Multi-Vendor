'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    BarChart3,
    Settings,
    LogOut,
    User,
    PlusCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const menuItems = [
    { name: 'Dashboard', href: '/vendor/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/vendor/products', icon: Package },
    { name: 'Orders', href: '/vendor/orders', icon: ShoppingCart },
    { name: 'Analytics', href: '/vendor/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/vendor/settings', icon: Settings },
];

const VendorSidebar = () => {
    const pathname = usePathname();

    return (
        <div className="hidden md:flex h-screen w-64 flex-col border-r bg-slate-950 text-white flex-shrink-0">
            <div className="flex h-16 items-center px-6 border-b border-slate-900">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">N</div>
                    <span className="text-xl font-bold tracking-tight">VendorHub</span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4">
                <div className="mb-6">
                    <Button className="w-full justify-start gap-2 bg-primary hover:bg-primary/90" size="lg">
                        <PlusCircle className="h-5 w-5" />
                        Add New Product
                    </Button>
                </div>

                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group',
                                    isActive
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                                )}
                            >
                                <Icon className={cn('h-5 w-5', isActive ? 'text-white' : 'text-slate-500 group-hover:text-primary')} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-slate-900">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 mb-4">
                    <div className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                        {/* Avatar Placeholder */}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-bold truncate">Alex Rivera</p>
                        <p className="text-xs text-slate-500 truncate">Store Manager</p>
                    </div>
                </div>
                <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10">
                    <LogOut className="h-5 w-5" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
};

export default VendorSidebar;
