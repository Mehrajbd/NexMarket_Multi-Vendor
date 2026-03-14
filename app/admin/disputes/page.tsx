'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageSquareWarning, Search, Eye, Flag, AlertCircle, RefreshCcw, Store } from 'lucide-react';
import { Input } from '@/components/ui/input';

const mockDisputes = [
    { id: 'TKT-1082', type: 'Refund Request', user: 'johndoe89', vendor: 'Elite Gadgets', reason: 'Defective Product', status: 'Open', date: 'Oct 24, 2026', priority: 'High' },
    { id: 'TKT-1081', type: 'Late Shipping', user: 'sarah.l', vendor: 'Urban Threads', reason: 'Package never arrived', status: 'Investigating', date: 'Oct 22, 2026', priority: 'Medium' },
    { id: 'TKT-1079', type: 'Quality Complaint', user: 'mike_t', vendor: 'TechNova', reason: 'Item not as described', status: 'Resolved', date: 'Oct 18, 2026', priority: 'Low' },
];

const DisputesPage = () => {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Disputes & Refunds</h1>
                        <p className="text-slate-500 mt-1">Manage customer-vendor conflicts and ticket escalations.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card className="border-none shadow-sm dark:bg-slate-900/50 bg-rose-50 dark:bg-rose-950/20">
                        <CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-rose-500">Open Tickets</CardTitle></CardHeader>
                        <CardContent><p className="text-3xl font-mono font-bold text-rose-600 dark:text-rose-400">14</p></CardContent>
                    </Card>
                    <Card className="border-none shadow-sm dark:bg-slate-900/50 bg-amber-50 dark:bg-amber-950/20">
                        <CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-amber-500">Investigating</CardTitle></CardHeader>
                        <CardContent><p className="text-3xl font-mono font-bold text-amber-600 dark:text-amber-400">5</p></CardContent>
                    </Card>
                    <Card className="border-none shadow-sm dark:bg-slate-900/50 bg-indigo-50 dark:bg-indigo-950/20">
                        <CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-indigo-500">Pending Refunds</CardTitle></CardHeader>
                        <CardContent><p className="text-3xl font-mono font-bold text-indigo-600 dark:text-indigo-400">8</p></CardContent>
                    </Card>
                    <Card className="border-none shadow-sm dark:bg-slate-900/50 bg-emerald-50 dark:bg-emerald-950/20">
                        <CardHeader className="pb-2"><CardTitle className="text-sm font-bold text-emerald-500">Resolved (30d)</CardTitle></CardHeader>
                        <CardContent><p className="text-3xl font-mono font-bold text-emerald-600 dark:text-emerald-400">142</p></CardContent>
                    </Card>
                </div>

                <Card className="border-none shadow-sm dark:bg-slate-900/50">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Active Support Queue</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input placeholder="Search ticket ID or vendor..." className="pl-9 h-9 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 border-t">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50/50 dark:bg-slate-800/20">
                                    <TableHead>Ticket ID</TableHead>
                                    <TableHead>User vs Vendor</TableHead>
                                    <TableHead>Type & Reason</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockDisputes.map((tkt) => (
                                    <TableRow key={tkt.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                                        <TableCell>
                                            <p className="font-mono font-bold text-indigo-500">{tkt.id}</p>
                                            <p className="text-xs text-slate-500">{tkt.date}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="font-bold text-sm">{tkt.user}</p>
                                            <p className="text-xs text-muted-foreground flex items-center gap-1">vs <Store className="h-3 w-3" /> {tkt.vendor}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="font-bold text-sm text-slate-700 dark:text-slate-300">{tkt.type}</p>
                                            <p className="text-xs text-muted-foreground">{tkt.reason}</p>
                                        </TableCell>
                                        <TableCell>
                                            {tkt.priority === 'High' && <Badge variant="destructive" className="bg-rose-500">{tkt.priority}</Badge>}
                                            {tkt.priority === 'Medium' && <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-none">{tkt.priority}</Badge>}
                                            {tkt.priority === 'Low' && <Badge variant="outline" className="text-slate-500">{tkt.priority}</Badge>}
                                        </TableCell>
                                        <TableCell>
                                            {tkt.status === 'Open' && <Badge variant="outline" className="text-rose-500 border-rose-500/30 bg-rose-500/10 gap-1"><AlertCircle className="h-3 w-3" /> {tkt.status}</Badge>}
                                            {tkt.status === 'Investigating' && <Badge variant="outline" className="text-amber-500 border-amber-500/30 bg-amber-500/10 gap-1"><RefreshCcw className="h-3 w-3 animate-spin" /> {tkt.status}</Badge>}
                                            {tkt.status === 'Resolved' && <Badge variant="outline" className="text-slate-400 border-slate-200 bg-slate-100 dark:bg-slate-800 dark:border-slate-700">{tkt.status}</Badge>}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" variant="outline" className="h-8 gap-1.5 font-bold shadow-sm">
                                                <Eye className="h-4 w-4" /> Review
                                            </Button>
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

export default DisputesPage;
