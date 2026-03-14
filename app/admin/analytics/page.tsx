'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BarChart3, TrendingUp, Users, ShoppingCart, Globe, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AdminAnalyticsPage = () => {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />

            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 border-b bg-white dark:bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
                    <h1 className="text-xl font-bold">Platform Analytics</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-full px-4 font-bold">Today</Button>
                        <Button variant="secondary" size="sm" className="rounded-full px-4 font-bold bg-indigo-500/10 text-indigo-500">Last 30 Days</Button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="border-none shadow-sm dark:bg-slate-900">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600">
                                        <Globe className="h-6 w-6" />
                                    </div>
                                    <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-[10px]">+24%</Badge>
                                </div>
                                <p className="text-xs text-slate-500 uppercase font-extrabold tracking-widest mb-1">Global Traffic</p>
                                <h3 className="text-3xl font-bold">842,500</h3>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-sm dark:bg-slate-900">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
                                        <TrendingUp className="h-6 w-6" />
                                    </div>
                                    <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-[10px]">+18%</Badge>
                                </div>
                                <p className="text-xs text-slate-500 uppercase font-extrabold tracking-widest mb-1">Conversion Rate</p>
                                <h3 className="text-3xl font-bold">3.4%</h3>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-sm dark:bg-slate-900">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
                                        <ShoppingCart className="h-6 w-6" />
                                    </div>
                                    <Badge className="bg-rose-50 text-rose-600 border-none font-bold text-[10px]">-2%</Badge>
                                </div>
                                <p className="text-xs text-slate-500 uppercase font-extrabold tracking-widest mb-1">Avg. Order Value</p>
                                <h3 className="text-3xl font-bold">$142.50</h3>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="border-none shadow-sm dark:bg-slate-900 overflow-hidden">
                            <CardHeader className="border-b bg-slate-50/50">
                                <CardTitle className="text-lg">Growth Trajectory</CardTitle>
                            </CardHeader>
                            <CardContent className="h-80 pt-10 px-8 flex items-end gap-1.5">
                                {[30, 45, 35, 60, 50, 85, 40, 55, 90, 65, 75, 95].map((h, i) => (
                                    <div key={i} className="flex-1 bg-indigo-500/20 rounded-t-lg relative group">
                                        <div className="absolute bottom-0 w-full bg-indigo-500 rounded-t-lg transition-all group-hover:h-full" style={{ height: `${h}%` }} />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm dark:bg-slate-900">
                            <CardHeader className="border-b bg-slate-50/50">
                                <CardTitle className="text-lg">Top Performing Vendors</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {[
                                        { name: 'TechStore', sales: '$240k', growth: '+12%' },
                                        { name: 'Urban Threads', sales: '$180k', growth: '+8%' },
                                        { name: 'Pixel Gadgets', sales: '$95k', growth: '+15%' },
                                        { name: 'NexroLab', sales: '$42k', growth: '+22%' },
                                    ].map((v, i) => (
                                        <div key={i} className="p-5 flex justify-between items-center hover:bg-slate-50/50 transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600">{i + 1}</div>
                                                <span className="font-bold text-sm tracking-tight">{v.name}</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-bold">{v.sales}</div>
                                                <div className="text-[10px] font-bold text-emerald-500 flex items-center justify-end gap-1">
                                                    <ArrowUpRight className="h-3 w-3" />
                                                    {v.growth}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminAnalyticsPage;
