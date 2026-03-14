'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CheckCircle2, XCircle, FileText, Eye } from 'lucide-react';

const mockKYCRequests = [
    { id: 'KYC-8821', vendor: 'Urban Threads', documents: ['Trade License', 'NID'], status: 'Pending Review', date: 'Oct 24, 2026' },
    { id: 'KYC-8822', vendor: 'Pixel Gadgets', documents: ['Trade License', 'Tax ID', 'NID'], status: 'Action Required', date: 'Oct 23, 2026' },
    { id: 'KYC-8823', vendor: 'Organic Roots', documents: ['NID', 'Bank Statement'], status: 'Pending Review', date: 'Oct 22, 2026' },
];

const KYCPage = () => {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">KYC & Onboarding</h1>
                    <p className="text-slate-500 mt-1">Review and verify vendor documents before marketplace approval.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="border-none shadow-sm dark:bg-slate-900/50">
                        <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500 font-bold uppercase">Pending Reviews</CardTitle></CardHeader>
                        <CardContent><p className="text-3xl font-mono font-bold">12</p></CardContent>
                    </Card>
                    <Card className="border-none shadow-sm dark:bg-slate-900/50 relative overflow-hidden">
                        <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500 font-bold uppercase">Approved This Week</CardTitle></CardHeader>
                        <CardContent><p className="text-3xl font-mono font-bold text-emerald-500">45</p></CardContent>
                        <div className="absolute right-0 bottom-0 h-24 w-24 bg-emerald-500/10 rounded-tl-full" />
                    </Card>
                    <Card className="border-none shadow-sm dark:bg-slate-900/50 relative overflow-hidden">
                        <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500 font-bold uppercase">Rejected / Flagged</CardTitle></CardHeader>
                        <CardContent><p className="text-3xl font-mono font-bold text-red-500">3</p></CardContent>
                        <div className="absolute right-0 bottom-0 h-24 w-24 bg-red-500/10 rounded-tl-full" />
                    </Card>
                </div>

                <Card className="border-none shadow-sm dark:bg-slate-900/50">
                    <CardHeader>
                        <CardTitle className="text-lg">Applications Queue</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                                <TableRow>
                                    <TableHead>Vendor & ID</TableHead>
                                    <TableHead>Documents Provided</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockKYCRequests.map((req) => (
                                    <TableRow key={req.id}>
                                        <TableCell>
                                            <p className="font-bold">{req.vendor}</p>
                                            <p className="text-xs text-muted-foreground">{req.id}</p>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                {req.documents.map(doc => (
                                                    <Badge key={doc} variant="outline" className="text-[10px] gap-1"><FileText className="h-3 w-3" />{doc}</Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-xs font-bold text-slate-500">{req.date}</TableCell>
                                        <TableCell>
                                            <Badge variant={req.status === 'Action Required' ? 'destructive' : 'secondary'} className="text-[10px]">
                                                {req.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button size="sm" variant="outline" className="h-8 gap-1"><Eye className="h-3 w-3" /> View</Button>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:bg-red-500/10 hover:text-red-500"><XCircle className="h-4 w-4" /></Button>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500"><CheckCircle2 className="h-4 w-4" /></Button>
                                            </div>
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

export default KYCPage;
