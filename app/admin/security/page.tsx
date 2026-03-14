'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldAlert, Fingerprint, Lock, EyeOff, Activity, AlertTriangle } from 'lucide-react';

const mockAlerts = [
    { id: 'SEC-992', type: 'Multiple Failed Logins', user: 'johndoe89', ip: '192.168.1.45', severity: 'High', date: '10 mins ago' },
    { id: 'SEC-991', type: 'Unusually High Order Value', user: 'new_buyer_x', ip: '10.0.0.8', severity: 'Critical', date: '45 mins ago' },
    { id: 'SEC-989', type: 'New Device Login', user: 'sarah.l', ip: '172.16.M.M', severity: 'Low', date: '2 hours ago' },
];

const SecurityPage = () => {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-rose-500">Security & Fraud Operations</h1>
                        <p className="text-slate-500 mt-1">Automated alerts for suspicious activities and platform abuse.</p>
                    </div>
                    <Button variant="destructive" className="gap-2 font-bold shadow-lg shadow-rose-500/20">
                        <Lock className="h-4 w-4" /> Global Freeze Mode
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="border-none shadow-sm dark:bg-slate-900/50 relative overflow-hidden bg-rose-50/50 dark:bg-rose-950/10">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-500 font-bold uppercase tracking-wider flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-rose-500" /> Active Threats
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-mono font-bold text-rose-600 dark:text-rose-400">2</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm dark:bg-slate-900/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-500 font-bold uppercase tracking-wider flex items-center gap-2">
                                <Fingerprint className="h-4 w-4 text-indigo-500" /> Tracked IPs
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-mono font-bold text-indigo-600 dark:text-indigo-400">14</p>
                            <p className="text-xs text-muted-foreground mt-2">Suspicious origins currently monitored.</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm dark:bg-slate-900/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-500 font-bold uppercase tracking-wider flex items-center gap-2">
                                <Activity className="h-4 w-4 text-emerald-500" /> System Defense
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-mono font-bold text-emerald-600 dark:text-emerald-400">Active</p>
                            <p className="text-xs text-muted-foreground mt-2">ML Engine blocking known malicious patterns.</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-none shadow-sm dark:bg-slate-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ShieldAlert className="h-5 w-5 text-rose-500" /> Recent Security Alerts</CardTitle>
                        <CardDescription>Automatically generated events that require administrator review.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 border-t">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50/50 dark:bg-slate-800/20">
                                    <TableHead>Event ID / Time</TableHead>
                                    <TableHead>Alert Type</TableHead>
                                    <TableHead>User / IP</TableHead>
                                    <TableHead>Severity</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockAlerts.map((alert) => (
                                    <TableRow key={alert.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                                        <TableCell>
                                            <p className="font-mono font-bold text-slate-600 dark:text-slate-400">{alert.id}</p>
                                            <p className="text-xs text-slate-500">{alert.date}</p>
                                        </TableCell>
                                        <TableCell className="font-bold">{alert.type}</TableCell>
                                        <TableCell>
                                            <p className="text-sm">{alert.user}</p>
                                            <p className="text-xs text-muted-foreground font-mono">{alert.ip}</p>
                                        </TableCell>
                                        <TableCell>
                                            {alert.severity === 'Critical' && <Badge variant="destructive" className="bg-rose-600 animate-pulse">{alert.severity}</Badge>}
                                            {alert.severity === 'High' && <Badge variant="destructive" className="bg-orange-500">{alert.severity}</Badge>}
                                            {alert.severity === 'Low' && <Badge variant="secondary" className="bg-slate-100 text-slate-500 dark:bg-slate-800">{alert.severity}</Badge>}
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button size="sm" variant="outline" className="h-8 gap-1 border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-900/50 dark:hover:bg-rose-900/20">
                                                <EyeOff className="h-3 w-3" /> Ban IP
                                            </Button>
                                            <Button size="sm" variant="outline" className="h-8 gap-1">Details</Button>
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

export default SecurityPage;
