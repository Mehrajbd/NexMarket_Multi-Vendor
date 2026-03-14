'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Settings, Shield, Bell, CreditCard, Globe, Database, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const AdminSettingsPage = () => {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />

            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 border-b bg-white dark:bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
                    <h1 className="text-xl font-bold">System Settings</h1>
                    <Button className="rounded-full bg-indigo-600 font-bold px-8 gap-2 shadow-lg shadow-indigo-600/20">
                        <Save className="h-4 w-4" />
                        Save Changes
                    </Button>
                </header>

                <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full">
                    <div className="space-y-8">
                        {/* Platform Branding */}
                        <section>
                            <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                Platform Identity
                            </h2>
                            <div className="grid gap-6 p-6 bg-white border rounded-2xl shadow-sm">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="font-bold text-xs uppercase text-slate-500">Marketplace Name</Label>
                                        <Input defaultValue="NexusMarket" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-bold text-xs uppercase text-slate-500">Support Email</Label>
                                        <Input defaultValue="ops@nexusmarket.com" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Financials */}
                        <section>
                            <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                <CreditCard className="h-4 w-4" />
                                Platform Fees
                            </h2>
                            <div className="grid gap-6 p-6 bg-white border rounded-2xl shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-sm">Base Commission</p>
                                        <p className="text-xs text-slate-500 font-medium">Fee taken from every transaction</p>
                                    </div>
                                    <div className="w-32">
                                        <Input type="number" defaultValue="5" className="text-right font-bold" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Security */}
                        <section>
                            <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Vendor Verification
                            </h2>
                            <div className="grid gap-6 p-6 bg-white border rounded-2xl shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-sm">Force Identity Check</p>
                                        <p className="text-xs text-slate-500 font-medium">Require KYC before vendors can list products</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t">
                                    <div>
                                        <p className="font-bold text-sm">Automatic Payouts</p>
                                        <p className="text-xs text-slate-500 font-medium">Release funds to vendors instantly after delivery</p>
                                    </div>
                                    <Switch />
                                </div>
                            </div>
                        </section>

                        {/* Advanced */}
                        <section>
                            <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                <Database className="h-4 w-4" />
                                System Maintenance
                            </h2>
                            <div className="p-6 bg-orange-50 border border-orange-100 rounded-2xl">
                                <p className="text-sm font-bold text-orange-900 mb-2">Platform Maintenance Mode</p>
                                <p className="text-xs text-orange-700 mb-4">When active, only admins can access the platform. Buyers and sellers will see a maintenance message.</p>
                                <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-100 font-bold text-xs uppercase tracking-widest">Activate Now</Button>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminSettingsPage;
