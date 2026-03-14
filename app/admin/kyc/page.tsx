'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle, FileText, Eye, Clock, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type KYCStatus = 'Pending Review' | 'Action Required' | 'Approved' | 'Rejected';

interface KYCRequest {
    id: string;
    vendor: string;
    documents: string[];
    status: KYCStatus;
    date: string;
}

const KYCPage = () => {
    const [requests, setRequests] = useState<KYCRequest[]>([
        { id: 'KYC-8821', vendor: 'Urban Threads', documents: ['Trade License', 'NID'], status: 'Pending Review', date: 'Oct 24, 2026' },
        { id: 'KYC-8822', vendor: 'Pixel Gadgets', documents: ['Trade License', 'Tax ID', 'NID'], status: 'Action Required', date: 'Oct 23, 2026' },
        { id: 'KYC-8823', vendor: 'Organic Roots', documents: ['NID', 'Bank Statement'], status: 'Pending Review', date: 'Oct 22, 2026' },
    ]);

    const approve = (id: string) => {
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
    };
    const reject = (id: string) => {
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));
    };

    const stats = {
        pending: requests.filter(r => r.status === 'Pending Review' || r.status === 'Action Required').length,
        approved: requests.filter(r => r.status === 'Approved').length + 45,
        rejected: requests.filter(r => r.status === 'Rejected').length + 3,
    };

    const statusBadge = (status: KYCStatus) => {
        if (status === 'Approved') return <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[10px] font-bold">Approved</Badge>;
        if (status === 'Rejected') return <Badge className="bg-rose-500/10 text-rose-600 border-none text-[10px] font-bold">Rejected</Badge>;
        if (status === 'Action Required') return <Badge variant="destructive" className="text-[10px]">Action Required</Badge>;
        return <Badge variant="secondary" className="text-[10px]">Pending Review</Badge>;
    };

    return (
        <AdminLayout title="KYC & Onboarding">
            <div className="p-4 md:p-6 space-y-5">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">KYC & Onboarding</h2>
                    <p className="text-slate-500 mt-1 text-sm">Review and verify vendor documents before marketplace approval.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <Card className="border-none shadow-sm dark:bg-slate-900/60">
                        <CardHeader className="pb-2"><CardTitle className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-amber-500" />Pending</CardTitle></CardHeader>
                        <CardContent><p className="text-2xl md:text-3xl font-mono font-bold text-amber-500">{stats.pending}</p></CardContent>
                    </Card>
                    <Card className="border-none shadow-sm dark:bg-slate-900/60 relative overflow-hidden">
                        <CardHeader className="pb-2"><CardTitle className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />Approved</CardTitle></CardHeader>
                        <CardContent><p className="text-2xl md:text-3xl font-mono font-bold text-emerald-500">{stats.approved}</p></CardContent>
                        <div className="absolute right-0 bottom-0 h-16 w-16 bg-emerald-500/10 rounded-tl-full" />
                    </Card>
                    <Card className="border-none shadow-sm dark:bg-slate-900/60 relative overflow-hidden">
                        <CardHeader className="pb-2"><CardTitle className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-rose-500" />Rejected</CardTitle></CardHeader>
                        <CardContent><p className="text-2xl md:text-3xl font-mono font-bold text-rose-500">{stats.rejected}</p></CardContent>
                        <div className="absolute right-0 bottom-0 h-16 w-16 bg-rose-500/10 rounded-tl-full" />
                    </Card>
                </div>

                {/* Queue */}
                <Card className="border-none shadow-sm dark:bg-slate-900/60 overflow-hidden">
                    <CardHeader className="border-b dark:border-slate-800">
                        <CardTitle className="text-base font-bold">Applications Queue</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {/* Mobile */}
                        <div className="md:hidden divide-y dark:divide-slate-800">
                            {requests.map(req => (
                                <div key={req.id} className="p-4 space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="font-bold">{req.vendor}</p>
                                            <p className="text-xs text-muted-foreground">{req.id} · {req.date}</p>
                                        </div>
                                        {statusBadge(req.status)}
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {req.documents.map(doc => (
                                            <Badge key={doc} variant="outline" className="text-[10px] gap-1"><FileText className="h-3 w-3" />{doc}</Badge>
                                        ))}
                                    </div>
                                    {(req.status === 'Pending Review' || req.status === 'Action Required') && (
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" className="h-8 gap-1 flex-1 border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-900/50 dark:hover:bg-rose-900/20" onClick={() => reject(req.id)}>
                                                <XCircle className="h-3.5 w-3.5" /> Reject
                                            </Button>
                                            <Button size="sm" className="h-8 gap-1 flex-1 bg-emerald-600 hover:bg-emerald-700 shadow-md" onClick={() => approve(req.id)}>
                                                <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Desktop */}
                        <div className="hidden md:block">
                            <Table>
                                <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                                    <TableRow>
                                        <TableHead className="font-bold">Vendor & ID</TableHead>
                                        <TableHead className="font-bold">Documents</TableHead>
                                        <TableHead className="font-bold">Date</TableHead>
                                        <TableHead className="font-bold">Status</TableHead>
                                        <TableHead className="text-right font-bold">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {requests.map(req => (
                                        <TableRow key={req.id} className="border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                                            <TableCell>
                                                <p className="font-bold">{req.vendor}</p>
                                                <p className="text-xs text-muted-foreground">{req.id}</p>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {req.documents.map(doc => (
                                                        <Badge key={doc} variant="outline" className="text-[10px] gap-1"><FileText className="h-3 w-3" />{doc}</Badge>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-xs font-bold text-slate-500">{req.date}</TableCell>
                                            <TableCell>{statusBadge(req.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    {(req.status === 'Pending Review' || req.status === 'Action Required') ? (
                                                        <>
                                                            <Button size="sm" variant="outline" className="h-8 gap-1 border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-900/50" onClick={() => reject(req.id)}>
                                                                <XCircle className="h-3 w-3" /> Reject
                                                            </Button>
                                                            <Button size="sm" className="h-8 gap-1 bg-emerald-600 hover:bg-emerald-700 shadow-md" onClick={() => approve(req.id)}>
                                                                <CheckCircle2 className="h-3 w-3" /> Approve
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground italic">No action needed</span>
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

export default KYCPage;
