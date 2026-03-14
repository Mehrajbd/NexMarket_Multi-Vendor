'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Percent, Save, Store, Smartphone, Sofa } from 'lucide-react';

const categoryCommissions = [
    { category: 'Electronics', default: '5%', current: '5%', icon: Smartphone },
    { category: 'Fashion', default: '8%', current: '10%', icon: Store },
    { category: 'Home & Living', default: '10%', current: '10%', icon: Sofa },
];

const vendorOverrides = [
    { vendor: 'TechNova Electronics', category: 'Electronics', rate: '4%' },
    { vendor: 'Elite Gadgets', category: 'Global', rate: '6%' },
];

const CommissionsPage = () => {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Commission Engine</h1>
                    <p className="text-slate-500 mt-1">Manage platform take-rates globally, by category, or per vendor.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Global Settings */}
                    <Card className="border-none shadow-sm dark:bg-slate-900/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Percent className="h-5 w-5 text-indigo-500" /> Global Commission Rate</CardTitle>
                            <CardDescription>Default rate applied to all vendors and categories if no specific override exists.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end gap-4">
                                <div className="space-y-1.5 flex-1">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Base Rate (%)</label>
                                    <Input defaultValue="8.0" type="number" step="0.1" className="text-lg font-bold font-mono h-12 bg-white dark:bg-slate-800" />
                                </div>
                                <Button className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 gap-2 font-bold">
                                    <Save className="h-4 w-4" /> Apply Global Limit
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Vendor Overrides Summary */}
                    <Card className="border-none shadow-sm dark:bg-slate-900/50">
                        <CardHeader>
                            <CardTitle className="text-lg">Active Vendor Overrides</CardTitle>
                            <CardDescription>Vendors with negotiated custom rates.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 border-t">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/50 dark:bg-slate-800/20">
                                        <TableHead>Vendor</TableHead>
                                        <TableHead>Scope</TableHead>
                                        <TableHead className="text-right">Custom Rate</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {vendorOverrides.map((vo) => (
                                        <TableRow key={vo.vendor}>
                                            <TableCell className="font-bold">{vo.vendor}</TableCell>
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
                <Card className="border-none shadow-sm dark:bg-slate-900/50">
                    <CardHeader>
                        <CardTitle className="text-lg">Category Rules</CardTitle>
                        <CardDescription>Set specific take-rates based on product types.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 border-t">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50/50 dark:bg-slate-800/20">
                                    <TableHead>Category</TableHead>
                                    <TableHead>Default Target</TableHead>
                                    <TableHead>Current Override Rate</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categoryCommissions.map((cat) => (
                                    <TableRow key={cat.category}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                                                    <cat.icon className="h-4 w-4" />
                                                </div>
                                                <span className="font-bold">{cat.category}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-500">{cat.default}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Input defaultValue={cat.current.replace('%', '')} className="w-20 text-center font-mono font-bold" />
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
                    </CardContent>
                </Card>

            </main>
        </div>
    );
};

export default CommissionsPage;
