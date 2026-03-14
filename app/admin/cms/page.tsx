'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LayoutTemplate, Upload, Plus, Store, Tag } from 'lucide-react';

const CMSPage = () => {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Dynamic CMS Control</h1>
                    <p className="text-slate-500 mt-1">Manage homepage banners, featured categories, and daily deals.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Homepage Banners */}
                    <Card className="border-none shadow-sm dark:bg-slate-900/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><LayoutTemplate className="h-5 w-5 text-indigo-500" /> Hero Banners</CardTitle>
                            <CardDescription>Upload responsive banners for the homepage slider.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="h-32 rounded-xl border-2 border-dashed border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/20 flex flex-col items-center justify-center text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors cursor-pointer group">
                                <Upload className="h-8 w-8 mb-2 group-hover:-translate-y-1 transition-transform" />
                                <span className="font-bold text-sm">Drag & Drop new banner</span>
                                <span className="text-xs opacity-70">1920x600px recommended</span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-4 bg-white dark:bg-slate-950 border p-3 rounded-xl shadow-sm">
                                    <div className="h-12 w-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded flex items-center justify-center text-[8px] font-bold text-white tracking-widest uppercase">Banner 1</div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">Summer Sale Mega Event</p>
                                        <p className="text-xs text-muted-foreground">Active • Link: /sale</p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-rose-500 font-bold text-xs h-8">Remove</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Deal of the Day */}
                    <Card className="border-none shadow-sm dark:bg-slate-900/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Tag className="h-5 w-5 text-rose-500" /> Deal of the Day</CardTitle>
                            <CardDescription>Select a product to highlight on the homepage with a countdown.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Product Identifier (SKU/ID)</label>
                                <div className="flex gap-2">
                                    <Input placeholder="e.g. PRD-12903" className="bg-white dark:bg-slate-800" />
                                    <Button className="bg-indigo-600 hover:bg-indigo-700">Fetch</Button>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl border bg-white dark:bg-slate-950 flex gap-4">
                                <div className="h-20 w-20 bg-muted rounded-lg border flex items-center justify-center text-xs font-bold text-slate-400">IMG</div>
                                <div>
                                    <Badge variant="secondary" className="mb-1 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border-none font-extrabold uppercase text-[9px] tracking-wider">Current Deal</Badge>
                                    <p className="font-bold">Nova Pro Wireless Headphones</p>
                                    <div className="flex items-baseline gap-2 mt-1">
                                        <span className="text-lg font-black text-rose-500">$199.00</span>
                                        <span className="text-xs text-muted-foreground line-through">$299.00</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">Expires in: 14h 22m</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Featured Categories */}
                <Card className="border-none shadow-sm dark:bg-slate-900/50">
                    <CardHeader className="flex flex-row gap-4 items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2"><Store className="h-5 w-5 text-emerald-500" /> Featured Categories</CardTitle>
                            <CardDescription>Categories displayed prominently on the home page app bar.</CardDescription>
                        </div>
                        <Button size="sm" variant="outline" className="gap-1.5 h-8 font-bold"><Plus className="h-4 w-4" /> Add Category</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            {['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports'].map(cat => (
                                <Badge key={cat} variant="secondary" className="px-4 py-2 text-sm font-bold flex items-center gap-2 bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                                    {cat}
                                    <span className="h-4 w-4 flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-full text-xs text-slate-400 cursor-pointer hover:bg-rose-100 hover:text-rose-500 transition-colors">×</span>
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>

            </main>
        </div>
    );
};

export default CMSPage;
