'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldAlert, Fingerprint, Lock, EyeOff, Activity, AlertTriangle } from 'lucide-react';

type AlertSeverity = 'Critical' | 'High' | 'Low';
interface SecurityAlert { id: string; type: string; user: string; ip: string; severity: AlertSeverity; date: string; banned?: boolean; }

const SecurityPage = () => {
    const [alerts, setAlerts] = useState<SecurityAlert[]>([
        { id: 'SEC-992', type: 'Multiple Failed Logins', user: 'johndoe89', ip: '192.168.1.45', severity: 'High', date: '10 mins ago' },
        { id: 'SEC-991', type: 'Unusually High Order Value', user: 'new_buyer_x', ip: '10.0.0.8', severity: 'Critical', date: '45 mins ago' },
        { id: 'SEC-989', type: 'New Device Login', user: 'sarah.l', ip: '172.16.M.M', severity: 'Low', date: '2 hours ago' },
    ]);
    const [frozen, setFrozen] = useState(false);

    const banIP = (id: string) => setAlerts(prev => prev.map(a => a.id === id ? { ...a, banned: true } : a));

    const sevBadge = (s: AlertSeverity) => {
        if (s === 'Critical') return <Badge variant="destructive" className="bg-rose-600 animate-pulse text-[10px]">{s}</Badge>;
        if (s === 'High') return <Badge variant="destructive" className="bg-orange-500 text-[10px]">{s}</Badge>;
        return <Badge variant="secondary" className="bg-slate-100 text-slate-500 dark:bg-slate-800 text-[10px]">{s}</Badge>;
    };

    return (
        <AdminLayout title="Security & Fraud" headerRight={
            <Button size="sm" variant={frozen ? 'secondary' : 'destructive'}
                onClick={() => setFrozen(!frozen)}
                className={`gap-1.5 font-bold h-8 px-3 md:px-5 shadow-lg ${frozen ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20' : 'shadow-rose-500/20'}`}>
                <Lock className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{frozen ? 'Platform Frozen!' : 'Global Freeze'}</span>
            </Button>
        }>
            <div className="p-4 md:p-6 space-y-5">
                {frozen && (
                    <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                        <div>
                            <p className="font-bold text-amber-800 dark:text-amber-300">Platform is in Freeze Mode</p>
                            <p className="text-xs text-amber-700 dark:text-amber-400">Only admins can access the platform. All transactions are paused.</p>
                        </div>
                        <Button size="sm" variant="outline" className="ml-auto border-amber-300 text-amber-700 hover:bg-amber-100" onClick={() => setFrozen(false)}>Unfreeze</Button>
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <Card className="border-none shadow-sm dark:bg-slate-900/60 bg-rose-50/50 dark:bg-rose-950/10">
                        <CardHeader className="pb-2"><CardTitle className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-rose-500" />Active Threats</CardTitle></CardHeader>
                        <CardContent><p className="text-2xl md:text-3xl font-mono font-bold text-rose-600 dark:text-rose-400">{alerts.filter(a => !a.banned && a.severity !== 'Low').length}</p></CardContent>
                    </Card>
                    <Card className="border-none shadow-sm dark:bg-slate-900/60">
                        <CardHeader className="pb-2"><CardTitle className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-2"><Fingerprint className="h-3.5 w-3.5 text-indigo-500" />Tracked IPs</CardTitle></CardHeader>
                        <CardContent><p className="text-2xl md:text-3xl font-mono font-bold text-indigo-600 dark:text-indigo-400">14</p></CardContent>
                    </Card>
                    <Card className="border-none shadow-sm dark:bg-slate-900/60">
                        <CardHeader className="pb-2"><CardTitle className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-2"><Activity className="h-3.5 w-3.5 text-emerald-500" />Defense</CardTitle></CardHeader>
                        <CardContent><p className="text-xl md:text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">Active</p></CardContent>
                    </Card>
                </div>

                <Card className="border-none shadow-sm dark:bg-slate-900/60 overflow-hidden">
                    <CardHeader className="border-b dark:border-slate-800">
                        <CardTitle className="flex items-center gap-2 text-base"><ShieldAlert className="h-4 w-4 text-rose-500" />Recent Security Alerts</CardTitle>
                        <CardDescription>Generated events requiring administrator review.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        {/* Mobile */}
                        <div className="md:hidden divide-y dark:divide-slate-800">
                            {alerts.map(a => (
                                <div key={a.id} className={`p-4 space-y-2 ${a.banned ? 'opacity-50' : ''}`}>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="font-mono font-bold text-sm text-slate-600 dark:text-slate-400">{a.id}</p>
                                        {sevBadge(a.severity)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{a.type}</p>
                                        <p className="text-xs text-slate-500">{a.user} · <span className="font-mono">{a.ip}</span> · {a.date}</p>
                                    </div>
                                    {!a.banned ? (
                                        <Button size="sm" variant="outline" className="h-7 gap-1 border-rose-200 text-rose-600 hover:bg-rose-50 text-xs" onClick={() => banIP(a.id)}>
                                            <EyeOff className="h-3 w-3" /> Ban IP
                                        </Button>
                                    ) : (
                                        <span className="text-xs text-slate-400 italic">IP Banned</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Desktop */}
                        <div className="hidden md:block">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/50 dark:bg-slate-800/20">
                                        <TableHead className="font-bold">Event ID</TableHead>
                                        <TableHead className="font-bold">Alert Type</TableHead>
                                        <TableHead className="font-bold">User / IP</TableHead>
                                        <TableHead className="font-bold">Severity</TableHead>
                                        <TableHead className="text-right font-bold">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {alerts.map(a => (
                                        <TableRow key={a.id} className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/20 border-slate-100 dark:border-slate-800 ${a.banned ? 'opacity-50' : ''}`}>
                                            <TableCell>
                                                <p className="font-mono font-bold text-slate-600 dark:text-slate-400">{a.id}</p>
                                                <p className="text-xs text-slate-500">{a.date}</p>
                                            </TableCell>
                                            <TableCell className="font-bold">{a.type}</TableCell>
                                            <TableCell>
                                                <p className="text-sm">{a.user}</p>
                                                <p className="text-xs text-muted-foreground font-mono">{a.ip}</p>
                                            </TableCell>
                                            <TableCell>{sevBadge(a.severity)}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                {!a.banned ? (
                                                    <Button size="sm" variant="outline" onClick={() => banIP(a.id)} className="h-8 gap-1 border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-900/50 dark:hover:bg-rose-900/20">
                                                        <EyeOff className="h-3 w-3" /> Ban IP
                                                    </Button>
                                                ) : (
                                                    <span className="text-xs text-slate-400 italic">Banned</span>
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

export default SecurityPage;
