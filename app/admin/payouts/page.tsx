'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2 } from 'lucide-react';

type PayoutStatus = 'Pending' | 'Processing' | 'Processed';

interface Payout {
    id: string;
    vendor: string;
    amount: string;
    status: PayoutStatus;
    method: string;
    date: string;
}

const PayoutsPage = () => {
    const [payouts, setPayouts] = useState<Payout[]>([
        { id: 'PAY-901', vendor: 'TechNova Electronics', amount: '$4,250.00', status: 'Pending', method: 'Bank Transfer', date: 'Oct 24, 2026' },
        { id: 'PAY-884', vendor: 'Organic Roots', amount: '$850.25', status: 'Pending', method: 'Digital Wallet', date: 'Oct 23, 2026' },
        { id: 'PAY-871', vendor: 'Urban Threads', amount: '$1,240.00', status: 'Processed', method: 'Bank Transfer', date: 'Oct 20, 2026' },
    ]);

    const approve = (id: string) => {
        setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: 'Processing' as PayoutStatus } : p));
        setTimeout(() => setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: 'Processed' as PayoutStatus } : p)), 1500);
    };

    const approveAll = () => {
        payouts.filter(p => p.status === 'Pending').forEach(p => approve(p.id));
    };

    const pendingAmount = payouts.filter(p => p.status === 'Pending').reduce((sum, p) => {
        return sum + parseFloat(p.amount.replace(/[$,]/g, ''));
    }, 0);

    return (
        <AdminLayout title="Payouts & Ledger" headerRight={
            <Button onClick={approveAll} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-8 px-3 md:px-5 shadow-lg shadow-emerald-500/20">
                <span className="hidden sm:inline">Process All</span>
                <span className="sm:hidden">Process</span>
                &nbsp;(${pendingAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })})
            </Button>
        }>
            <div className="p-4 md:p-6 space-y-5">
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="border-none shadow-sm bg-gradient-to-br from-slate-900 to-indigo-950 text-white relative overflow-hidden">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs text-indigo-200 font-bold uppercase tracking-wider flex items-center justify-between">
                                Available to Payout <Wallet className="h-4 w-4 text-indigo-400" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <p className="text-3xl font-mono font-bold">$12,450.00</p>
                            <p className="text-xs text-indigo-300 mt-1.5 flex items-center gap-1"><ArrowUpRight className="h-3 w-3" /> +$2.4k from last week</p>
                        </CardContent>
                        <div className="absolute right-0 bottom-0 h-28 w-28 bg-white/5 rounded-tl-full" />
                    </Card>
                    <Card className="border-none shadow-sm dark:bg-slate-900/60">
                        <CardHeader className="pb-2"><CardTitle className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center justify-between">Pending <Clock className="h-4 w-4 text-amber-500" /></CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-3xl font-mono font-bold text-amber-500">{payouts.filter(p => p.status === 'Pending').length}</p>
                            <p className="text-xs text-muted-foreground mt-1.5">Requires manual approval</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm dark:bg-slate-900/60">
                        <CardHeader className="pb-2"><CardTitle className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center justify-between">Disbursed (MTD) <ArrowDownRight className="h-4 w-4 text-emerald-500" /></CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-3xl font-mono font-bold">$45,280</p>
                            <p className="text-xs text-muted-foreground mt-1.5">View full ledger</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-none shadow-sm dark:bg-slate-900/60 overflow-hidden">
                    <CardHeader className="border-b dark:border-slate-800">
                        <CardTitle className="text-base">Recent Payout Requests</CardTitle>
                        <CardDescription>Transfers processed only after the return window expires.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        {/* Mobile */}
                        <div className="md:hidden divide-y dark:divide-slate-800">
                            {payouts.map(pay => (
                                <div key={pay.id} className="p-4 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <p className="font-mono font-bold text-indigo-500 text-sm">{pay.id}</p>
                                        {pay.status === 'Pending' && <Badge variant="outline" className="text-amber-500 border-amber-500/30 bg-amber-500/10 text-[10px]">Pending</Badge>}
                                        {pay.status === 'Processing' && <Badge variant="secondary" className="text-indigo-500 text-[10px] animate-pulse">Processing...</Badge>}
                                        {pay.status === 'Processed' && <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/10 text-[10px]">Processed</Badge>}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-sm">{pay.vendor}</p>
                                            <p className="text-xs text-slate-500">{pay.method} · {pay.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-mono font-bold">{pay.amount}</p>
                                            {pay.status === 'Pending' && (
                                                <Button size="sm" onClick={() => approve(pay.id)} className="h-7 text-xs bg-indigo-600 hover:bg-indigo-700 mt-1 gap-1">
                                                    <CheckCircle2 className="h-3 w-3" /> Approve
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop */}
                        <div className="hidden md:block">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/50 dark:bg-slate-800/20">
                                        <TableHead className="font-bold">Request ID</TableHead>
                                        <TableHead className="font-bold">Vendor</TableHead>
                                        <TableHead className="font-bold">Method</TableHead>
                                        <TableHead className="font-bold text-right">Amount</TableHead>
                                        <TableHead className="font-bold">Status</TableHead>
                                        <TableHead className="font-bold text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {payouts.map(pay => (
                                        <TableRow key={pay.id} className="border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                                            <TableCell>
                                                <p className="font-bold font-mono text-indigo-500">{pay.id}</p>
                                                <p className="text-xs text-slate-500">{pay.date}</p>
                                            </TableCell>
                                            <TableCell className="font-bold">{pay.vendor}</TableCell>
                                            <TableCell><span className="text-sm text-muted-foreground">{pay.method}</span></TableCell>
                                            <TableCell className="text-right font-mono font-bold text-lg">{pay.amount}</TableCell>
                                            <TableCell>
                                                {pay.status === 'Pending' && <Badge variant="outline" className="text-amber-500 border-amber-500/30 bg-amber-500/10">Pending</Badge>}
                                                {pay.status === 'Processing' && <Badge variant="secondary" className="text-indigo-500 animate-pulse">Processing...</Badge>}
                                                {pay.status === 'Processed' && <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/10">Processed</Badge>}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {pay.status === 'Pending' ? (
                                                    <Button size="sm" onClick={() => approve(pay.id)} className="bg-indigo-600 hover:bg-indigo-700 shadow-md font-bold text-xs gap-1.5 h-8">
                                                        <CheckCircle2 className="h-3 w-3" /> Approve
                                                    </Button>
                                                ) : (
                                                    <Button size="sm" variant="ghost" className="text-slate-400 h-8 font-bold text-xs" disabled>Done</Button>
                                                )}
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

export default PayoutsPage;
