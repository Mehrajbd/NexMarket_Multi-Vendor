'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Truck, Map, Receipt, Globe, Plus } from 'lucide-react';

const mockZones = [
    { name: 'Domestic (Standard)', locations: 'Nationwide', rate: '$5.00', threshold: '$50.00' },
    { name: 'Domestic (Express)', locations: 'Nationwide', rate: '$15.00', threshold: 'N/A' },
    { name: 'International (Zone A)', locations: 'USA, Canada', rate: '$25.00', threshold: '$200.00' },
];

const ShippingTaxPage = () => {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Tax & Shipping Settings</h1>
                    <p className="text-slate-500 mt-1">Configure global tax rates and shipping zones for checkout calculations.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Tax Settings */}
                    <Card className="border-none shadow-sm dark:bg-slate-900/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Receipt className="h-5 w-5 text-indigo-500" /> Global Tax Configuration</CardTitle>
                            <CardDescription>Set default VAT/GST applied to all orders unless exempted.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2 flex-1 relative">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Default Tax Rate (%)</label>
                                <div className="flex items-center gap-3">
                                    <Input defaultValue="15" type="number" className="w-24 text-center font-mono font-bold h-10 bg-white dark:bg-slate-800" />
                                    <span className="text-sm text-muted-foreground">%</span>
                                </div>
                            </div>
                            
                            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                                <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
                                    <strong>Note:</strong> Vendors can override tax settings on individual products if they are selling tax-exempt items.
                                </p>
                            </div>

                            <Button className="font-bold">Save Tax Settings</Button>
                        </CardContent>
                    </Card>

                    {/* Shipping Calculator Rules */}
                    <Card className="border-none shadow-sm dark:bg-slate-900/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Map className="h-5 w-5 text-emerald-500" /> Calculation Rules</CardTitle>
                            <CardDescription>Determine how shipping is calculated dynamically.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 border rounded-lg bg-white dark:bg-slate-950">
                                <div>
                                    <p className="font-bold text-sm">Flat Rate</p>
                                    <p className="text-xs text-muted-foreground">Charge a fixed fee per zone.</p>
                                </div>
                                <Badge className="bg-emerald-500 hover:bg-emerald-600">Active</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg bg-white dark:bg-slate-950 opacity-50 cursor-not-allowed">
                                <div>
                                    <p className="font-bold text-sm">Weight Based</p>
                                    <p className="text-xs text-muted-foreground">Calculated using product weight data.</p>
                                </div>
                                <Button variant="outline" size="sm" className="h-7 text-xs">Enable</Button>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg bg-white dark:bg-slate-950 opacity-50 cursor-not-allowed">
                                <div>
                                    <p className="font-bold text-sm">Live Carrier Rates</p>
                                    <p className="text-xs text-muted-foreground">Connect DHL, FedEx APIs.</p>
                                </div>
                                <Button variant="outline" size="sm" className="h-7 text-xs">Configure</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Shipping Zones */}
                <Card className="border-none shadow-sm dark:bg-slate-900/50">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5 text-blue-500" /> Shipping Zones & Rates</CardTitle>
                            <CardDescription>Manage geographic areas and their assigned delivery fees.</CardDescription>
                        </div>
                        <Button size="sm" variant="outline" className="gap-1.5 h-8 font-bold"><Plus className="h-4 w-4" /> Add Zone</Button>
                    </CardHeader>
                    <CardContent className="p-0 border-t">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50/50 dark:bg-slate-800/20">
                                    <TableHead>Zone Name</TableHead>
                                    <TableHead>Included Regions/Countries</TableHead>
                                    <TableHead>Base Rate</TableHead>
                                    <TableHead>Free Shipping Threshold</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockZones.map((z, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-bold">{z.name}</TableCell>
                                        <TableCell className="text-slate-500 text-sm">{z.locations}</TableCell>
                                        <TableCell className="font-mono font-bold">{z.rate}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 font-mono text-slate-500">{z.threshold}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" className="font-bold text-indigo-600">Edit</Button>
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

export default ShippingTaxPage;
