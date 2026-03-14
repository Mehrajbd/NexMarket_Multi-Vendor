'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/useCartStore';
import { useVendorStore } from '@/store/useVendorStore';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const addItem = useCartStore((state) => state.addItem);
    const vendor = useVendorStore((state) =>
        state.vendors.find(v => v.id === product.vendorId)
    );

    const vendorName = vendor ? vendor.name : product.vendorName;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative flex flex-col overflow-hidden rounded-[40px] bg-slate-900 border border-white/5 transition-all duration-500 hover:border-white/10 hover:shadow-3xl"
        >
            {/* Image Section */}
            <div className="relative aspect-[4/5] overflow-hidden m-2 rounded-[32px]">
                <Link href={`/product/${product.id}`}>
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 h-10 w-10 glass-morphism rounded-full flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all z-10 shadow-lg border-white/10">
                    <Heart className="h-5 w-5" />
                </button>

                {/* Badge Overlay */}
                <div className="absolute bottom-4 left-4 z-10">
                    <Badge className="bg-indigo-600 text-white border-none px-3 py-1 rounded-full font-black text-[8px] uppercase tracking-widest shadow-xl">
                        {product.isFeatured ? 'New Arrival' : product.category}
                    </Badge>
                </div>
            </div>

            {/* Content Details */}
            <div className="flex flex-1 flex-col p-8 pt-4 text-center">
                <div className="mb-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">{product.category}</span>
                </div>

                <Link href={`/product/${product.id}`} className="mb-4">
                    <h3 className="line-clamp-1 font-black text-lg tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex flex-col items-center gap-1 mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-xs font-black text-white">{product.rating}</span>
                        <span className="text-slate-700 mx-1">|</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">by {vendorName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-white">${product.price}.00</span>
                        {product.originalPrice && (
                            <span className="text-xs text-slate-600 font-bold line-through">
                                ${product.originalPrice}
                            </span>
                        )}
                    </div>
                </div>

                <div className="mt-auto">
                    <Button
                        onClick={() => addItem(product)}
                        className="w-full h-14 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95"
                    >
                        Add to Bag
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
