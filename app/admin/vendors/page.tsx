'use client';

import React, { useState, useMemo } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import VendorDialog from '@/components/admin/VendorDialog';
import { Search, ShieldCheck, Edit, Trash2, Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { useVendorStore } from '@/store/useVendorStore';
import { Vendor } from '@/types';

const AdminVendorsPage = () => {
    const { vendors, addVendor, updateVendor, deleteVendor } = useVendorStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
    const [filterVerified, setFilterVerified] = useState(false);

    const filteredVendors = useMemo(() => {
        return vendors.filter(v => {
            const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                v.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = filterVerified ? v.isVerified : true;
            return matchesSearch && matchesFilter;
        });
    }, [vendors, searchQuery, filterVerified]);

    const handleAddVendor = () => { setEditingVendor(null); setIsDialogOpen(true); };
    const handleEditVendor = (vendor: Vendor) => { setEditingVendor(vendor); setIsDialogOpen(true); };
    const handleDeleteVendor = (id: string) => {
        if (confirm('Are you sure you want to delete this vendor?')) { deleteVendor(id); }
    };
    const handleSaveVendor = (vendorData: Partial<Vendor>) => {
        if (editingVendor) {
            updateVendor(editingVendor.id, vendorData);
        } else {
            addVendor({
                id: `v-${Math.random().toString(36).substr(2, 9)}`,
                name: vendorData.name || '',
                description: vendorData.description || '',
                logo: vendorData.logo || '',
                rating: vendorData.rating || 0,
                totalSales: vendorData.totalSales || 0,
                isVerified: vendorData.isVerified || false,
            });
        }
    };

    return (
        <AdminLayout
            title="Vendor Management"
            headerRight={
                <Button size="sm" onClick={handleAddVendor} className="rounded-full bg-indigo-600 hover:bg-indigo-700 font-bold gap-1.5 h-8 px-3 md:px-5">
                    <Plus className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Add Vendor</span>
                </Button>
            }
        >
            <div className="p-4 md:p-6">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-5 p-4 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-none sm:w-56">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input placeholder="Search vendors..." className="pl-9 h-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setFilterVerified(!filterVerified)}
                            className={`rounded-full gap-1.5 h-9 px-3 font-bold flex-shrink-0 ${filterVerified ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' : ''}`}>
                            <ShieldCheck className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">{filterVerified ? 'Verified' : 'All'}</span>
                        </Button>
                    </div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* Mobile Card List */}
                <div className="md:hidden space-y-3">
                    {filteredVendors.map(vendor => (
                        <div key={vendor.id} className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-12 w-12 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 overflow-hidden flex-shrink-0">
                                    <img src={vendor.logo} alt={vendor.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <p className="font-bold truncate">{vendor.name}</p>
                                        {vendor.isVerified && <ShieldCheck className="h-3.5 w-3.5 text-indigo-500 flex-shrink-0" />}
                                    </div>
                                    <p className="text-xs text-slate-500 truncate">{vendor.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Badge className="bg-emerald-500/10 text-emerald-600 border-none rounded-full text-[10px] font-bold">Active</Badge>
                                    <span className="text-xs font-mono font-bold text-slate-500">{vendor.totalSales.toLocaleString()} sales</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/20" onClick={() => handleEditVendor(vendor)}>
                                        <Edit className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20" onClick={() => handleDeleteVendor(vendor.id)}>
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredVendors.length === 0 && (
                        <div className="py-16 text-center text-muted-foreground">No vendors found.</div>
                    )}
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                                <TableHead className="font-bold">Store Name</TableHead>
                                <TableHead className="font-bold">Status</TableHead>
                                <TableHead className="font-bold">Rating</TableHead>
                                <TableHead className="font-bold">Total Sales</TableHead>
                                <TableHead className="font-bold text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredVendors.map((vendor) => (
                                <TableRow key={vendor.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/30 border-slate-100 dark:border-slate-800 transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <div className="h-11 w-11 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 overflow-hidden shadow-sm flex-shrink-0">
                                                <img src={vendor.logo} alt={vendor.name} className="h-full w-full object-cover" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold text-slate-900 dark:text-slate-100 truncate">{vendor.name}</p>
                                                    {vendor.isVerified && <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />}
                                                </div>
                                                <p className="text-xs text-slate-500 truncate max-w-[280px]">{vendor.description}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-none rounded-full px-3 py-0.5 text-[10px] font-bold">Active</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-amber-500">
                                            <Star className="h-3 w-3 fill-current" />
                                            <span className="text-xs font-bold">{vendor.rating}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-mono font-bold text-sm">{vendor.totalSales.toLocaleString()}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/20" onClick={() => handleEditVendor(vendor)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20" onClick={() => handleDeleteVendor(vendor.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {filteredVendors.length === 0 && (
                        <div className="py-16 text-center"><p className="text-muted-foreground">No vendors found matching your search.</p></div>
                    )}
                </div>
            </div>

            <VendorDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} vendor={editingVendor} onSave={handleSaveVendor} />
        </AdminLayout>
    );
};

export default AdminVendorsPage;
