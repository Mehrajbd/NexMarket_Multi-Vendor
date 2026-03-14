'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Search, ShoppingBag, Filter, CreditCard, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockOrders = [
    { id: '#ORD-9023', customer: 'Sarah J.', vendor: 'TechStore', amount: '$129.00', status: 'Processing', date: '2 mins ago' },
    { id: '#ORD-9024', customer: 'Michael K.', vendor: 'Urban Threads', amount: '$45.50', status: 'Shipped', date: '15 mins ago' },
    { id: '#ORD-9025', customer: 'David L.', vendor: 'NexroLab', amount: '$1,200.00', status: 'Delivered', date: '1 hour ago' },
    { id: '#ORD-9026', customer: 'Emma W.', vendor: 'Urban Threads', amount: '$89.00', status: 'Pending', date: '5 hours ago' },
    { id: '#ORD-9027', customer: 'James R.', vendor: 'TechStore', amount: '$340.00', status: 'Shipped', date: '8 hours ago' },
];

const statusConfig: Record<string, { bg: string; text: string }> = {
    Delivered: { bg: 'bg-emerald-50 dark:bg-emerald-950/30', text: 'text-emerald-600 dark:text-emerald-400' },
    Processing: { bg: 'bg-indigo-50 dark:bg-indigo-950/30', text: 'text-indigo-600 dark:text-indigo-400' },
    Shipped: { bg: 'bg-blue-50 dark:bg-blue-950/30', text: 'text-blue-600 dark:text-blue-400' },
    Pending: { bg: 'bg-orange-50 dark:bg-orange-950/30', text: 'text-orange-600 dark:text-orange-400' },
};

const AdminOrdersPage = () => {
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState<string | null>(null);

    const filtered = mockOrders.filter(o =>
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase()) ||
        o.vendor.toLowerCase().includes(search.toLowerCase())
    ).filter(o => filterStatus ? o.status === filterStatus : true);

    const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];

    return (
        <AdminLayout title="Platform Orders" headerRight={
            <Button variant="outline" size="sm" className="rounded-full font-bold h-8 gap-1.5 hidden sm:flex">
                <Download className="h-3.5 w-3.5" /> Invoices
            </Button>
        }>
            <div className="p-4 md:p-6 space-y-5">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { label: 'Pending Payouts', value: '$12,400', icon: CreditCard, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/20' },
                        { label: 'Today Orders', value: String(filtered.length), icon: ShoppingBag, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/20' },
                        { label: 'Platform Fee', value: '$840', icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
                        { label: 'Support Tickets', value: '3', icon: Eye, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/20' },
                    ].map((s, i) => (
                        <div key={i} className={`${s.bg} p-4 rounded-2xl border border-transparent flex items-center gap-3 shadow-sm`}>
                            <div className={`p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 ${s.color}`}>
                                <s.icon className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest leading-none mb-1">{s.label}</p>
                                <p className="text-lg font-bold font-mono">{s.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters + Search */}
                <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-4 border-b dark:border-slate-800 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setFilterStatus(null)}
                                className={`rounded-full h-8 px-3 font-bold text-xs ${filterStatus === null ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900' : ''}`}
                            >All</Button>
                            {statuses.map(s => (
                                <Button
                                    key={s}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setFilterStatus(filterStatus === s ? null : s)}
                                    className={`rounded-full h-8 px-3 font-bold text-xs ${filterStatus === s ? 'bg-indigo-600 text-white border-indigo-600' : ''}`}
                                >{s}</Button>
                            ))}
                        </div>
                        <div className="relative w-full sm:w-56">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input placeholder="Search orders..." className="pl-9 h-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div>

                    {/* Mobile List */}
                    <div className="md:hidden divide-y dark:divide-slate-800">
                        {filtered.map(order => {
                            const cfg = statusConfig[order.status] || {};
                            return (
                                <div key={order.id} className="p-4 flex items-center gap-3">
                                    <Avatar className="h-9 w-9 flex-shrink-0">
                                        <AvatarFallback className="text-[10px] font-bold bg-slate-100">{order.customer[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="font-mono text-xs font-bold text-indigo-500">{order.id}</p>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>{order.status}</span>
                                        </div>
                                        <p className="font-semibold text-sm truncate">{order.customer}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-xs text-slate-500">{order.vendor}</span>
                                            <span className="text-xs font-bold">{order.amount}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {filtered.length === 0 && <div className="py-12 text-center text-muted-foreground text-sm">No orders found.</div>}
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                                    <TableHead className="font-bold">Order ID</TableHead>
                                    <TableHead className="font-bold">Customer</TableHead>
                                    <TableHead className="font-bold">Vendor</TableHead>
                                    <TableHead className="font-bold">Amount</TableHead>
                                    <TableHead className="font-bold">Status</TableHead>
                                    <TableHead className="font-bold text-right">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map((order) => {
                                    const cfg = statusConfig[order.status] || {};
                                    return (
                                        <TableRow key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 border-slate-100 dark:border-slate-800 transition-colors">
                                            <TableCell className="font-mono text-xs font-bold text-indigo-500">{order.id}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback className="text-[10px] font-bold">{order.customer[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm font-medium">{order.customer}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell><span className="text-xs font-bold py-1 px-2 bg-slate-100 dark:bg-slate-800 rounded-md">{order.vendor}</span></TableCell>
                                            <TableCell className="font-bold text-sm">{order.amount}</TableCell>
                                            <TableCell>
                                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.text}`}>{order.status}</span>
                                            </TableCell>
                                            <TableCell className="text-right text-xs text-slate-500">{order.date}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        {filtered.length === 0 && <div className="py-12 text-center text-muted-foreground">No orders found.</div>}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminOrdersPage;
