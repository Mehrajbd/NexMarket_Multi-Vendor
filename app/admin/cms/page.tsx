'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LayoutTemplate, Upload, Plus, Store, Tag, X } from 'lucide-react';

const CMSPage = () => {
    const [featuredCats, setFeaturedCats] = useState(['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports']);
    const [newCat, setNewCat] = useState('');

    const removeCategory = (cat: string) => setFeaturedCats(prev => prev.filter(c => c !== cat));
    const addCategory = () => {
        if (newCat.trim() && !featuredCats.includes(newCat.trim())) {
            setFeaturedCats(prev => [...prev, newCat.trim()]);
            setNewCat('');
        }
    };

    return (
        <AdminLayout title="CMS Control">
            <div className="p-4 md:p-6 space-y-5">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Dynamic CMS Control</h2>
                    <p className="text-slate-500 mt-1 text-sm">Manage homepage banners, featured categories, and daily deals.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Banners */}
                    <Card className="border-none shadow-sm dark:bg-slate-900/60">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base"><LayoutTemplate className="h-5 w-5 text-indigo-500" />Hero Banners</CardTitle>
                            <CardDescription>Upload responsive banners for the homepage slider.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="h-28 rounded-xl border-2 border-dashed border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/20 flex flex-col items-center justify-center text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors cursor-pointer group">
                                <Upload className="h-7 w-7 mb-1.5 group-hover:-translate-y-1 transition-transform" />
                                <span className="font-bold text-sm">Drag & Drop new banner</span>
                                <span className="text-xs opacity-70">1920x600px recommended</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white dark:bg-slate-950 border p-3 rounded-xl shadow-sm">
                                <div className="h-12 w-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded flex items-center justify-center text-[8px] font-bold text-white tracking-widest uppercase flex-shrink-0">Banner 1</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold truncate">Summer Sale Mega Event</p>
                                    <p className="text-xs text-muted-foreground">Active · Link: /sale</p>
                                </div>
                                <Button variant="ghost" size="sm" className="text-rose-500 font-bold text-xs h-8 flex-shrink-0">Remove</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Deal of the Day */}
                    <Card className="border-none shadow-sm dark:bg-slate-900/60">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base"><Tag className="h-5 w-5 text-rose-500" />Deal of the Day</CardTitle>
                            <CardDescription>Highlight a product on the homepage.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Product ID (SKU)</label>
                                <div className="flex gap-2">
                                    <Input placeholder="e.g. PRD-12903" className="bg-white dark:bg-slate-800 flex-1" />
                                    <Button className="bg-indigo-600 hover:bg-indigo-700 px-4 flex-shrink-0">Fetch</Button>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl border bg-white dark:bg-slate-950 flex gap-3">
                                <div className="h-16 w-16 bg-muted rounded-lg border flex items-center justify-center text-xs font-bold text-slate-400 flex-shrink-0">IMG</div>
                                <div>
                                    <Badge variant="secondary" className="mb-1 bg-rose-500/10 text-rose-500 border-none font-extrabold uppercase text-[9px] tracking-wider">Current Deal</Badge>
                                    <p className="font-bold text-sm">Nova Pro Wireless Headphones</p>
                                    <div className="flex items-baseline gap-2 mt-1">
                                        <span className="text-base font-black text-rose-500">$199.00</span>
                                        <span className="text-xs text-muted-foreground line-through">$299.00</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">Expires in: 14h 22m</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Featured Categories */}
                <Card className="border-none shadow-sm dark:bg-slate-900/60">
                    <CardHeader className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between border-b dark:border-slate-800">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-base"><Store className="h-5 w-5 text-emerald-500" />Featured Categories</CardTitle>
                            <CardDescription>Categories displayed on the homepage app bar.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-5 space-y-4">
                        {/* Add Category */}
                        <div className="flex gap-2">
                            <Input
                                placeholder="Add new category..."
                                value={newCat}
                                onChange={e => setNewCat(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addCategory()}
                                className="bg-white dark:bg-slate-800 flex-1"
                            />
                            <Button onClick={addCategory} className="bg-indigo-600 hover:bg-indigo-700 gap-1 px-4 flex-shrink-0">
                                <Plus className="h-4 w-4" /> Add
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {featuredCats.map(cat => (
                                <Badge key={cat} variant="secondary" className="px-3 py-1.5 text-sm font-bold flex items-center gap-1.5 bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                                    {cat}
                                    <button
                                        onClick={() => removeCategory(cat)}
                                        className="h-4 w-4 flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-full text-slate-400 hover:bg-rose-100 hover:text-rose-500 transition-colors"
                                    >
                                        <X className="h-2.5 w-2.5" />
                                    </button>
                                </Badge>
                            ))}
                            {featuredCats.length === 0 && (
                                <p className="text-sm text-muted-foreground">No categories added yet.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default CMSPage;
