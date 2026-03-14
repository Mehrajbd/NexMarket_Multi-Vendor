'use client';

import React from 'react';
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
    Megaphone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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

const AdminSidebar = () => {
    const pathname = usePathname();

    return (
        <div className="hidden md:flex h-screen w-64 flex-col border-r bg-slate-900 text-white flex-shrink-0">
            <div className="flex h-16 items-center px-6 border-b border-slate-800">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold">A</div>
                    <span className="text-xl font-bold tracking-tight">AdminPortal</span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4">
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
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                )}
                            >
                                <Icon className={cn('h-5 w-5', isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400')} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 mb-4 border border-slate-700/50">
                    <div className="h-10 w-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <ShieldCheck className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-bold truncate">System Admin</p>
                        <p className="text-[10px] text-indigo-400 uppercase font-extrabold tracking-wider">Super Control</p>
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

export default AdminSidebar;
