'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
    Activity, Users, Store, CreditCard, ExternalLink,
    CheckCircle2, XCircle, Clock, MoreHorizontal, Search, Download, TrendingUp, Zap
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
        { id: 'SEC-8821', name: 'Urban Threads', category: 'Luxury Fashion', date: '2h ago', revenue: '$142k', confidence: 98 },
        { id: 'SEC-8822', name: 'Pixel Gadgets', category: 'Electronics', date: '5h ago', revenue: '$85k', confidence: 92 },
        { id: 'SEC-8823', name: 'Organic Roots', category: 'Health', date: '1d ago', revenue: '$12k', confidence: 85 },
    ]);

    const handleApprove = (id: string) => setPendingVendors(prev => prev.filter(v => v.id !== id));
    const handleReject = (id: string) => setPendingVendors(prev => prev.filter(v => v.id !== id));

    const corePulse = [
        { label: 'PLATFORM GMV', value: '$842,500', trend: '+24%', icon: CreditCard, accent: 'indigo' },
        { label: 'ACTIVE VENDORS', value: vendors.length.toString(), trend: '+4%', icon: Store, accent: 'emerald' },
        { label: 'THROUGHPUT', value: '45.2k', trend: '+12%', icon: Activity, accent: 'sky' },
        { label: 'RETENTION', value: '68%', trend: '+2%', icon: Users, accent: 'rose' },
    ];

    const logs = [
        { id: 1, type: 'AUTH', body: 'SuperAdmin login verified from Tokyo node.', time: 'Just now', color: 'bg-indigo-500' },
        { id: 2, type: 'SALE', body: 'Large transaction processed: #TX-9921', time: '4m ago', color: 'bg-emerald-500' },
        { id: 3, type: 'CRIT', body: 'DDoS mitigation active on API endpoint.', time: '12m ago', color: 'bg-rose-500' },
        { id: 4, type: 'SYNC', body: 'Global product index updated - 12k items.', time: '1h ago', color: 'bg-sky-500' },
    ];

    return (
        <AdminLayout
            title="Terminal Architecture"
            headerRight={
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex flex-col items-end">
                        <p className="text-[9px] font-black tracking-widest text-slate-500 uppercase">Gateway Efficiency</p>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-white">99.98%</span>
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                        </div>
                    </div>
                </div>
            }
        >
            <div className="min-h-screen bg-slate-950 p-4 lg:p-12 space-y-12 max-w-[1920px] mx-auto text-slate-300">

                {/* Section 1: Hero Header */}
                <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 border-b border-white/5 pb-10">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-black tracking-[0.25em] uppercase">
                            <Zap className="h-3 w-3 fill-current" /> System Protocol Active
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-white">
                            Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x">Command.</span>
                        </h1>
                        <p className="text-slate-500 font-medium text-lg max-w-2xl leading-relaxed">
                            A unified visual interface for orchestrating global commerce protocols, vendor security auditing, and high-frequency market analysis.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <Button className="h-14 px-10 rounded-3xl bg-white text-slate-950 font-black text-[11px] tracking-widest uppercase hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-2xl shadow-white/5 active:scale-95">
                            Global Export Protocol
                        </Button>
                        <Button variant="outline" className="h-14 w-14 rounded-3xl border-white/5 bg-white/5 text-white p-0 hover:bg-white/10 transition-all">
                            <MoreHorizontal className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Section 2: Core Pulse Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {corePulse.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="bg-slate-900/30 border border-white/5 p-10 rounded-[48px] relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 blur-[80px] rounded-full group-hover:bg-indigo-500/10 transition-colors" />
                            <div className="flex justify-between items-start mb-12 relative z-10">
                                <div className="h-16 w-16 rounded-[24px] bg-slate-950 border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all">
                                    <stat.icon className="h-7 w-7 text-indigo-400" />
                                </div>
                                <Badge className="bg-emerald-500/10 text-emerald-500 border-none font-black text-[9px] tracking-widest uppercase px-3 py-1">
                                    {stat.trend}
                                </Badge>
                            </div>
                            <div className="space-y-1 relative z-10">
                                <p className="text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase mb-2">{stat.label}</p>
                                <h3 className="text-5xl font-black text-white tracking-tighter">{stat.value}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Section 3: Large Data Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Visual Analytics Hub */}
                    <div className="lg:col-span-8 bg-slate-900/30 border border-white/5 rounded-[64px] p-12 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-20 relative z-10">
                            <div>
                                <h4 className="text-2xl font-black text-white tracking-tighter">Velocity Matrix</h4>
                                <p className="text-slate-500 font-medium text-sm">Synthetic monitoring of transactional flows across 12 primary clusters.</p>
                            </div>
                            <div className="flex gap-2">
                                {['Pulse', 'Volume', 'Audit'].map(mode => (
                                    <button key={mode} className={`px-5 py-2 rounded-2xl text-[10px] font-black tracking-widest uppercase transition-all ${mode === 'Volume' ? 'bg-white text-slate-950' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
                                        {mode}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="h-[450px] flex items-end justify-between gap-5 relative z-10 px-4">
                            {[30, 55, 40, 85, 60, 100, 75, 45, 90, 65, 95, 82].map((h, i) => (
                                <div key={i} className="flex-1 group/bar relative h-full flex flex-col justify-end">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ delay: i * 0.05, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                                        className="w-full relative group-hover/bar:bg-indigo-500/20 transition-all rounded-full overflow-hidden"
                                    >
                                        <div className={`w-full h-full rounded-full transition-all duration-700 ${i === 5 ? 'bg-indigo-600 shadow-[0_0_40px_rgba(79,70,229,0.4)]' : 'bg-white/5'}`} />
                                        {i === 5 && (
                                            <motion.div
                                                animate={{ y: [0, -200, 0] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent"
                                            />
                                        )}
                                    </motion.div>
                                    <p className="text-center mt-6 text-[10px] font-black text-slate-600 group-hover/bar:text-white transition-colors tracking-tighter uppercase">
                                        {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][i]}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SysLog Terminal */}
                    <div className="lg:col-span-4 bg-slate-900/30 border border-white/5 rounded-[64px] p-10 flex flex-col relative overflow-hidden">
                        <div className="flex items-center justify-between mb-12">
                            <h4 className="text-[11px] font-black tracking-[0.4em] text-slate-500 uppercase">SysLog.Main</h4>
                            <div className="h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
                        </div>
                        <div className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
                            {logs.map((log) => (
                                <div key={log.id} className="group cursor-default relative pl-6 border-l border-white/5 hover:border-indigo-500/50 transition-all">
                                    <div className={`absolute left-[-3px] top-0 h-1.5 w-1.5 rounded-full ${log.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{log.type}</span>
                                        <span className="text-[9px] font-bold text-slate-600">{log.time}</span>
                                    </div>
                                    <p className="text-[13px] font-bold text-slate-300 group-hover:text-white transition-colors leading-tight">{log.body}</p>
                                </div>
                            ))}
                        </div>
                        <Button className="mt-12 w-full py-8 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 font-black text-[11px] tracking-widest uppercase hover:bg-indigo-600 hover:text-white transition-all">
                            Access Full Terminal
                        </Button>
                    </div>
                </div>

                {/* Section 4: Security Onboarding Section */}
                <div className="space-y-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h4 className="text-3xl font-black text-white tracking-tighter">Priority Audit Queue</h4>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed">Secured validation of high-potential retail clusters.</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Status</p>
                                <p className="text-sm font-black text-emerald-500">CLEAN</p>
                            </div>
                            <div className="h-10 w-[1px] bg-white/10" />
                            <Button className="h-14 px-8 rounded-2xl bg-white/5 border border-white/5 text-white font-black text-[10px] tracking-widest uppercase hover:bg-white/10 transition-all">
                                Protocol History
                            </Button>
                        </div>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 rounded-[64px] overflow-hidden">
                        {pendingVendors.length === 0 ? (
                            <div className="py-32 text-center space-y-6">
                                <CheckCircle2 className="h-16 w-16 text-emerald-500/20 mx-auto" />
                                <h3 className="text-2xl font-black text-slate-600 italic">No manual overrides required.</h3>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-none hover:bg-transparent px-8">
                                            <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] h-24 px-12">Entity.ID</TableHead>
                                            <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Sector</TableHead>
                                            <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Security Depth</TableHead>
                                            <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-right px-12">Protocol Output</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {pendingVendors.map((vendor, vidx) => (
                                            <TableRow key={vendor.id} className="group border-white/5 hover:bg-white/[0.03] transition-colors border-t">
                                                <TableCell className="px-12 py-10">
                                                    <div className="flex items-center gap-8">
                                                        <div className="h-20 w-20 rounded-[32px] bg-slate-950 border border-white/5 flex items-center justify-center text-2xl font-black text-white group-hover:border-indigo-500/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all">
                                                            {vendor.name[0]}
                                                        </div>
                                                        <div className="space-y-2">
                                                            <p className="font-black text-2xl text-white tracking-tighter leading-none">{vendor.name}</p>
                                                            <p className="text-[11px] font-bold text-slate-500 italic uppercase tracking-wider">{vendor.id} · Received {vendor.date}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className="rounded-xl font-black text-[10px] uppercase tracking-widest px-4 py-2 bg-white/5 text-slate-400 border border-white/10">{vendor.category}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-4 max-w-[220px]">
                                                        <div className="flex justify-between items-center text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                                                            <span>Confidence</span>
                                                            <span>{vendor.confidence}%</span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden p-[1px]">
                                                            <motion.div initial={{ width: 0 }} animate={{ width: `${vendor.confidence}%` }} transition={{ delay: 0.5 + (vidx * 0.1), duration: 2, ease: "circOut" }} className="h-full bg-indigo-500 rounded-full shadow-[0_0_15px_#6366f1]" />
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right px-12">
                                                    <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-all translate-x-10 group-hover:translate-x-0">
                                                        <Button variant="ghost" onClick={() => handleReject(vendor.id)} className="h-14 px-8 rounded-2xl border border-rose-500/20 text-rose-500 font-black text-[11px] tracking-widest uppercase hover:bg-rose-500 hover:text-white transition-all active:scale-95">
                                                            Reject Protocol
                                                        </Button>
                                                        <Button onClick={() => handleApprove(vendor.id)} className="h-14 px-10 rounded-2xl bg-indigo-600 text-white font-black text-[11px] tracking-widest uppercase hover:bg-indigo-500 hover:shadow-2xl hover:shadow-indigo-600/40 transition-all active:scale-95">
                                                            Grant Clearance
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
