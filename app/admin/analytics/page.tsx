'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Globe, TrendingUp, ShoppingCart, ArrowUpRight, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AdminAnalyticsPage = () => {
    const [period, setPeriod] = useState<'today' | '30d' | '90d'>('30d');

    const topVendors = [
        { name: 'TechStore', sales: '$240k', growth: '+12%' },
        { name: 'Urban Threads', sales: '$180k', growth: '+8%' },
        { name: 'Pixel Gadgets', sales: '$95k', growth: '+15%' },
        { name: 'NexroLab', sales: '$42k', growth: '+22%' },
    ];

    return (
        <AdminLayout title="Platform Analytics" headerRight={
            <div className="flex gap-1.5">
                {(['today', '30d', '90d'] as const).map(p => (
                    <Button key={p} size="sm" variant={period === p ? 'default' : 'outline'}
                        onClick={() => setPeriod(p)}
                        className={`rounded-full h-7 px-3 text-xs font-bold ${period === p ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}>
                        {p === 'today' ? 'Today' : p === '30d' ? '30 Days' : '90 Days'}
                    </Button>
                ))}
            </div>
        }>
            <div className="p-4 md:p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: 'Global Traffic', value: '842,500', badge: '+24%', icon: Globe, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
                        { label: 'Conversion Rate', value: '3.4%', badge: '+18%', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
                        { label: 'Avg. Order Value', value: '$142.50', badge: '-2%', icon: ShoppingCart, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
                    ].map((c, i) => (
                        <Card key={i} className="border-none shadow-sm dark:bg-slate-900/60">
                            <CardContent className="p-5">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-2.5 rounded-xl ${c.bg} ${c.color}`}><c.icon className="h-5 w-5" /></div>
                                    <Badge className={`border-none font-bold text-[10px] ${c.badge.includes('+') ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>{c.badge}</Badge>
                                </div>
                                <p className="text-xs text-slate-500 uppercase font-extrabold tracking-widest mb-1">{c.label}</p>
                                <h3 className="text-2xl md:text-3xl font-bold">{c.value}</h3>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Growth Chart */}
                    <Card className="border-none shadow-sm dark:bg-slate-900/60 overflow-hidden">
                        <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-800/20 dark:border-slate-800 pb-3">
                            <CardTitle className="text-base flex items-center gap-2"><BarChart3 className="h-4 w-4 text-indigo-500" />Growth Trajectory</CardTitle>
                        </CardHeader>
                        <CardContent className="h-52 md:h-64 pt-6 px-4 md:px-6 flex items-end gap-1.5">
                            {[30, 45, 35, 60, 50, 85, 40, 55, 90, 65, 75, 95].map((h, i) => (
                                <div key={i} className="flex-1 bg-indigo-500/10 rounded-t-md relative group cursor-pointer">
                                    <div
                                        className="absolute bottom-0 w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-md transition-all duration-300 group-hover:from-purple-600 group-hover:to-indigo-400"
                                        style={{ height: `${h}%` }}
                                    />
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-slate-800 text-white text-[9px] py-1 px-1.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
                                        {h}%
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Top Vendors */}
                    <Card className="border-none shadow-sm dark:bg-slate-900/60">
                        <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-800/20 dark:border-slate-800 pb-3">
                            <CardTitle className="text-base">Top Performing Vendors</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y dark:divide-slate-800">
                                {topVendors.map((v, i) => (
                                    <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 text-sm">{i + 1}</div>
                                            <span className="font-bold text-sm">{v.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-bold">{v.sales}</div>
                                            <div className="text-[10px] font-bold text-emerald-500 flex items-center justify-end gap-0.5">
                                                <ArrowUpRight className="h-3 w-3" />{v.growth}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminAnalyticsPage;
