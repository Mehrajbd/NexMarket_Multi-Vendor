'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Search, ShoppingBag, Store, Filter, MoreVertical, Plus, ExternalLink, Star, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProductStore } from '@/store/useProductStore';
import { useCategoryStore } from '@/store/useCategoryStore';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';

const AdminProductsPage = () => {
    const { products, addProduct, removeProduct } = useProductStore();
    const { categories } = useCategoryStore();
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // New Product Form State
    const [newName, setNewName] = useState('');
    const [newCategory, setNewCategory] = useState(categories[0]?.name || '');
    const [newPrice, setNewPrice] = useState('');
    const [newStock, setNewStock] = useState('');

    const handleAddProduct = () => {
        if (!newName || !newPrice) return;
        addProduct({
            name: newName,
            category: newCategory,
            price: Number(newPrice),
            stock: Number(newStock) || 0,
            images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'],
            description: 'New product added via admin portal.',
            rating: 5.0,
            reviewsCount: 0,
            isFeatured: false,
            vendorId: 'v1',
            vendorName: 'Admin Panel'
        });
        setNewName('');
        setNewPrice('');
        setNewStock('');
        setIsOpen(false);
    };

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout title="Catalog Management" headerRight={
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button size="sm" className="rounded-full bg-indigo-600 font-bold h-8 gap-1.5 px-3 md:px-5">
                        <Plus className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Add Product</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-slate-900 border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription className="text-slate-400">List a new item in the marketplace catalog.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Product Name</Label>
                            <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Premium Watch" className="bg-slate-800 border-white/10" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Price ($)</Label>
                                <Input type="number" value={newPrice} onChange={e => setNewPrice(e.target.value)} placeholder="199" className="bg-slate-800 border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <Label>Stock</Label>
                                <Input type="number" value={newStock} onChange={e => setNewStock(e.target.value)} placeholder="100" className="bg-slate-800 border-white/10" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <select
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                className="w-full h-10 px-3 rounded-md bg-slate-800 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsOpen(false)} className="text-slate-400">Cancel</Button>
                        <Button onClick={handleAddProduct} className="bg-indigo-600 hover:bg-indigo-700">Add to Catalog</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        }>
            <div className="p-4 md:p-6 space-y-5">
                {/* Toolbar */}
                <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-4 border-b dark:border-slate-800 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <div className="relative flex-1 sm:w-56">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input placeholder="Search catalog..." className="pl-9 h-9 bg-slate-50 dark:bg-slate-800" value={search} onChange={e => setSearch(e.target.value)} />
                            </div>
                            <Button variant="outline" size="sm" className="rounded-full h-9 px-3 gap-1. flex-shrink-0">
                                <Filter className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">Filter</span>
                            </Button>
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{filtered.length} items</span>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden divide-y dark:divide-slate-800">
                        {filtered.slice(0, 8).map(product => (
                            <div key={product.id} className="p-4 flex items-center gap-3">
                                <div className="h-14 w-14 rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden flex-shrink-0">
                                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-sm truncate">{product.name}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[10px] uppercase font-bold text-indigo-500 tracking-wide">{product.category}</span>
                                        <span className="text-xs font-mono font-bold">${product.price}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex items-center gap-0.5 text-amber-400">
                                            <Star className="h-3 w-3 fill-current" />
                                            <span className="text-[10px] font-bold">{product.rating}</span>
                                        </div>
                                        <Badge variant="secondary" className={`text-[9px] ${product.stock < 10 ? 'bg-orange-50 text-orange-600' : 'bg-slate-50 text-slate-500'}`}>{product.stock} left</Badge>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full flex-shrink-0">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                                    <TableHead className="font-bold">Product</TableHead>
                                    <TableHead className="font-bold">Vendor</TableHead>
                                    <TableHead className="font-bold">Price</TableHead>
                                    <TableHead className="font-bold">Stock</TableHead>
                                    <TableHead className="font-bold">Rating</TableHead>
                                    <TableHead className="font-bold text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map((product) => (
                                    <TableRow key={product.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/30 border-slate-100 dark:border-slate-800">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 rounded-xl border border-slate-100 dark:border-slate-700 bg-white overflow-hidden shadow-sm flex-shrink-0">
                                                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm truncate max-w-[200px]">{product.name}</p>
                                                    <p className="text-[10px] uppercase font-bold text-indigo-500 tracking-wider">{product.category}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2"><Store className="h-3.5 w-3.5 text-slate-400" /><span className="text-xs font-bold">{product.vendorName}</span></div>
                                        </TableCell>
                                        <TableCell className="font-mono font-bold text-sm">${product.price}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className={`rounded-full px-3 text-[10px] ${product.stock < 10 ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-slate-50 text-slate-500'}`}>
                                                {product.stock} in stock
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 text-amber-400">
                                                <Star className="h-3 w-3 fill-current" />
                                                <span className="text-xs font-bold">{product.rating}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-slate-100"><ExternalLink className="h-4 w-4" /></Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminProductsPage;
