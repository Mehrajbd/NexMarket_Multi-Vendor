'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import {
    Activity,
    Users,
    Store,
    CreditCard,
    Search,
    Bell,
    ExternalLink,
    CheckCircle2,
    XCircle,
    Clock,
    MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useVendorStore } from '@/store/useVendorStore';

const AdminDashboard = () => {
    const { vendors } = useVendorStore();

    const adminStats = [
        { title: 'Platform GMV', value: '$842,500.00', trend: '+15.2%', icon: CreditCard, color: 'text-emerald-500' },
        { title: 'Total Vendors', value: vendors.length.toString(), trend: '+4.5%', icon: Store, color: 'text-indigo-500' },
        { title: 'Active Users', value: '45.2k', trend: '+12.4%', icon: Users, color: 'text-sky-500' },
        { title: 'Avg. Retention', value: '68%', trend: '+2.1%', icon: Activity, color: 'text-rose-500' },
    ];

    const pendingVendors = [
        { id: 'V-8821', name: 'Urban Threads', category: 'Fashion', date: '2 hours ago', status: 'Pending' },
        { id: 'V-8822', name: 'Pixel Gadgets', category: 'Electronics', date: '5 hours ago', status: 'In Review' },
        { id: 'V-8823', name: 'Organic Roots', category: 'Health', date: '1 day ago', status: 'Pending' },
    ];

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />

            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-16 border-b bg-white dark:bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input placeholder="Search platform data..." className="pl-10 bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800" />
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter">System Health: 99.9%</span>
                        </div>

                        <Button variant="ghost" size="icon" className="relative text-slate-500">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-900" />
                        </Button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Platform Overview</h1>
                            <p className="text-slate-500 mt-1">Global marketplace metrics and administrative actions.</p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="rounded-full px-6 font-bold">Download Report</Button>
                            <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700 px-6 font-bold shadow-lg shadow-indigo-600/20">System Settings</Button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {adminStats.map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <Card key={idx} className="border-none shadow-sm dark:bg-slate-900/50 backdrop-blur-sm group hover:ring-2 ring-indigo-500/10 transition-all">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 ${stat.color}`}>
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-none">
                                                {stat.trend}
                                            </Badge>
                                        </div>
                                        <p className="text-[11px] uppercase tracking-widest font-extrabold text-slate-400 mb-1">{stat.title}</p>
                                        <h3 className="text-3xl font-bold font-mono">{stat.value}</h3>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* Revenue Chart */}
                        <Card className="lg:col-span-2 border-none shadow-sm dark:bg-slate-900/50 backdrop-blur-sm overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-6">
                                <div>
                                    <CardTitle className="text-lg font-bold">Platform Revenue</CardTitle>
                                    <p className="text-xs text-slate-500 mt-0.5">Transactional volume across all vendors</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="ghost" className="text-xs">Export</Button>
                                    <Button size="sm" className="bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 border-none text-xs font-bold">Weekly</Button>
                                </div>
                            </CardHeader>
                            <CardContent className="h-80 pt-10 px-8 flex items-end justify-between gap-1.5">
                                {/* Advanced CSS Bar Chart with Tooltips */}
                                {[25, 45, 30, 75, 55, 95, 65, 50, 85, 40, 70, 60].map((h, i) => (
                                    <div key={i} className="flex-1 group relative flex flex-col items-center gap-2">
                                        <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100">
                                            ${(h * 1.5).toFixed(1)}k
                                        </div>
                                        <div
                                            className="w-full bg-slate-100 dark:bg-slate-800/80 rounded-t-lg transition-all group-hover:bg-indigo-500/50 group-hover:cursor-pointer"
                                            style={{ height: `${h}%` }}
                                        />
                                        <span className="text-[10px] font-bold text-slate-400 mt-2">
                                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                                        </span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Recent Activity / Logs */}
                        <Card className="border-none shadow-sm dark:bg-slate-900/50 backdrop-blur-sm">
                            <CardHeader className="border-b border-slate-100 dark:border-slate-800">
                                <CardTitle className="text-lg font-bold flex items-center justify-between">
                                    System Logs
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {[
                                        { type: 'Store Approved', msg: 'Elite Gadgets approved by Admin', time: '12m ago', icon: CheckCircle2, iconColor: 'text-emerald-500' },
                                        { type: 'Payout Processed', msg: '$4,280 payout to TechStore', time: '45m ago', icon: CreditCard, iconColor: 'text-indigo-500' },
                                        { type: 'Alert', msg: 'Multiple failed logins - IP: 192.x', time: '1h ago', icon: XCircle, iconColor: 'text-rose-500' },
                                        { type: 'Update', msg: 'Server maintenance scheduled for Sat', time: '3h ago', icon: Clock, iconColor: 'text-amber-500' },
                                        { type: 'Vendor Review', msg: 'Urban Threads waiting for review', time: '5h ago', icon: Store, iconColor: 'text-indigo-500' },
                                    ].map((log, i) => (
                                        <div key={i} className="flex items-start gap-3 p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                                            <div className={`mt-0.5 ${log.iconColor} bg-current/10 p-1.5 rounded-lg`}>
                                                <log.icon className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-baseline mb-0.5">
                                                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">{log.type}</p>
                                                    <span className="text-[10px] text-slate-500 font-medium">{log.time}</span>
                                                </div>
                                                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate group-hover:text-indigo-500 transition-colors">{log.msg}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="ghost" className="w-full text-[11px] font-extrabold uppercase py-4 tracking-widest text-indigo-500 hover:bg-indigo-500/5 rounded-none">
                                    View Detailed Logs
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Pending Vendor Approvals */}
                    <Card className="border-none shadow-sm dark:bg-slate-900/50 backdrop-blur-sm overflow-hidden">
                        <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-6 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-bold">New Vendor Requests</CardTitle>
                                <p className="text-xs text-slate-500 mt-0.5">Approve or reject new store applications.</p>
                            </div>
                            <Button variant="outline" size="sm" className="rounded-full gap-2">
                                <ExternalLink className="h-3 w-3" />
                                Manage All
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
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
                                            <TableCell className="text-xs font-bold text-slate-500">
                                                {vendor.date}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-500/10 hover:text-red-500 transition-colors"><XCircle className="h-4 w-4" /></Button>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors"><CheckCircle2 className="h-4 w-4" /></Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
