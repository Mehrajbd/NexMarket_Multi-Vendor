'use client';

import React, { useState, useMemo } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import VendorDialog from '@/components/admin/VendorDialog';
import { Search, Filter, ExternalLink, ShieldCheck, MoreVertical, Edit, Trash2, Plus } from 'lucide-react';
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

    const handleAddVendor = () => {
        setEditingVendor(null);
        setIsDialogOpen(true);
    };

    const handleEditVendor = (vendor: Vendor) => {
        setEditingVendor(vendor);
        setIsDialogOpen(true);
    };

    const handleDeleteVendor = (id: string) => {
        if (confirm('Are you sure you want to delete this vendor? This will also remove their products.')) {
            deleteVendor(id);
        }
    };

    const handleSaveVendor = (vendorData: Partial<Vendor>) => {
        if (editingVendor) {
            // Update
            updateVendor(editingVendor.id, vendorData);
        } else {
            // Create
            const newVendor: Vendor = {
                id: `v-${Math.random().toString(36).substr(2, 9)}`,
                name: vendorData.name || '',
                description: vendorData.description || '',
                logo: vendorData.logo || '',
                rating: vendorData.rating || 0,
                totalSales: vendorData.totalSales || 0,
                isVerified: vendorData.isVerified || false,
            };
            addVendor(newVendor);
        }
    };

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />

            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 border-b bg-white dark:bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
                    <h1 className="text-xl font-bold">Vendor Management</h1>
                    <div className="flex items-center gap-4">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search vendors..."
                                className="pl-10 h-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button
                            onClick={handleAddVendor}
                            className="rounded-full bg-indigo-600 hover:bg-indigo-700 font-bold px-6 gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Add Vendor
                        </Button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        <div className="p-6 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                            <div className="flex gap-4">
                                <Button
                                    variant={filterVerified ? "secondary" : "outline"}
                                    size="sm"
                                    onClick={() => setFilterVerified(!filterVerified)}
                                    className={`rounded-full gap-2 px-4 font-bold ${filterVerified ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' : ''}`}
                                >
                                    <ShieldCheck className="h-4 w-4" />
                                    {filterVerified ? "Verified Only" : "All Vendors"}
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-full px-4 font-bold">Export CSV</Button>
                            </div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                Showing {filteredVendors.length} vendors
                            </span>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                                    <TableHead className="font-bold">Store Name</TableHead>
                                    <TableHead className="font-bold">Status</TableHead>
                                    <TableHead className="font-bold">Total Sales</TableHead>
                                    <TableHead className="font-bold text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredVendors.map((vendor) => (
                                    <TableRow key={vendor.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/30 border-slate-100 dark:border-slate-800 transition-colors">
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 overflow-hidden shadow-sm flex-shrink-0">
                                                    <img
                                                        src={vendor.logo}
                                                        alt={vendor.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-bold text-slate-900 dark:text-slate-100 truncate">{vendor.name}</p>
                                                        {vendor.isVerified && <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />}
                                                    </div>
                                                    <p className="text-xs text-slate-500 truncate max-w-[300px]">{vendor.description}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-none rounded-full px-3 py-0.5 text-[10px] font-bold">
                                                Active
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-mono font-bold text-sm">
                                            {vendor.totalSales.toLocaleString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                                                    onClick={() => window.open(vendor.logo, '_blank')}
                                                >
                                                    <ExternalLink className="h-4 w-4 text-slate-500" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-full hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/20"
                                                    onClick={() => handleEditVendor(vendor)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                                                    onClick={() => handleDeleteVendor(vendor.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {filteredVendors.length === 0 && (
                            <div className="py-20 text-center">
                                <p className="text-muted-foreground">No vendors found matching your search.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <VendorDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                vendor={editingVendor}
                onSave={handleSaveVendor}
            />
        </div>
    );
};

export default AdminVendorsPage;
