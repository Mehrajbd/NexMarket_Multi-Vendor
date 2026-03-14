'use client';

import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const WishlistPage = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="container mx-auto px-4 py-20 text-center">
                <div className="max-w-md mx-auto">
                    <div className="h-24 w-24 bg-red-50 dark:bg-red-950/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Heart className="h-10 w-10 text-red-500" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
                    <p className="text-muted-foreground mb-8">Save items you love to your wishlist and they will show up here.</p>
                    <Link href="/products">
                        <Button size="lg" className="rounded-full px-8">Explore Products</Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default WishlistPage;
