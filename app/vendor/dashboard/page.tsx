'use client';

import React from 'react';
import VendorSidebar from '@/components/vendor/VendorSidebar';
import {
    DollarSign,
    ShoppingBag,
    Users,
    TrendingUp,
    Search,
    Bell,
    MoreVertical
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const stats = [
    { title: 'Total Revenue', value: '$12,840.50', trend: '+12.5%', icon: DollarSign, color: 'text-green-500' },
    { title: 'Active Orders', value: '42', trend: '+5.2%', icon: ShoppingBag, color: 'text-blue-500' },
    { title: 'Customers', value: '1,240', trend: '+8.1%', icon: Users, color: 'text-purple-500' },
    { title: 'Avg. Order', value: '$305.20', trend: '-2.4%', icon: TrendingUp, color: 'text-orange-500' },
];

const VendorDashboard = () => {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <VendorSidebar />

            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-16 border-b bg-white dark:bg-slate-900 flex items-center justify-between px-8">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input placeholder="Search orders, products..." className="pl-10 bg-slate-50 dark:bg-slate-800 border-none" />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative text-slate-500">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
                        </Button>
                        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-bold">TechStore Premium</p>
                                <p className="text-[10px] text-green-500 font-bold uppercase">Pro Account</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
                        <p className="text-slate-500">Monitor your store performance and manage your inventory.</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <Card key={idx} className="border-none shadow-sm dark:bg-slate-900">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`p-3 rounded-xl bg-slate-100 dark:bg-slate-800 ${stat.color}`}>
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                                {stat.trend}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500 mb-1">{stat.title}</p>
                                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Sales Chart Mockup */}
                        <Card className="lg:col-span-2 border-none shadow-sm dark:bg-slate-900">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-lg">Sales Analytics</CardTitle>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="ghost">Week</Button>
                                    <Button size="sm" variant="secondary" className="bg-primary/10 text-primary">Month</Button>
                                </div>
                            </CardHeader>
                            <CardContent className="h-80 flex items-end justify-between gap-2 pt-10 px-8">
                                {/* Simple CSS Bar Chart */}
                                {[40, 60, 45, 90, 65, 80, 50, 70, 95, 60, 85, 90].map((h, i) => (
                                    <div key={i} className="flex-1 group relative">
                                        <div
                                            className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg transition-all group-hover:bg-primary/50"
                                            style={{ height: `${h}%` }}
                                        />
                                        {h > 80 && (
                                            <div
                                                className="absolute bottom-0 w-full bg-primary rounded-t-lg shadow-lg shadow-primary/20"
                                                style={{ height: `${h * 0.4}%` }}
                                            />
                                        )}
                                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400">
                                            {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                                        </span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Recent Orders */}
                        <Card className="border-none shadow-sm dark:bg-slate-900">
                            <CardHeader>
                                <CardTitle className="text-lg">Recent Orders</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="space-y-1">
                                    {[
                                        { id: '#9023', user: 'Sarah J.', amount: '$129.00', status: 'Shipped' },
                                        { id: '#9024', user: 'Michael K.', amount: '$45.50', status: 'Pending' },
                                        { id: '#9025', user: 'David L.', amount: '$1,200.00', status: 'Processing' },
                                        { id: '#9026', user: 'Emma W.', amount: '$89.00', status: 'Delivered' },
                                    ].map((order, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold">
                                                    {order.user[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold">{order.user}</p>
                                                    <p className="text-xs text-slate-500">{order.id}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold">{order.amount}</p>
                                                <p className={`text-[10px] font-bold ${order.status === 'Delivered' ? 'text-green-500' : 'text-blue-500'}`}>
                                                    {order.status}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="ghost" className="w-full text-primary hover:text-primary hover:bg-primary/5 border-t rounded-none">
                                    View All Orders
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VendorDashboard;
