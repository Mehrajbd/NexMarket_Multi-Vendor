'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Percent, Save, Store, Smartphone, Sofa } from 'lucide-react';

const CommissionsPage = () => {
    const [globalRate, setGlobalRate] = useState('8.0');
    const [saved, setSaved] = useState(false);
    const [categoryRates, setCategoryRates] = useState([
        { category: 'Electronics', default: '5%', current: '5', icon: Smartphone },
        { category: 'Fashion', default: '8%', current: '10', icon: Store },
        { category: 'Home & Living', default: '10%', current: '10', icon: Sofa },
    ]);

    const vendorOverrides = [
        { vendor: 'TechNova Electronics', category: 'Electronics', rate: '4%' },
        { vendor: 'Elite Gadgets', category: 'Global', rate: '6%' },
    ];

    const handleSaveGlobal = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const updateRate = (idx: number, val: string) => {
        setCategoryRates(prev => prev.map((c, i) => i === idx ? { ...c, current: val } : c));
    };

    return (
        <AdminLayout title="Commission Engine">
            <div className="p-4 md:p-6 space-y-5">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Commission Engine</h2>
                    <p className="text-slate-500 mt-1 text-sm">Manage platform take-rates globally, by category, or per vendor.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Global Rate */}
                    <Card className="border-none shadow-sm dark:bg-slate-900/60">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base"><Percent className="h-5 w-5 text-indigo-500" />Global Commission Rate</CardTitle>
                            <CardDescription>Default rate applied to all vendors unless overridden.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
                                <div className="space-y-1.5 flex-1">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Base Rate (%)</label>
                                    <Input value={globalRate} type="number" step="0.1" onChange={e => setGlobalRate(e.target.value)} className="text-lg font-bold font-mono h-11 bg-white dark:bg-slate-800" />
                                </div>
                                <Button onClick={handleSaveGlobal} className={`h-11 px-6 gap-2 font-bold shadow-md transition-all ${saved ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20'}`}>
                                    <Save className="h-4 w-4" /> {saved ? 'Saved!' : 'Apply Rate'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Vendor Overrides */}
                    <Card className="border-none shadow-sm dark:bg-slate-900/60">
                        <CardHeader>
                            <CardTitle className="text-base">Active Vendor Overrides</CardTitle>
                            <CardDescription>Vendors with negotiated custom rates.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 border-t dark:border-slate-800">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/50 dark:bg-slate-800/20">
                                        <TableHead className="font-bold">Vendor</TableHead>
                                        <TableHead className="font-bold">Scope</TableHead>
                                        <TableHead className="font-bold text-right">Rate</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {vendorOverrides.map((vo) => (
                                        <TableRow key={vo.vendor} className="border-slate-100 dark:border-slate-800">
                                            <TableCell className="font-bold text-sm">{vo.vendor}</TableCell>
                                            <TableCell><Badge variant="outline" className="text-[10px]">{vo.category}</Badge></TableCell>
                                            <TableCell className="text-right font-mono font-bold text-indigo-500">{vo.rate}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {/* Category Rules */}
                <Card className="border-none shadow-sm dark:bg-slate-900/60">
                    <CardHeader>
                        <CardTitle className="text-base">Category Rules</CardTitle>
                        <CardDescription>Set specific take-rates based on product types.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 border-t dark:border-slate-800">
                        {/* Mobile */}
                        <div className="md:hidden divide-y dark:divide-slate-800">
                            {categoryRates.map((cat, idx) => (
                                <div key={cat.category} className="p-4 flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex-shrink-0">
                                        <cat.icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-sm">{cat.category}</p>
                                        <p className="text-xs text-slate-500">Default: {cat.default}</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                        <Input value={cat.current} onChange={e => updateRate(idx, e.target.value)} className="w-16 text-center font-mono font-bold h-8 text-sm" />
                                        <span className="text-slate-400 font-bold">%</span>
                                    </div>
                                    <Button variant="outline" size="sm" className="h-8 font-bold text-indigo-600 border-indigo-200 hover:bg-indigo-50 px-2">Save</Button>
                                </div>
                            ))}
                        </div>

                        {/* Desktop */}
                        <div className="hidden md:block">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/50 dark:bg-slate-800/20">
                                        <TableHead className="font-bold">Category</TableHead>
                                        <TableHead className="font-bold">Default</TableHead>
                                        <TableHead className="font-bold">Override Rate</TableHead>
                                        <TableHead className="text-right font-bold">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categoryRates.map((cat, idx) => (
                                        <TableRow key={cat.category} className="border-slate-100 dark:border-slate-800">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500"><cat.icon className="h-4 w-4" /></div>
                                                    <span className="font-bold">{cat.category}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-slate-500">{cat.default}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Input value={cat.current} onChange={e => updateRate(idx, e.target.value)} className="w-20 text-center font-mono font-bold" />
                                                    <span className="text-muted-foreground font-bold">%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm" className="font-bold text-indigo-600 border-indigo-200 hover:bg-indigo-50">Update</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default CommissionsPage;
