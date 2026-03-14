'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Megaphone, Search, BarChart2, Plus, Globe, Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface Coupon { code: string; discount: string; usage: string; expiry: string; status: 'Active' | 'Scheduled' | 'Expired'; }

const MarketingPage = () => {
    const [coupons, setCoupons] = useState<Coupon[]>([
        { code: 'WELCOME20', discount: '20%', usage: '1,240 / 5,000', expiry: 'Dec 31, 2026', status: 'Active' },
        { code: 'BFCM50', discount: '50%', usage: '0 / 10,000', expiry: 'Nov 30, 2026', status: 'Scheduled' },
        { code: 'FLASH10', discount: '10%', usage: '500 / 500', expiry: 'Oct 01, 2026', status: 'Expired' },
    ]);
    const [seoSaved, setSeoSaved] = useState(false);

    const deleteCoupon = (code: string) => setCoupons(prev => prev.filter(c => c.code !== code));

    const statusBadge = (s: string) => {
        if (s === 'Active') return <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-none text-[10px]">Active</Badge>;
        if (s === 'Scheduled') return <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-none text-[10px]">Scheduled</Badge>;
        return <Badge variant="outline" className="text-slate-400 bg-slate-50 dark:bg-slate-900 text-[10px]">Expired</Badge>;
    };

    return (
        <AdminLayout title="Marketing & SEO">
            <div className="p-4 md:p-6 space-y-5">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">Marketing & SEO</h2>
                    <p className="text-slate-500 mt-1 text-sm">Manage platform visibility, metadata, and promotional campaigns.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* SEO */}
                    <Card className="border-none shadow-sm dark:bg-slate-900/60">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base"><Globe className="h-5 w-5 text-sky-500" />Global SEO</CardTitle>
                            <CardDescription>Configure default search engine appearance.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Site Title Format</label>
                                <Input defaultValue="%s | NexMarket Premium Marketplace" className="bg-white dark:bg-slate-800" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Meta Description</label>
                                <Textarea defaultValue="Discover premium products from verified vendors globally." className="bg-white dark:bg-slate-800 h-20 resize-none" />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 pt-1">
                                <Button variant="outline" className="gap-2 flex-1"><Search className="h-4 w-4" />Generate Sitemap</Button>
                                <Button onClick={() => { setSeoSaved(true); setTimeout(() => setSeoSaved(false), 2000); }} className={`flex-1 font-bold transition-colors ${seoSaved ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                                    {seoSaved ? 'Saved!' : 'Save SEO Profile'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Campaign Metrics */}
                    <Card className="border-none shadow-sm dark:bg-slate-900/60">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base"><BarChart2 className="h-5 w-5 text-emerald-500" />Campaign Metrics (MTD)</CardTitle>
                            <CardDescription>Performance of active promotional codes and referrals.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Coupon Revenue</p>
                                    <p className="text-2xl font-mono font-bold">$42,500</p>
                                </div>
                                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">New via Ref</p>
                                    <p className="text-2xl font-mono font-bold">842</p>
                                </div>
                            </div>
                            <div className="p-4 border rounded-xl bg-white dark:bg-slate-950">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-bold text-sm flex items-center gap-2"><Megaphone className="h-4 w-4 text-amber-500" />Top Performing Promo</h4>
                                    <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-none font-bold text-[10px]">SUMMERVIBE</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">+34% conversion rate lift during active period.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Promotional Codes */}
                <Card className="border-none shadow-sm dark:bg-slate-900/60 overflow-hidden">
                    <CardHeader className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between border-b dark:border-slate-800">
                        <div>
                            <CardTitle className="text-base">Promotional Codes</CardTitle>
                            <CardDescription>Manage discount coupons for the platform.</CardDescription>
                        </div>
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 gap-1.5 h-8 font-bold self-start sm:self-auto"><Plus className="h-4 w-4" />Create Coupon</Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        {/* Mobile */}
                        <div className="md:hidden divide-y dark:divide-slate-800">
                            {coupons.map((c, i) => {
                                const [used, limit] = c.usage.split(' / ').map(s => parseInt(s.replace(/,/g, '')) || 0);
                                const pct = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
                                return (
                                    <div key={i} className="p-4 flex items-center gap-3">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-mono font-bold text-sm text-indigo-600 dark:text-indigo-400">{c.code}</span>
                                                {statusBadge(c.status)}
                                            </div>
                                            <p className="text-xs text-slate-500">{c.discount} off · Expires {c.expiry}</p>
                                            <div className="mt-2 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                                            </div>
                                            <p className="text-[10px] text-slate-400 mt-0.5">{c.usage} used</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-400 hover:bg-rose-50 hover:text-rose-600 flex-shrink-0" onClick={() => deleteCoupon(c.code)}>
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Desktop */}
                        <div className="hidden md:block">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/50 dark:bg-slate-800/20">
                                        <TableHead className="font-bold">Code</TableHead>
                                        <TableHead className="font-bold">Discount</TableHead>
                                        <TableHead className="font-bold">Usage</TableHead>
                                        <TableHead className="font-bold">Valid Until</TableHead>
                                        <TableHead className="font-bold">Status</TableHead>
                                        <TableHead className="text-right font-bold">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {coupons.map((coupon, i) => {
                                        const [used, limit] = coupon.usage.split(' / ').map(s => parseInt(s.replace(/,/g, '')) || 0);
                                        const pct = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
                                        return (
                                            <TableRow key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors border-slate-100 dark:border-slate-800">
                                                <TableCell>
                                                    <Badge variant="outline" className="font-mono font-bold text-sm tracking-widest border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                                                        {coupon.code}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="font-bold text-emerald-600 dark:text-emerald-400">{coupon.discount}</TableCell>
                                                <TableCell>
                                                    <div className="w-32">
                                                        <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">{coupon.usage}</p>
                                                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-xs font-bold text-slate-500">{coupon.expiry}</TableCell>
                                                <TableCell>{statusBadge(coupon.status)}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-1">
                                                        <Button variant="ghost" size="sm" className="font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">Edit</Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-400 hover:bg-rose-50 hover:text-rose-600 rounded-full" onClick={() => deleteCoupon(coupon.code)}>
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default MarketingPage;
