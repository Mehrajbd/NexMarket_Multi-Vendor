'use client';

import React from 'react';
import ProductCard from '@/components/cards/ProductCard';
import { mockProducts } from '@/lib/api/mockData';
import { motion } from 'framer-motion';

const GalleryPage = () => {
    return (
        <main className="min-h-screen bg-slate-950 pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <h1 className="text-5xl font-black tracking-tighter text-white mb-4">Product Gallery</h1>
                    <p className="text-slate-500 text-lg">A visual showcase of our premium collection.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {mockProducts.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default GalleryPage;
