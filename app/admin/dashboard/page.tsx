'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
    Activity, Users, Store, CreditCard, ExternalLink,
    CheckCircle2, XCircle, Clock, MoreHorizontal, Search, Download, TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { useVendorStore } from '@/store/useVendorStore';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const { vendors } = useVendorStore();
    const [pendingVendors, setPendingVendors] = useState([
        { id: 'V-8821', name: 'Urban Threads', category: 'Fashion', date: '2 hours ago', status: 'Pending' },
        { id: 'V-8822', name: 'Pixel Gadgets', category: 'Electronics', date: '5 hours ago', status: 'In Review' },
        { id: 'V-8823', name: 'Organic Roots', category: 'Health', date: '1 day ago', status: 'Pending' },
    ]);

    const handleApprove = (id: string) => {
        setPendingVendors(prev => prev.filter(v => v.id !== id));
    };
    const handleReject = (id: string) => {
        setPendingVendors(prev => prev.filter(v => v.id !== id));
    };

    const adminStats = [
        { title: 'Platform GMV', value: '$842,500', trend: '+15.2%', icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
        { title: 'Total Vendors', value: vendors.length.toString(), trend: '+4.5%', icon: Store, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/30' },
        { title: 'Active Users', value: '45.2k', trend: '+12.4%', icon: Users, color: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-950/30' },
        { title: 'Avg. Retention', value: '68%', trend: '+2.1%', icon: Activity, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/30' },
    ];

    const systemLogs = [
        { type: 'Store Approved', msg: 'Elite Gadgets approved by Admin', time: '12m ago', icon: CheckCircle2, iconColor: 'text-emerald-500', iconBg: 'bg-emerald-50 dark:bg-emerald-950/30' },
        { type: 'Payout Processed', msg: '$4,280 payout to TechStore', time: '45m ago', icon: CreditCard, iconColor: 'text-indigo-500', iconBg: 'bg-indigo-50 dark:bg-indigo-950/30' },
        { type: 'Alert', msg: 'Multiple failed logins - IP: 192.x', time: '1h ago', icon: XCircle, iconColor: 'text-rose-500', iconBg: 'bg-rose-50 dark:bg-rose-950/30' },
        { type: 'Update', msg: 'Server maintenance scheduled for Sat', time: '3h ago', icon: Clock, iconColor: 'text-amber-500', iconBg: 'bg-amber-50 dark:bg-amber-950/30' },
        { type: 'Vendor Review', msg: 'Urban Threads waiting for review', time: '5h ago', icon: Store, iconColor: 'text-indigo-500', iconBg: 'bg-indigo-50 dark:bg-indigo-950/30' },
    ];

    return (
        <AdminLayout
            title="Platform Overview"
            headerRight={
                <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tight">99.9% Uptime</span>
                    </div>
                </div>
            }
        >
            <div className="p-4 md:p-6 space-y-6">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Platform Overview</h2>
                        <p className="text-slate-500 mt-1 text-sm">Global marketplace metrics and administrative actions.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="rounded-full font-bold gap-2">
                            <Download className="h-3.5 w-3.5" /> Export
                        </Button>
                        <Button size="sm" className="rounded-full bg-indigo-600 hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-600/20">
                            System Settings
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
                    {adminStats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div key={idx} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
                                <Card className="border-none shadow-sm dark:bg-slate-900/60 hover:shadow-md transition-shadow">
                                    <CardContent className="p-4 md:p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                                                <Icon className="h-4 w-4 md:h-5 md:w-5" />
                                            </div>
                                            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-none text-[10px] font-bold">
                                                {stat.trend}
                                            </Badge>
                                        </div>
                                        <p className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400 mb-1">{stat.title}</p>
                                        <h3 className="text-xl md:text-2xl font-bold font-mono">{stat.value}</h3>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Revenue Chart */}
                    <Card className="lg:col-span-2 border-none shadow-sm dark:bg-slate-900/60 overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                            <div>
                                <CardTitle className="text-base font-bold">Platform Revenue</CardTitle>
                                <p className="text-xs text-slate-500 mt-0.5">Transactional volume across all vendors</p>
                            </div>
                            <div className="flex gap-1.5">
                                <Button size="sm" variant="ghost" className="text-xs h-7 px-2.5">Export</Button>
                                <Button size="sm" className="bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 border-none text-xs font-bold h-7 px-2.5">Weekly</Button>
                            </div>
                        </CardHeader>
                        <CardContent className="h-56 md:h-72 pt-6 px-4 md:px-6 flex items-end justify-between gap-1">
                            {[25, 45, 30, 75, 55, 95, 65, 50, 85, 40, 70, 60].map((h, i) => (
                                <div key={i} className="flex-1 group relative flex flex-col items-center">
                                    <div className="absolute -top-8 scale-0 group-hover:scale-100 transition-all bg-slate-800 text-white text-[9px] py-1 px-1.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
                                        ${(h * 1.5).toFixed(1)}k
                                    </div>
                                    <div
                                        className="w-full bg-slate-100 dark:bg-slate-800/80 rounded-t-md transition-all group-hover:bg-indigo-500/60 cursor-pointer"
                                        style={{ height: `${h}%` }}
                                    />
                                    <span className="text-[8px] md:text-[10px] font-bold text-slate-400 mt-1">
                                        {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                                    </span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* System Logs */}
                    <Card className="border-none shadow-sm dark:bg-slate-900/60">
                        <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-3">
                            <CardTitle className="text-base font-bold flex items-center justify-between">
                                System Logs
                                <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {systemLogs.map((log, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group">
                                        <div className={`mt-0.5 p-1.5 rounded-lg ${log.iconBg} flex-shrink-0`}>
                                            <log.icon className={`h-3.5 w-3.5 ${log.iconColor}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline gap-1 mb-0.5">
                                                <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 truncate">{log.type}</p>
                                                <span className="text-[9px] text-slate-400 font-medium flex-shrink-0">{log.time}</span>
                                            </div>
                                            <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate group-hover:text-indigo-500 transition-colors">{log.msg}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" className="w-full text-[10px] font-extrabold uppercase py-3 tracking-widest text-indigo-500 hover:bg-indigo-500/5 rounded-none rounded-b-xl">
                                View All Logs
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Pending Vendor Approvals */}
                <Card className="border-none shadow-sm dark:bg-slate-900/60 overflow-hidden">
                    <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <CardTitle className="text-base font-bold">New Vendor Requests</CardTitle>
                            <p className="text-xs text-slate-500 mt-0.5">Approve or reject new store applications.</p>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-full gap-2 self-start sm:self-auto">
                            <ExternalLink className="h-3 w-3" /> Manage All
                        </Button>
                    </CardHeader>
                    {pendingVendors.length === 0 ? (
                        <CardContent className="py-12 text-center">
                            <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-3" />
                            <p className="font-bold text-slate-700 dark:text-slate-300">All caught up!</p>
                            <p className="text-sm text-slate-500">No pending vendor requests right now.</p>
                        </CardContent>
                    ) : (
                        <CardContent className="p-0">
                            <div className="block md:hidden divide-y dark:divide-slate-800">
                                {pendingVendors.map((vendor) => (
                                    <div key={vendor.id} className="p-4 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-indigo-600 flex-shrink-0">
                                                {vendor.name[0]}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-sm truncate">{vendor.name}</p>
                                                <p className="text-xs text-slate-500">{vendor.id} · {vendor.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 flex-shrink-0">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-500/10 hover:text-red-500 transition-colors" onClick={() => handleReject(vendor.id)}>
                                                <XCircle className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors" onClick={() => handleApprove(vendor.id)}>
                                                <CheckCircle2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="hidden md:block">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                                            <TableHead className="font-bold text-slate-700 dark:text-slate-300">Store Detail</TableHead>
                                            <TableHead className="font-bold text-slate-700 dark:text-slate-300">Category</TableHead>
                                            <TableHead className="font-bold text-slate-700 dark:text-slate-300">Submitted</TableHead>
                                            <TableHead className="font-bold text-slate-700 dark:text-slate-300 text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {pendingVendors.map((vendor) => (
                                            <TableRow key={vendor.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors border-slate-100 dark:border-slate-800">
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-indigo-600">
                                                            {vendor.name[0]}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-sm">{vendor.name}</p>
                                                            <p className="text-xs text-muted-foreground">{vendor.id}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className="rounded-full font-bold text-[10px] px-2.5">{vendor.category}</Badge>
                                                </TableCell>
                                                <TableCell className="text-xs font-bold text-slate-500">{vendor.date}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm" className="h-8 gap-1.5 font-bold border border-red-200 text-red-500 hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-900/20 rounded-lg px-3" onClick={() => handleReject(vendor.id)}>
                                                            <XCircle className="h-3.5 w-3.5" /> Reject
                                                        </Button>
                                                        <Button size="sm" className="h-8 gap-1.5 font-bold bg-emerald-600 hover:bg-emerald-700 rounded-lg px-3 shadow-md shadow-emerald-500/20" onClick={() => handleApprove(vendor.id)}>
                                                            <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    )}
                </Card>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
