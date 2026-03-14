'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Search, ShoppingBag, Store, Filter, MoreVertical, Plus, ExternalLink, Star } from 'lucide-react';
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
import { mockProducts } from '@/lib/api/mockData';

const AdminProductsPage = () => {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />

            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 border-b bg-white dark:bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
                    <h1 className="text-xl font-bold">Catalog Management</h1>
                    <div className="flex items-center gap-4">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input placeholder="Search catalog..." className="pl-10 h-9" />
                        </div>
                        <Button className="rounded-full bg-indigo-600 font-bold px-6 gap-2">
                            <Plus className="h-4 w-4" />
                            Create Product
                        </Button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        <div className="p-6 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                            <div className="flex gap-4">
                                <Button variant="outline" size="sm" className="rounded-full gap-2 px-4 font-bold">
                                    <Filter className="h-4 w-4" />
                                    Filter Categories
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-full px-4 font-bold">Bulk Actions</Button>
                            </div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Items: {mockProducts.length}</span>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                                    <TableHead className="font-bold">Product Information</TableHead>
                                    <TableHead className="font-bold">Vendor</TableHead>
                                    <TableHead className="font-bold">Price</TableHead>
                                    <TableHead className="font-bold">Stock</TableHead>
                                    <TableHead className="font-bold">Rating</TableHead>
                                    <TableHead className="font-bold text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockProducts.map((product) => (
                                    <TableRow key={product.id} className="hover:bg-slate-50/30 border-slate-100 dark:border-slate-800">
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <div className="h-14 w-14 rounded-xl border border-slate-100 bg-white overflow-hidden shadow-sm flex-shrink-0">
                                                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-sm truncate max-w-[200px]">{product.name}</p>
                                                    <p className="text-[10px] uppercase font-bold text-indigo-500 tracking-wider font-mono">{product.category}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Store className="h-3.5 w-3.5 text-slate-400" />
                                                <span className="text-xs font-bold text-slate-700">{product.vendorName}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-mono font-bold text-sm">
                                            ${product.price}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className={`rounded-full px-3 text-[10px] ${product.stock < 10 ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-slate-50 text-slate-500'}`}>
                                                {product.stock} in stock
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 text-amber-500">
                                                <Star className="h-3 w-3 fill-current" />
                                                <span className="text-xs font-bold">{product.rating}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><ExternalLink className="h-4 w-4" /></Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><MoreVertical className="h-4 w-4" /></Button>
                                            </div>
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

export default AdminProductsPage;
