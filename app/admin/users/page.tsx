'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Search, ShieldCheck, Mail, Calendar, MoreVertical, UserPlus, Filter } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockUsers = [
    { id: 'U-101', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Customer', status: 'Active', joined: 'Oct 12, 2023' },
    { id: 'U-102', name: 'Alex Rivera', email: 'alex@work.com', role: 'Vendor', status: 'Active', joined: 'Nov 05, 2023' },
    { id: 'U-103', name: 'Michael Chen', email: 'mike@chen.io', role: 'Customer', status: 'Disabled', joined: 'Jan 20, 2024' },
    { id: 'U-104', name: 'Emma Wilson', email: 'emma.w@gmail.com', role: 'Vendor', status: 'Active', joined: 'Feb 14, 2024' },
];

const AdminUsersPage = () => {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />

            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 border-b bg-white dark:bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
                    <h1 className="text-xl font-bold">User Management</h1>
                    <div className="flex items-center gap-4">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input placeholder="Search users..." className="pl-10 h-9" />
                        </div>
                        <Button className="rounded-full bg-indigo-600 font-bold px-6 gap-2">
                            <UserPlus className="h-4 w-4" />
                            Add User
                        </Button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        <div className="p-6 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                            <div className="flex gap-4">
                                <Button variant="outline" size="sm" className="rounded-full gap-2 px-4 font-bold">
                                    <Filter className="h-4 w-4" />
                                    Filter Roles
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-full px-4 font-bold">Export</Button>
                            </div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Users: {mockUsers.length}</span>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent bg-slate-50/20">
                                    <TableHead className="font-bold">User</TableHead>
                                    <TableHead className="font-bold">Role</TableHead>
                                    <TableHead className="font-bold">Joined Path</TableHead>
                                    <TableHead className="font-bold">Status</TableHead>
                                    <TableHead className="font-bold text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockUsers.map((user) => (
                                    <TableRow key={user.id} className="hover:bg-slate-50/30 transition-colors border-slate-100 dark:border-slate-800">
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
                                            <Badge variant="outline" className={`rounded-full px-3 ${user.role === 'Vendor' ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-slate-50 text-slate-600'}`}>
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-xs font-medium text-slate-500">
                                            {user.joined}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5">
                                                <div className={`h-2 w-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                                <span className="text-xs font-bold">{user.status}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="rounded-full">
                                                <MoreVertical className="h-4 w-4" />
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

export default AdminUsersPage;
