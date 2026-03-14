'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Search, UserPlus, MoreVertical, ShieldOff, ShieldCheck as ShieldCheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type UserStatus = 'Active' | 'Disabled';

interface UserRecord {
    id: string;
    name: string;
    email: string;
    role: 'Customer' | 'Vendor';
    status: UserStatus;
    joined: string;
}

const AdminUsersPage = () => {
    const [users, setUsers] = useState<UserRecord[]>([
        { id: 'U-101', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Customer', status: 'Active', joined: 'Oct 12, 2023' },
        { id: 'U-102', name: 'Alex Rivera', email: 'alex@work.com', role: 'Vendor', status: 'Active', joined: 'Nov 05, 2023' },
        { id: 'U-103', name: 'Michael Chen', email: 'mike@chen.io', role: 'Customer', status: 'Disabled', joined: 'Jan 20, 2024' },
        { id: 'U-104', name: 'Emma Wilson', email: 'emma.w@gmail.com', role: 'Vendor', status: 'Active', joined: 'Feb 14, 2024' },
    ]);
    const [search, setSearch] = useState('');

    const toggleStatus = (id: string) => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Disabled' : 'Active' } : u));
    };

    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout title="User Management" headerRight={
            <Button size="sm" className="rounded-full bg-indigo-600 font-bold h-8 gap-1.5 px-3 md:px-5">
                <UserPlus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Add User</span>
            </Button>
        }>
            <div className="p-4 md:p-6 space-y-5">
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { label: 'Total Users', value: users.length, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/20' },
                        { label: 'Active', value: users.filter(u => u.status === 'Active').length, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
                        { label: 'Vendors', value: users.filter(u => u.role === 'Vendor').length, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/20' },
                        { label: 'Suspended', value: users.filter(u => u.status === 'Disabled').length, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/20' },
                    ].map((s, i) => (
                        <div key={i} className={`${s.bg} p-4 rounded-2xl border border-transparent shadow-sm`}>
                            <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest mb-1">{s.label}</p>
                            <p className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-4 border-b dark:border-slate-800 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input placeholder="Search users..." className="pl-9 h-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{filtered.length} users</span>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden divide-y dark:divide-slate-800">
                        {filtered.map(user => (
                            <div key={user.id} className="p-4 flex items-center gap-3">
                                <Avatar className="h-10 w-10 flex-shrink-0">
                                    <AvatarFallback className="bg-indigo-50 text-indigo-600 font-bold">{user.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-sm truncate">{user.name}</p>
                                        <Badge variant="outline" className={`rounded-full px-2 text-[9px] font-bold flex-shrink-0 ${user.role === 'Vendor' ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-slate-50 text-slate-600'}`}>{user.role}</Badge>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`h-8 w-8 flex-shrink-0 ${user.status === 'Active' ? 'text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600' : 'text-rose-400 hover:bg-rose-50 hover:text-rose-600'}`}
                                    onClick={() => toggleStatus(user.id)}
                                >
                                    {user.status === 'Active' ? <ShieldCheckIcon className="h-4 w-4" /> : <ShieldOff className="h-4 w-4" />}
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent bg-slate-50/30 dark:bg-slate-800/30">
                                    <TableHead className="font-bold">User</TableHead>
                                    <TableHead className="font-bold">Role</TableHead>
                                    <TableHead className="font-bold">Joined</TableHead>
                                    <TableHead className="font-bold">Status</TableHead>
                                    <TableHead className="font-bold text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map((user) => (
                                    <TableRow key={user.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/30 transition-colors border-slate-100 dark:border-slate-800">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 border-2 border-slate-100">
                                                    <AvatarFallback className="bg-indigo-50 text-indigo-600 font-bold">{user.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-bold text-sm">{user.name}</p>
                                                    <p className="text-xs text-slate-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={`rounded-full px-3 ${user.role === 'Vendor' ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-slate-50 text-slate-600'}`}>{user.role}</Badge>
                                        </TableCell>
                                        <TableCell className="text-xs font-medium text-slate-500">{user.joined}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5">
                                                <div className={`h-2 w-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                                <span className="text-xs font-bold">{user.status}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => toggleStatus(user.id)}
                                                    className={`h-8 rounded-full font-bold text-xs px-3 ${user.status === 'Active' ? 'border-rose-200 text-rose-600 hover:bg-rose-50' : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'}`}
                                                >
                                                    {user.status === 'Active' ? 'Suspend' : 'Activate'}
                                                </Button>
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

export default AdminUsersPage;
