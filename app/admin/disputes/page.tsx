'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, AlertCircle, RefreshCcw, Store, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

type DisputeStatus = 'Open' | 'Investigating' | 'Resolved';

interface Dispute {
    id: string;
    type: string;
    user: string;
    vendor: string;
    reason: string;
    status: DisputeStatus;
    date: string;
    priority: 'High' | 'Medium' | 'Low';
}

const DisputesPage = () => {
    const [disputes, setDisputes] = useState<Dispute[]>([
        { id: 'TKT-1082', type: 'Refund Request', user: 'johndoe89', vendor: 'Elite Gadgets', reason: 'Defective Product', status: 'Open', date: 'Oct 24, 2026', priority: 'High' },
        { id: 'TKT-1081', type: 'Late Shipping', user: 'sarah.l', vendor: 'Urban Threads', reason: 'Package never arrived', status: 'Investigating', date: 'Oct 22, 2026', priority: 'Medium' },
        { id: 'TKT-1079', type: 'Quality Complaint', user: 'mike_t', vendor: 'TechNova', reason: 'Item not as described', status: 'Resolved', date: 'Oct 18, 2026', priority: 'Low' },
    ]);
    const [search, setSearch] = useState('');

    const resolve = (id: string) => {
        setDisputes(prev => prev.map(d => d.id === id ? { ...d, status: 'Resolved' as DisputeStatus } : d));
    };
    const investigate = (id: string) => {
        setDisputes(prev => prev.map(d => d.id === id ? { ...d, status: 'Investigating' as DisputeStatus } : d));
    };

    const filtered = disputes.filter(d =>
        d.id.toLowerCase().includes(search.toLowerCase()) ||
        d.vendor.toLowerCase().includes(search.toLowerCase()) ||
        d.user.toLowerCase().includes(search.toLowerCase())
    );

    const stats = { open: disputes.filter(d => d.status === 'Open').length, investigating: disputes.filter(d => d.status === 'Investigating').length, resolved: disputes.filter(d => d.status === 'Resolved').length };

    const priorityBadge = (p: string) => {
        if (p === 'High') return <Badge variant="destructive" className="text-[10px] bg-rose-500">{p}</Badge>;
        if (p === 'Medium') return <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-none text-[10px]">{p}</Badge>;
        return <Badge variant="outline" className="text-slate-500 text-[10px]">{p}</Badge>;
    };

    const statusBadge = (s: DisputeStatus) => {
        if (s === 'Open') return <Badge variant="outline" className="text-rose-500 border-rose-500/30 bg-rose-500/10 gap-1 text-[10px]"><AlertCircle className="h-3 w-3" />{s}</Badge>;
        if (s === 'Investigating') return <Badge variant="outline" className="text-amber-500 border-amber-500/30 bg-amber-500/10 gap-1 text-[10px]"><RefreshCcw className="h-3 w-3 animate-spin" />{s}</Badge>;
        return <Badge variant="outline" className="text-slate-400 border-slate-200 bg-slate-100 dark:bg-slate-800 dark:border-slate-700 text-[10px]">{s}</Badge>;
    };

    return (
        <AdminLayout title="Disputes & Refunds">
            <div className="p-4 md:p-6 space-y-5">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <Card className="border-none shadow-sm bg-rose-50 dark:bg-rose-950/20">
                        <CardHeader className="pb-1"><CardTitle className="text-xs font-bold text-rose-500">Open</CardTitle></CardHeader>
                        <CardContent><p className="text-2xl md:text-3xl font-mono font-bold text-rose-600 dark:text-rose-400">{stats.open}</p></CardContent>
                    </Card>
                    <Card className="border-none shadow-sm bg-amber-50 dark:bg-amber-950/20">
                        <CardHeader className="pb-1"><CardTitle className="text-xs font-bold text-amber-500">Investigating</CardTitle></CardHeader>
                        <CardContent><p className="text-2xl md:text-3xl font-mono font-bold text-amber-600 dark:text-amber-400">{stats.investigating}</p></CardContent>
                    </Card>
                    <Card className="border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/20">
                        <CardHeader className="pb-1"><CardTitle className="text-xs font-bold text-emerald-500">Resolved</CardTitle></CardHeader>
                        <CardContent><p className="text-2xl md:text-3xl font-mono font-bold text-emerald-600 dark:text-emerald-400">{stats.resolved}</p></CardContent>
                    </Card>
                </div>

                <Card className="border-none shadow-sm dark:bg-slate-900/60 overflow-hidden">
                    <CardHeader className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between border-b dark:border-slate-800">
                        <CardTitle className="text-base">Active Support Queue</CardTitle>
                        <div className="relative w-full sm:w-56">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input placeholder="Search tickets..." className="pl-9 h-9" value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {/* Mobile */}
                        <div className="md:hidden divide-y dark:divide-slate-800">
                            {filtered.map(tkt => (
                                <div key={tkt.id} className="p-4 space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="font-mono font-bold text-indigo-500 text-sm">{tkt.id}</p>
                                        <div className="flex items-center gap-1.5">{priorityBadge(tkt.priority)}{statusBadge(tkt.status)}</div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{tkt.type}</p>
                                        <p className="text-xs text-muted-foreground">{tkt.reason}</p>
                                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">{tkt.user} vs <Store className="h-3 w-3" /> {tkt.vendor}</p>
                                    </div>
                                    {tkt.status !== 'Resolved' && (
                                        <div className="flex gap-2">
                                            {tkt.status === 'Open' && (
                                                <Button size="sm" variant="outline" className="h-7 text-xs flex-1 border-amber-200 text-amber-600 hover:bg-amber-50" onClick={() => investigate(tkt.id)}>Investigate</Button>
                                            )}
                                            <Button size="sm" className="h-7 text-xs flex-1 bg-emerald-600 hover:bg-emerald-700 gap-1" onClick={() => resolve(tkt.id)}>
                                                <CheckCircle2 className="h-3 w-3" /> Resolve
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Desktop */}
                        <div className="hidden md:block">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/50 dark:bg-slate-800/20">
                                        <TableHead className="font-bold">Ticket</TableHead>
                                        <TableHead className="font-bold">User vs Vendor</TableHead>
                                        <TableHead className="font-bold">Type & Reason</TableHead>
                                        <TableHead className="font-bold">Priority</TableHead>
                                        <TableHead className="font-bold">Status</TableHead>
                                        <TableHead className="text-right font-bold">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filtered.map(tkt => (
                                        <TableRow key={tkt.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 border-slate-100 dark:border-slate-800">
                                            <TableCell>
                                                <p className="font-mono font-bold text-indigo-500">{tkt.id}</p>
                                                <p className="text-xs text-slate-500">{tkt.date}</p>
                                            </TableCell>
                                            <TableCell>
                                                <p className="font-bold text-sm">{tkt.user}</p>
                                                <p className="text-xs text-muted-foreground flex items-center gap-1">vs <Store className="h-3 w-3" /> {tkt.vendor}</p>
                                            </TableCell>
                                            <TableCell>
                                                <p className="font-bold text-sm">{tkt.type}</p>
                                                <p className="text-xs text-muted-foreground">{tkt.reason}</p>
                                            </TableCell>
                                            <TableCell>{priorityBadge(tkt.priority)}</TableCell>
                                            <TableCell>{statusBadge(tkt.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    {tkt.status === 'Open' && (
                                                        <Button size="sm" variant="outline" className="h-8 gap-1 font-bold text-xs border-amber-200 text-amber-600 hover:bg-amber-50" onClick={() => investigate(tkt.id)}>Investigate</Button>
                                                    )}
                                                    {tkt.status !== 'Resolved' && (
                                                        <Button size="sm" className="h-8 gap-1 font-bold text-xs bg-emerald-600 hover:bg-emerald-700" onClick={() => resolve(tkt.id)}>
                                                            <CheckCircle2 className="h-3.5 w-3.5" /> Resolve
                                                        </Button>
                                                    )}
                                                    {tkt.status === 'Resolved' && (
                                                        <span className="text-xs text-muted-foreground italic">Closed</span>
                                                    )}
                                                </div>
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

export default DisputesPage;
