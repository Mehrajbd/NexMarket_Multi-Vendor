'use client';

import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';

const CartPage = () => {
    const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
    const subtotal = totalPrice();
    const shipping = 15;
    const tax = subtotal * 0.1;

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 container mx-auto px-4 py-20 text-center">
                    <div className="max-w-md mx-auto">
                        <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                        <p className="text-muted-foreground mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
                        <Link href="/products">
                            <Button size="lg" className="rounded-full px-8">Return to Shop</Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-10">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl border bg-card/50 backdrop-blur-sm group hover:border-primary/30 transition-all">
                                <div className="relative h-24 w-24 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                                    <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{item.name}</h3>
                                            <p className="text-xs text-muted-foreground uppercase">{item.category}</p>
                                            <p className="text-xs text-primary font-bold mt-1">Vendor: {item.vendorName}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-muted-foreground hover:text-red-500"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center border rounded-full px-2 py-1 bg-background shadow-sm">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-full"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="w-10 text-center font-bold">{item.quantity}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-full"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>
                                        <span className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <aside className="space-y-6">
                        <div className="p-8 rounded-3xl border bg-slate-950 text-white shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold mb-8">Order Summary</h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-slate-400">
                                        <span>Subtotal</span>
                                        <span className="text-white">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400">
                                        <span>Shipping Estimate</span>
                                        <span className="text-white">${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400">
                                        <span>Estimated Tax</span>
                                        <span className="text-white">${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="border-t border-slate-800 pt-6 mb-8">
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-lg font-bold">Total</span>
                                        <span className="text-3xl font-bold text-primary">${(subtotal + shipping + tax).toFixed(2)}</span>
                                    </div>
                                </div>

                                <Link href="/checkout">
                                    <Button size="lg" className="w-full h-14 rounded-full text-lg font-bold group shadow-xl shadow-primary/20">
                                        Checkout
                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </div>

                            <div className="absolute top-0 right-0 h-64 w-64 bg-primary/10 blur-[80px] rounded-full" />
                        </div>

                        <div className="p-6 rounded-2xl border bg-slate-50 dark:bg-slate-900 flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Safe & Secure Payment</p>
                                <p className="text-xs text-muted-foreground">Certified SSL protection</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CartPage;
