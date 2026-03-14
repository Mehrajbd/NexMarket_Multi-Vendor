'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Search, ShoppingBag, Filter, MoreVertical, CreditCard, ChevronRight, Eye } from 'lucide-react';
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockOrders = [
    { id: '#ORD-9023', customer: 'Sarah J.', vendor: 'TechStore', amount: '$129.00', status: 'Processing', date: '2 mins ago' },
    { id: '#ORD-9024', customer: 'Michael K.', vendor: 'Urban Threads', amount: '$45.50', status: 'Shipped', date: '15 mins ago' },
    { id: '#ORD-9025', customer: 'David L.', vendor: 'NexroLab', amount: '$1,200.00', status: 'Delivered', date: '1 hour ago' },
    { id: '#ORD-9026', customer: 'Emma W.', vendor: 'Urban Threads', amount: '$89.00', status: 'Pending', date: '5 hours ago' },
];

const AdminOrdersPage = () => {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />

            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 border-b bg-white dark:bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
                    <h1 className="text-xl font-bold">Platform Orders</h1>
                    <div className="flex items-center gap-4">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input placeholder="Search orders..." className="pl-10 h-9" />
                        </div>
                        <Button variant="outline" className="rounded-full font-bold px-6">Manage Payouts</Button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {[
                            { label: 'Pending Payouts', value: '$12,400', icon: CreditCard, color: 'text-orange-500' },
                            { label: 'Today Orders', value: '48', icon: ShoppingBag, color: 'text-indigo-500' },
                            { label: 'Platform Fee', value: '$840', icon: CreditCard, color: 'text-emerald-500' },
                            { label: 'Support Tickets', value: '3', icon: Eye, color: 'text-rose-500' },
                        ].map((s, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border flex items-center gap-4 shadow-sm">
                                <div className={`p-3 rounded-xl bg-slate-50 ${s.color}`}>
                                    <s.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest">{s.label}</p>
                                    <p className="text-xl font-bold">{s.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        <div className="p-6 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                            <div className="flex gap-4">
                                <Button variant="outline" size="sm" className="rounded-full gap-2 px-4 font-bold">
                                    <Filter className="h-4 w-4" />
                                    Filter Status
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-full px-4 font-bold">Invoices</Button>
                            </div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Showing Recent Orders</span>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="font-bold">Order ID</TableHead>
                                    <TableHead className="font-bold">Customer</TableHead>
                                    <TableHead className="font-bold">Vendor</TableHead>
                                    <TableHead className="font-bold">Amount</TableHead>
                                    <TableHead className="font-bold">Status</TableHead>
                                    <TableHead className="font-bold text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockOrders.map((order) => (
                                    <TableRow key={order.id} className="hover:bg-slate-50/30 border-slate-100 dark:border-slate-800 transition-colors">
                                        <TableCell className="font-mono text-xs font-bold text-indigo-500">{order.id}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback className="text-[10px] font-bold">{order.customer[0]}</AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm font-medium">{order.customer}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs font-bold py-1 px-2 bg-slate-100 rounded-md">{order.vendor}</span>
                                        </TableCell>
                                        <TableCell className="font-bold text-sm">
                                            {order.amount}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className={`rounded-full px-3 text-[10px] ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                                                    order.status === 'Processing' ? 'bg-indigo-50 text-indigo-600' :
                                                        order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' :
                                                            'bg-orange-50 text-orange-600'
                                                }`}>
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminOrdersPage;
