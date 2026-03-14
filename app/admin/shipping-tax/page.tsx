'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Truck, Map, Receipt, Globe, Plus, Save } from 'lucide-react';

const ShippingTaxPage = () => {
    const [taxRate, setTaxRate] = useState('15');
    const [taxSaved, setTaxSaved] = useState(false);
    const [zones, setZones] = useState([
        { name: 'Domestic (Standard)', locations: 'Nationwide', rate: '$5.00', threshold: '$50.00' },
        { name: 'Domestic (Express)', locations: 'Nationwide', rate: '$15.00', threshold: 'N/A' },
        { name: 'International (Zone A)', locations: 'USA, Canada', rate: '$25.00', threshold: '$200.00' },
    ]);

    const saveTax = () => {
        setTaxSaved(true);
        setTimeout(() => setTaxSaved(false), 2500);
    };

    return (
        <AdminLayout title="Tax & Shipping">
            <div className="p-4 md:p-6 space-y-5">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Tax & Shipping Settings</h2>
                    <p className="text-slate-500 mt-1 text-sm">Configure global tax rates and shipping zones for checkout calculations.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Tax */}
                    <Card className="border-none shadow-sm dark:bg-slate-900/60">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base"><Receipt className="h-5 w-5 text-indigo-500" />Global Tax Configuration</CardTitle>
                            <CardDescription>Set default VAT/GST applied to all orders unless exempted.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Default Tax Rate (%)</label>
                                <div className="flex items-center gap-3">
                                    <Input value={taxRate} type="number" onChange={e => setTaxRate(e.target.value)} className="w-24 text-center font-mono font-bold h-10 bg-white dark:bg-slate-800" />
                                    <span className="text-sm text-muted-foreground font-bold">% VAT/GST</span>
                                </div>
                            </div>
                            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                                <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
                                    <strong>Note:</strong> Vendors can override tax on individual products for tax-exempt items.
                                </p>
                            </div>
                            <Button onClick={saveTax} className={`w-full font-bold gap-2 transition-colors ${taxSaved ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                                <Save className="h-4 w-4" />{taxSaved ? 'Saved!' : 'Save Tax Settings'}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Calculation Rules */}
                    <Card className="border-none shadow-sm dark:bg-slate-900/60">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base"><Map className="h-5 w-5 text-emerald-500" />Calculation Rules</CardTitle>
                            <CardDescription>Determine how shipping is calculated dynamically.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between p-3.5 border rounded-xl bg-white dark:bg-slate-950">
                                <div>
                                    <p className="font-bold text-sm">Flat Rate</p>
                                    <p className="text-xs text-muted-foreground">Charge a fixed fee per zone.</p>
                                </div>
                                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">Active</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3.5 border rounded-xl bg-white dark:bg-slate-950 opacity-60">
                                <div>
                                    <p className="font-bold text-sm">Weight Based</p>
                                    <p className="text-xs text-muted-foreground">Uses product weight data.</p>
                                </div>
                                <Button variant="outline" size="sm" className="h-7 text-xs">Enable</Button>
                            </div>
                            <div className="flex items-center justify-between p-3.5 border rounded-xl bg-white dark:bg-slate-950 opacity-60">
                                <div>
                                    <p className="font-bold text-sm">Live Carrier Rates</p>
                                    <p className="text-xs text-muted-foreground">DHL, FedEx APIs.</p>
                                </div>
                                <Button variant="outline" size="sm" className="h-7 text-xs">Configure</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Shipping Zones */}
                <Card className="border-none shadow-sm dark:bg-slate-900/60 overflow-hidden">
                    <CardHeader className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between border-b dark:border-slate-800">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-base"><Globe className="h-5 w-5 text-blue-500" />Shipping Zones & Rates</CardTitle>
                            <CardDescription>Manage geographic areas and delivery fees.</CardDescription>
                        </div>
                        <Button size="sm" variant="outline" className="gap-1.5 h-8 font-bold self-start sm:self-auto"><Plus className="h-4 w-4" />Add Zone</Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        {/* Mobile */}
                        <div className="md:hidden divide-y dark:divide-slate-800">
                            {zones.map((z, i) => (
                                <div key={i} className="p-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="font-bold text-sm">{z.name}</p>
                                        <Button variant="ghost" size="sm" className="h-7 font-bold text-indigo-600 hover:bg-indigo-50 text-xs px-2">Edit</Button>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-slate-500">
                                        <span>{z.locations}</span>
                                        <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{z.rate}</span>
                                        <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 font-mono text-slate-500 text-[10px]">{z.threshold}</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop */}
                        <div className="hidden md:block">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/50 dark:bg-slate-800/20">
                                        <TableHead className="font-bold">Zone Name</TableHead>
                                        <TableHead className="font-bold">Regions</TableHead>
                                        <TableHead className="font-bold">Base Rate</TableHead>
                                        <TableHead className="font-bold">Free Threshold</TableHead>
                                        <TableHead className="text-right font-bold">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {zones.map((z, i) => (
                                        <TableRow key={i} className="border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                                            <TableCell className="font-bold">{z.name}</TableCell>
                                            <TableCell className="text-slate-500 text-sm">{z.locations}</TableCell>
                                            <TableCell className="font-mono font-bold">{z.rate}</TableCell>
                                            <TableCell><Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 font-mono text-slate-500">{z.threshold}</Badge></TableCell>
                                            <TableCell className="text-right"><Button variant="ghost" size="sm" className="font-bold text-indigo-600 hover:bg-indigo-50">Edit</Button></TableCell>
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

export default ShippingTaxPage;
