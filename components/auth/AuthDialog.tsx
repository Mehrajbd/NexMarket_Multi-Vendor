'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chrome, Mail, Lock, User, Github, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

const AuthDialog = ({ open, onOpenChange, onSuccess }: AuthDialogProps) => {
    const login = useAuthStore((state) => state.login);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('login');

    const handleSocialLogin = (platform: string) => {
        setIsLoading(true);
        setTimeout(() => {
            login({
                id: 'u1',
                name: 'Mahmudur Rashid',
                email: 'meraj@example.com',
                image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
            });
            setIsLoading(false);
            onOpenChange(false);
            onSuccess?.();
        }, 1500);
    };

    const handleEmailAuth = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            login({
                id: 'u1',
                name: 'Mahmudur Rashid',
                email: 'meraj@example.com',
            });
            setIsLoading(false);
            onOpenChange(false);
            onSuccess?.();
        }, 1500);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[95vw] lg:max-w-[1000px] w-full !p-0 overflow-hidden border-none shadow-3xl bg-white dark:bg-slate-950 sm:rounded-[32px] max-h-[98vh] flex flex-col">
                <div className="flex flex-col md:flex-row h-full overflow-y-auto overflow-x-hidden">
                    {/* Left Side: Branding & Info (Hidden on mobile) */}
                    <div className="hidden md:flex md:w-[400px] bg-indigo-600 relative overflow-hidden p-12 flex-col justify-between text-white">
                        <div className="relative z-10">
                            <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 border border-white/30">
                                <span className="text-2xl font-black">N</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-black leading-tight mb-4">
                                Experience <br />
                                <span className="text-indigo-200">the Future</span> <br />
                                of Commerce.
                            </h2>
                            <p className="text-indigo-100/80 text-lg">Join 50,000+ users trading on the world's most secure marketplace.</p>
                        </div>

                        <div className="relative z-10 space-y-6">
                            {[
                                { icon: ShieldCheck, text: 'Bank-grade security protocols' },
                                { icon: Zap, text: 'Instant worldwide transactions' },
                                { icon: Globe, text: 'Network of 5,000+ verified vendors' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 group cursor-default">
                                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-indigo-600 transition-all duration-300">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <span className="font-bold text-sm tracking-wide">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Animated Background Elements */}
                        <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-white opacity-10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-[-20%] left-[-20%] w-[400px] h-[400px] bg-indigo-400 opacity-20 rounded-full blur-[120px]" />
                    </div>

                    {/* Right Side: Auth Forms */}
                    <div className="flex-1 p-6 md:p-10 lg:p-12 flex flex-col justify-center bg-white dark:bg-slate-950">
                        <div className="max-w-[480px] mx-auto w-full">
                            <div className="mb-10">
                                <h3 className="text-3xl font-black tracking-tighter mb-2">
                                    {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
                                </h3>
                                <p className="text-slate-500 font-medium">
                                    {activeTab === 'login'
                                        ? 'Enter your credentials to access your portal.'
                                        : 'Start your journey with us today.'}
                                </p>
                            </div>

                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="flex w-full mb-10 bg-slate-50 dark:bg-slate-900 rounded-2xl h-14 p-1.5 border border-slate-100 dark:border-slate-800">
                                    <TabsTrigger value="login" className="flex-1 rounded-xl font-bold text-sm data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-xl transition-all duration-300 capitalize">Login</TabsTrigger>
                                    <TabsTrigger value="register" className="flex-1 rounded-xl font-bold text-sm data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-xl transition-all duration-300 capitalize">Register</TabsTrigger>
                                </TabsList>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-full"
                                    >
                                        <TabsContent value="login" className="mt-0 space-y-6 w-full">
                                            <form onSubmit={handleEmailAuth} className="space-y-5">
                                                <div className="space-y-2">
                                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email</Label>
                                                    <div className="relative group">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                                                        <Input placeholder="name@company.com" className="pl-11 h-11 bg-slate-50 border-slate-100 dark:bg-slate-900 dark:border-slate-800 rounded-xl focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-sm" required />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center ml-1">
                                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</Label>
                                                        <button type="button" className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 underline underline-offset-4">Reset Password?</button>
                                                    </div>
                                                    <div className="relative group">
                                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                                                        <Input type="password" placeholder="••••••••••••" className="pl-11 h-11 bg-slate-50 border-slate-100 dark:bg-slate-900 dark:border-slate-800 rounded-xl focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-sm" required />
                                                    </div>
                                                </div>
                                                <Button type="submit" disabled={isLoading} className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-xl shadow-indigo-600/20 text-sm group">
                                                    {isLoading ? 'Authenticating...' : (
                                                        <span className="flex items-center gap-2">
                                                            Log In <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                        </span>
                                                    )}
                                                </Button>
                                            </form>
                                        </TabsContent>

                                        <TabsContent value="register" className="mt-0 space-y-6 w-full">
                                            <form onSubmit={handleEmailAuth} className="space-y-5">
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
                                                    <div className="relative group">
                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                                                        <Input placeholder="John Doe" className="pl-11 h-11 bg-slate-50 border-slate-100 dark:bg-slate-900 dark:border-slate-800 rounded-xl focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-sm" required />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Work Email</Label>
                                                    <div className="relative group">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                                                        <Input placeholder="name@company.com" className="pl-11 h-11 bg-slate-50 border-slate-100 dark:bg-slate-900 dark:border-slate-800 rounded-xl focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-sm" required />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Create Password</Label>
                                                    <div className="relative group">
                                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                                                        <Input type="password" placeholder="Min. 8 characters" className="pl-11 h-11 bg-slate-50 border-slate-100 dark:bg-slate-900 dark:border-slate-800 rounded-xl focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-sm" required />
                                                    </div>
                                                </div>
                                                <Button type="submit" disabled={isLoading} className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-xl shadow-indigo-600/20 text-sm group">
                                                    {isLoading ? 'Creating Account...' : (
                                                        <span className="flex items-center gap-2">
                                                            Join Nexus <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                        </span>
                                                    )}
                                                </Button>
                                            </form>
                                        </TabsContent>
                                    </motion.div>
                                </AnimatePresence>
                            </Tabs>

                            <div className="relative my-10">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-slate-100 dark:border-slate-800" />
                                </div>
                                <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.2em] text-slate-400">
                                    <span className="bg-white dark:bg-slate-950 px-4">Instant Access</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    variant="outline"
                                    disabled={isLoading}
                                    onClick={() => handleSocialLogin('google')}
                                    className="h-11 rounded-xl border-slate-100 dark:border-slate-800 font-bold gap-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-xs shadow-sm"
                                >
                                    <Chrome className="h-4 w-4 text-red-500" />
                                    Google
                                </Button>
                                <Button
                                    variant="outline"
                                    disabled={isLoading}
                                    onClick={() => handleSocialLogin('github')}
                                    className="h-11 rounded-xl border-slate-100 dark:border-slate-800 font-bold gap-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-xs shadow-sm"
                                >
                                    <Github className="h-4 w-4" />
                                    GitHub
                                </Button>
                            </div>

                            <p className="mt-10 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-loose">
                                By proceeding, you confirm your agreement with our <br />
                                <span className="text-indigo-600 cursor-pointer hover:underline underline-offset-2">Terms of Data Protection</span>
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AuthDialog;
