'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2 } from 'lucide-react';

const mockPayouts = [
    { id: 'PAY-901', vendor: 'TechNova Electronics', amount: '$4,250.00', status: 'Pending', method: 'Bank Transfer', date: 'Oct 24, 2026' },
    { id: 'PAY-884', vendor: 'Organic Roots', amount: '$850.25', status: 'Pending', method: 'Digital Wallet', date: 'Oct 23, 2026' },
    { id: 'PAY-871', vendor: 'Urban Threads', amount: '$1,240.00', status: 'Processed', method: 'Bank Transfer', date: 'Oct 20, 2026' },
];

const PayoutsPage = () => {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Payouts & Ledger</h1>
                        <p className="text-slate-500 mt-1">Review vendor payout requests and manage funds transfers.</p>
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 shadow-lg shadow-emerald-500/20">
                        Process All Pending ($5,100.25)
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="border-none shadow-sm bg-gradient-to-br from-slate-900 to-indigo-950 text-white relative overflow-hidden">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-indigo-200 font-bold uppercase tracking-wider flex items-center justify-between">
                                Available to Payout
                                <Wallet className="h-4 w-4 text-indigo-400" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <p className="text-4xl font-mono font-bold">$12,450.00</p>
                            <p className="text-xs text-indigo-300 mt-2 flex items-center gap-1">
                                <ArrowUpRight className="h-3 w-3" /> +$2.4k from last week
                            </p>
                        </CardContent>
                        <div className="absolute right-0 bottom-0 h-32 w-32 bg-white/5 rounded-tl-full" />
                    </Card>
                    
                    <Card className="border-none shadow-sm dark:bg-slate-900/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-500 font-bold uppercase tracking-wider flex items-center justify-between">
                                Pending Requests
                                <Clock className="h-4 w-4 text-amber-500" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-mono font-bold text-amber-500">2</p>
                            <p className="text-xs text-muted-foreground mt-2">Requires manual approval</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm dark:bg-slate-900/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-500 font-bold uppercase tracking-wider flex items-center justify-between">
                                Total Disbursed (MTD)
                                <ArrowDownRight className="h-4 w-4 text-emerald-500" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-mono font-bold">$45,280.00</p>
                            <p className="text-xs text-muted-foreground mt-2">View full ledger statement</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-none shadow-sm dark:bg-slate-900/50">
                    <CardHeader>
                        <CardTitle className="text-lg">Recent Payout Requests</CardTitle>
                        <CardDescription>Transfers are processed only after the platform return window expires.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 border-t">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50/50 dark:bg-slate-800/20">
                                    <TableHead>Request ID / Date</TableHead>
                                    <TableHead>Vendor</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockPayouts.map((pay) => (
                                    <TableRow key={pay.id}>
                                        <TableCell>
                                            <p className="font-bold font-mono text-indigo-500">{pay.id}</p>
                                            <p className="text-xs text-slate-500">{pay.date}</p>
                                        </TableCell>
                                        <TableCell className="font-bold">{pay.vendor}</TableCell>
                                        <TableCell><span className="text-sm text-muted-foreground">{pay.method}</span></TableCell>
                                        <TableCell className="text-right font-mono font-bold text-lg">{pay.amount}</TableCell>
                                        <TableCell>
                                            {pay.status === 'Pending' ? (
                                                <Badge variant="outline" className="text-amber-500 border-amber-500/30 bg-amber-500/10">Pending</Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/10">Processed</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {pay.status === 'Pending' ? (
                                                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 shadow-md font-bold text-xs gap-1.5 h-8">
                                                    <CheckCircle2 className="h-3 w-3" /> Approve Transfer
                                                </Button>
                                            ) : (
                                                <Button size="sm" variant="ghost" className="text-slate-400 h-8 font-bold text-xs" disabled>
                                                    Completed
                                                </Button>
                                            )}
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

export default PayoutsPage;
