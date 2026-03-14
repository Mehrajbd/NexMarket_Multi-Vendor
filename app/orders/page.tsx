'use client';

import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { Package, Truck, CheckCircle2, Clock, ChevronRight, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import VendorChatDialog from '@/components/chat/VendorChatDialog';

// Mock Orders Data
const mockOrders = [
    {
        id: 'ORD-9824-7123',
        date: 'Oct 24, 2026',
        total: 1299.00,
        status: 'shipped', // placed, processing, shipped, delivered
        vendorName: 'TechNova Electronics',
        product: {
            name: 'Nova Pro Wireless Headphones',
            image: '/images/products/headphone-1.jpg',
            price: 299.00,
            quantity: 1
        },
        tracking: [
            { status: 'Order Placed', date: 'Oct 24, 10:30 AM', completed: true },
            { status: 'Processing', date: 'Oct 24, 02:15 PM', completed: true },
            { status: 'Shipped', date: 'Oct 25, 09:00 AM', completed: true },
            { status: 'Delivered', date: 'Estimated Oct 27', completed: false },
        ]
    },
    {
        id: 'ORD-1152-4091',
        date: 'Oct 15, 2026',
        total: 89.50,
        status: 'delivered',
        vendorName: 'Aesthetic Living Room',
        product: {
            name: 'Minimalist Ceramic Vase Set',
            image: '/images/products/vase-1.jpg',
            price: 89.50,
            quantity: 1
        },
        tracking: [
            { status: 'Order Placed', date: 'Oct 15, 11:20 AM', completed: true },
            { status: 'Processing', date: 'Oct 15, 04:00 PM', completed: true },
            { status: 'Shipped', date: 'Oct 16, 10:30 AM', completed: true },
            { status: 'Delivered', date: 'Oct 18, 02:45 PM', completed: true },
        ]
    }
];

const StatusIcon = ({ status, completed }: { status: string, completed: boolean }) => {
    if (!completed) return <div className="h-6 w-6 rounded-full border-2 border-muted bg-background flex items-center justify-center z-10" />;
    
    switch (status) {
        case 'Order Placed': return <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center z-10"><Package className="h-3 w-3 text-white" /></div>;
        case 'Processing': return <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center z-10"><Clock className="h-3 w-3 text-white" /></div>;
        case 'Shipped': return <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center z-10"><Truck className="h-3 w-3 text-white" /></div>;
        case 'Delivered': return <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center z-10"><CheckCircle2 className="h-3 w-3 text-white" /></div>;
        default: return <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center z-10"><CheckCircle2 className="h-3 w-3 text-white" /></div>;
    }
};

const OrdersPage = () => {
    return (
        <div className="min-h-screen bg-muted/20">
            <Navbar />
            <main className="container mx-auto px-4 py-12 max-w-5xl mt-[80px]">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-foreground">Order History & Tracking</h1>
                        <p className="text-muted-foreground mt-1">Manage and track your recent purchases in real-time.</p>
                    </div>
                </div>

                <div className="space-y-8">
                    {mockOrders.map((order) => (
                        <div key={order.id} className="bg-background rounded-3xl border shadow-sm overflow-hidden">
                            {/* Order Header */}
                            <div className="bg-muted/30 border-b p-6 flex flex-wrap gap-6 justify-between items-center text-sm">
                                <div className="flex gap-12">
                                    <div>
                                        <p className="text-muted-foreground font-semibold mb-1 uppercase tracking-wider text-xs">Order Placed</p>
                                        <p className="font-bold">{order.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground font-semibold mb-1 uppercase tracking-wider text-xs">Total</p>
                                        <p className="font-bold">${order.total.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-muted-foreground font-semibold mb-1 uppercase tracking-wider text-xs">Order ID</p>
                                    <p className="font-mono font-bold text-primary">{order.id}</p>
                                </div>
                            </div>

                            {/* Order Content */}
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row gap-8">
                                    {/* Product Details & Vendor */}
                                    <div className="flex-1 space-y-6">
                                        <div className="flex gap-4">
                                            <div className="h-24 w-24 rounded-xl bg-muted border overflow-hidden relative shrink-0">
                                                {/* Fallback box mimicking an image since asset might not exist */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 flex items-center justify-center font-bold text-indigo-500 text-xs text-center p-2">
                                                    Product Image
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold mb-1">{order.product.name}</h3>
                                                <p className="text-muted-foreground mb-3 text-sm">Qty: {order.product.quantity} • ${order.product.price.toFixed(2)}</p>
                                                
                                                {/* Vendor Actions */}
                                                <div className="flex flex-wrap gap-2 items-center">
                                                    <Badge variant="secondary" className="gap-1 px-2.5 py-1">
                                                        <Store className="h-3 w-3 text-muted-foreground" />
                                                        {order.vendorName}
                                                    </Badge>
                                                    <VendorChatDialog 
                                                        vendorName={order.vendorName}
                                                        triggerButton={
                                                            <Button variant="ghost" size="sm" className="h-7 text-xs font-bold text-primary hover:text-primary hover:bg-primary/10">
                                                                Contact Vendor
                                                            </Button>
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tracking Timeline */}
                                    <div className="md:w-[400px] border-l md:pl-8 mt-6 md:mt-0 relative">
                                        <h4 className="font-bold mb-6 flex items-center gap-2">
                                            Tracking Progress
                                        </h4>
                                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-muted">
                                            {order.tracking.map((track, idx) => (
                                                <div key={idx} className="relative flex items-center gap-4">
                                                    <StatusIcon status={track.status} completed={track.completed} />
                                                    <div className="flex-1">
                                                        <p className={`font-bold text-sm ${track.completed ? 'text-foreground' : 'text-muted-foreground'}`}>{track.status}</p>
                                                        <p className="text-xs text-muted-foreground">{track.date}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Footer Actions */}
                            <div className="bg-muted/10 border-t p-4 px-6 flex justify-end gap-3">
                                <Button variant="outline">View Invoice</Button>
                                <Button>Track Package <ChevronRight className="h-4 w-4 ml-1" /></Button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OrdersPage;
