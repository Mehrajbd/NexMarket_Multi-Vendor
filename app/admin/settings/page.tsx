'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Globe, Shield, CreditCard, Database, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const AdminSettingsPage = () => {
    const [saved, setSaved] = useState(false);
    const [formData, setFormData] = useState({
        marketplaceName: 'NexusMarket',
        supportEmail: 'ops@nexusmarket.com',
        baseCommission: '5',
        forceKYC: true,
        autoPayouts: false,
    });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <AdminLayout title="System Settings" headerRight={
            <Button onClick={handleSave} size="sm" className={`rounded-full font-bold h-8 gap-1.5 px-4 md:px-6 shadow-lg transition-colors ${saved ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20'}`}>
                <Save className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{saved ? 'Saved!' : 'Save Changes'}</span>
            </Button>
        }>
            <div className="p-4 md:p-6">
                <div className="max-w-3xl mx-auto space-y-6">
                    {/* Platform Identity */}
                    <section>
                        <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                            <Globe className="h-4 w-4" /> Platform Identity
                        </h2>
                        <div className="grid gap-5 p-5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="font-bold text-xs uppercase text-slate-500">Marketplace Name</Label>
                                    <Input value={formData.marketplaceName} onChange={e => setFormData(p => ({ ...p, marketplaceName: e.target.value }))} className="bg-slate-50 dark:bg-slate-800" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-xs uppercase text-slate-500">Support Email</Label>
                                    <Input value={formData.supportEmail} onChange={e => setFormData(p => ({ ...p, supportEmail: e.target.value }))} className="bg-slate-50 dark:bg-slate-800" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Platform Fees */}
                    <section>
                        <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                            <CreditCard className="h-4 w-4" /> Platform Fees
                        </h2>
                        <div className="gap-5 p-5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <p className="font-bold text-sm">Base Commission</p>
                                    <p className="text-xs text-slate-500 font-medium">Fee taken from every transaction</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Input type="number" value={formData.baseCommission} onChange={e => setFormData(p => ({ ...p, baseCommission: e.target.value }))} className="text-right font-bold bg-slate-50 dark:bg-slate-800 w-24" />
                                    <span className="text-sm font-bold text-slate-500">%</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Vendor Verification */}
                    <section>
                        <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                            <Shield className="h-4 w-4" /> Vendor Verification
                        </h2>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                            <div className="flex items-center justify-between p-5">
                                <div>
                                    <p className="font-bold text-sm">Force Identity Check</p>
                                    <p className="text-xs text-slate-500 font-medium">Require KYC before vendors can list products</p>
                                </div>
                                <Switch checked={formData.forceKYC} onCheckedChange={v => setFormData(p => ({ ...p, forceKYC: v }))} />
                            </div>
                            <div className="flex items-center justify-between p-5">
                                <div>
                                    <p className="font-bold text-sm">Automatic Payouts</p>
                                    <p className="text-xs text-slate-500 font-medium">Release funds to vendors instantly after delivery</p>
                                </div>
                                <Switch checked={formData.autoPayouts} onCheckedChange={v => setFormData(p => ({ ...p, autoPayouts: v }))} />
                            </div>
                        </div>
                    </section>

                    {/* Maintenance */}
                    <section>
                        <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                            <Database className="h-4 w-4" /> System Maintenance
                        </h2>
                        <div className="p-5 bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/50 rounded-2xl">
                            <p className="text-sm font-bold text-orange-900 dark:text-orange-300 mb-1">Platform Maintenance Mode</p>
                            <p className="text-xs text-orange-700 dark:text-orange-400 mb-4">When active, only admins access the platform. Buyers & sellers see a maintenance message.</p>
                            <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-100 dark:border-orange-700 dark:text-orange-400 dark:hover:bg-orange-900/30 font-bold text-xs uppercase tracking-widest">
                                Activate Maintenance Mode
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminSettingsPage;
