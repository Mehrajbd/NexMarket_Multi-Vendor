'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Megaphone, Search, BarChart2, Plus, Globe } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const mockCoupons = [
    { code: 'WELCOME20', discount: '20%', usage: '1,240 / 5,000', expiry: 'Dec 31, 2026', status: 'Active' },
    { code: 'BFCM50', discount: '50%', usage: '0 / 10,000', expiry: 'Nov 30, 2026', status: 'Scheduled' },
    { code: 'FLASH10', discount: '10%', usage: '500 / 500', expiry: 'Oct 01, 2026', status: 'Expired' },
];

const MarketingPage = () => {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">Marketing & SEO</h1>
                        <p className="text-slate-500 mt-1">Manage platform visibility, metadata, and promotional campaigns.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Global SEO Settings */}
                    <Card className="border-none shadow-sm dark:bg-slate-900/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5 text-sky-500" /> Global SEO Metadata</CardTitle>
                            <CardDescription>Configure default search engine appearance for the marketplace.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2 flex-1">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Site Title Format</label>
                                <Input defaultValue="%s | NexMarket Premium Marketplace" className="bg-white dark:bg-slate-800" />
                            </div>
                            <div className="space-y-2 flex-1">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Default Meta Description</label>
                                <Textarea 
                                    defaultValue="Discover premium products from verified vendors globally. NexMarket brings the best of fashion, electronics, and home decor to your doorstep." 
                                    className="bg-white dark:bg-slate-800 h-24 resize-none" 
                                />
                            </div>
                            <div className="pt-2 flex justify-between items-center">
                                <Button variant="outline" className="gap-2"><Search className="h-4 w-4" /> Generate Sitemap.xml</Button>
                                <Button className="bg-indigo-600 hover:bg-indigo-700 font-bold">Save SEO Profile</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Campaign Analytics */}
                    <Card className="border-none shadow-sm dark:bg-slate-900/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BarChart2 className="h-5 w-5 text-emerald-500" /> Campaign Metrics (MTD)</CardTitle>
                            <CardDescription>Performance of active promotional codes and referrals.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">Coupon Revenue</p>
                                    <p className="text-3xl font-mono font-bold text-slate-800 dark:text-slate-100">$42,500</p>
                                </div>
                                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                                    <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">New Users via Ref</p>
                                    <p className="text-3xl font-mono font-bold text-slate-800 dark:text-slate-100">842</p>
                                </div>
                            </div>
                            <div className="p-5 border rounded-xl bg-white dark:bg-slate-950">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-sm flex items-center gap-2"><Megaphone className="h-4 w-4 text-amber-500" /> Highest Performing Promo</h4>
                                    <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-none font-bold text-[10px]">SUMMERVIBES</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">+34% conversion rate lift during active period.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Promo Codes Table */}
                <Card className="border-none shadow-sm dark:bg-slate-900/50">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-lg">Promotional Codes</CardTitle>
                            <CardDescription>Manage discount coupons generated by the platform.</CardDescription>
                        </div>
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 gap-1.5 h-8 font-bold"><Plus className="h-4 w-4" /> Create Coupon</Button>
                    </CardHeader>
                    <CardContent className="p-0 border-t">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50/50 dark:bg-slate-800/20">
                                    <TableHead className="font-bold text-slate-700 dark:text-slate-300">Promo Code</TableHead>
                                    <TableHead className="font-bold text-slate-700 dark:text-slate-300">Discount</TableHead>
                                    <TableHead className="font-bold text-slate-700 dark:text-slate-300">Usage (Count / Limit)</TableHead>
                                    <TableHead className="font-bold text-slate-700 dark:text-slate-300">Valid Until</TableHead>
                                    <TableHead className="font-bold text-slate-700 dark:text-slate-300">Status</TableHead>
                                    <TableHead className="text-right font-bold text-slate-700 dark:text-slate-300">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockCoupons.map((coupon, i) => (
                                    <TableRow key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                        <TableCell>
                                            <Badge variant="outline" className="font-mono font-bold text-sm tracking-widest border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                                                {coupon.code}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-bold text-emerald-600 dark:text-emerald-400">{coupon.discount}</TableCell>
                                        <TableCell>
                                            <div className="w-32">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="font-bold text-slate-600 dark:text-slate-400">{coupon.usage}</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-indigo-500" style={{ width: `${(parseInt(coupon.usage.split(' / ')[0].replace(',','')) / parseInt(coupon.usage.split(' / ')[1].replace(',',''))) * 100}%` }} />
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-xs font-bold text-slate-500">{coupon.expiry}</TableCell>
                                        <TableCell>
                                            {coupon.status === 'Active' && <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-none">{coupon.status}</Badge>}
                                            {coupon.status === 'Scheduled' && <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-none">{coupon.status}</Badge>}
                                            {coupon.status === 'Expired' && <Badge variant="outline" className="text-slate-400 bg-slate-50 dark:bg-slate-900">{coupon.status}</Badge>}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" className="font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">Edit</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

            </main>
        </div>
    );
};

export default MarketingPage;
