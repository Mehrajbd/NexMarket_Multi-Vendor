'use client';

import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard, Truck, ShieldCheck, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { useAuthStore } from '@/store/useAuthStore';
import AuthDialog from '@/components/auth/AuthDialog';
import { LogIn, UserPlus } from 'lucide-react';

const CheckoutPage = () => {
    const { items, totalPrice } = useCartStore();
    const { isAuthenticated, user } = useAuthStore();
    const [isAuthDialogOpen, setIsAuthDialogOpen] = React.useState(false);

    const total = totalPrice() + 15 + (totalPrice() * 0.1);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <Navbar />
                <main className="container mx-auto px-4 py-20">
                    <div className="max-w-md mx-auto text-center">
                        <div className="h-20 w-20 rounded-3xl bg-indigo-600 flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-indigo-600/20">
                            <ShieldCheck className="h-10 w-10" />
                        </div>
                        <h1 className="text-3xl font-bold mb-4">Identify Yourself</h1>
                        <p className="text-slate-500 mb-10 leading-relaxed">
                            To protect your account and ensure secure delivery, please sign in or create an account before proceeding to checkout.
                        </p>

                        <div className="space-y-4">
                            <Button
                                onClick={() => setIsAuthDialogOpen(true)}
                                className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-lg shadow-indigo-600/20 gap-2"
                            >
                                <LogIn className="h-5 w-5" />
                                Sign In to Continue
                            </Button>

                            <div className="relative py-4">
                                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                                <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-50 px-4 text-slate-400 font-bold">New Here?</span></div>
                            </div>

                            <Button
                                variant="outline"
                                onClick={() => setIsAuthDialogOpen(true)}
                                className="w-full h-14 rounded-2xl border-slate-200 text-lg font-bold gap-2 hover:bg-white"
                            >
                                <UserPlus className="h-5 w-5" />
                                Create Guest Account
                            </Button>
                        </div>

                        <Link href="/cart" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-indigo-600 mt-10 transition-colors">
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Return to Cart
                        </Link>
                    </div>
                </main>
                <AuthDialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen} />
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />

            <main className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    <Link href="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Cart
                    </Link>

                    <h1 className="text-4xl font-bold mb-12">Checkout</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Shipping Form */}
                        <div className="space-y-10">
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
                                        <Truck className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-2xl font-bold">Shipping Information</h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">First Name</label>
                                        <Input defaultValue={user?.name.split(' ')[0] || ''} placeholder="John" className="h-12 bg-background shadow-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Last Name</label>
                                        <Input defaultValue={user?.name.split(' ')[1] || ''} placeholder="Doe" className="h-12 bg-background shadow-sm" />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-sm font-medium">Email Address</label>
                                        <Input type="email" defaultValue={user?.email || ''} placeholder="john@example.com" className="h-12 bg-background shadow-sm" />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-sm font-medium">Street Address</label>
                                        <Input placeholder="123 Street Name" className="h-12 bg-background shadow-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">City</label>
                                        <Input placeholder="New York" className="h-12 bg-background shadow-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Postal Code</label>
                                        <Input placeholder="10001" className="h-12 bg-background shadow-sm" />
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
                                        <CreditCard className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-2xl font-bold">Payment Method</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl border bg-background flex items-center justify-between cursor-pointer ring-2 ring-primary">
                                        <div className="flex items-center gap-4">
                                            <div className="flex gap-1">
                                                <div className="h-6 w-10 bg-slate-200 rounded animate-pulse" />
                                                <div className="h-6 w-10 bg-slate-300 rounded animate-pulse" />
                                            </div>
                                            <span className="font-bold">Credit / Debit Card</span>
                                        </div>
                                        <div className="h-5 w-5 rounded-full border-4 border-primary" />
                                    </div>
                                    <div className="p-4 rounded-xl border bg-background/50 flex items-center justify-between cursor-pointer hover:bg-background transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="h-6 w-10 bg-blue-500 rounded flex items-center justify-center text-[10px] text-white font-bold">PayPal</div>
                                            <span className="font-bold">PayPal</span>
                                        </div>
                                        <div className="h-5 w-5 rounded-full border-2" />
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Card Number</label>
                                        <Input placeholder="0000 0000 0000 0000" className="h-12 bg-background shadow-sm" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Expiry</label>
                                            <Input placeholder="MM/YY" className="h-12 bg-background shadow-sm" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">CVV</label>
                                            <Input placeholder="123" className="h-12 bg-background shadow-sm" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Order Review */}
                        <div>
                            <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border lg:sticky lg:top-24">
                                <h2 className="text-2xl font-bold mb-8">Order Review</h2>

                                <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="h-16 w-16 relative rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                                <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-sm line-clamp-1">{item.name}</p>
                                                <p className="text-xs text-muted-foreground">{item.quantity} x ${item.price}</p>
                                            </div>
                                            <span className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 pt-6 border-t mb-8">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span className="font-bold text-foreground font-mono">${totalPrice().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Shipping</span>
                                        <span className="font-bold text-foreground font-mono">$15.00</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold pt-4 border-t">
                                        <span>Total</span>
                                        <span className="text-primary font-mono">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button className="w-full h-14 rounded-full text-lg font-bold shadow-lg shadow-primary/20">
                                    Complete Purchase
                                </Button>

                                <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                                    <ShieldCheck className="h-4 w-4" />
                                    Secure Bank-Level Encryption
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CheckoutPage;
