'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { useVendorStore } from '@/store/useVendorStore';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const addItem = useCartStore((state) => state.addItem);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const vendor = useVendorStore((state) =>
        state.vendors.find(v => v.id === product.vendorId)
    );

    const vendorName = vendor ? vendor.name : product.vendorName;
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="product-card group relative flex flex-col bg-white"
        >
            {/* Discount Badge */}
            {discount && (
                <div className="absolute top-3 left-3 z-10 bg-[#e53935] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                    -{discount}%
                </div>
            )}

            {/* Featured Badge */}
            {product.isFeatured && !discount && (
                <div className="absolute top-3 left-3 z-10 bg-[#00a6eb] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                    NEW
                </div>
            )}

            {/* Image Section */}
            <div className="relative overflow-hidden bg-[#f8f8f8]" style={{ aspectRatio: '1/1' }}>
                <Link href={`/product/${product.id}`}>
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>

                {/* Quick Actions */}
                <div className="quick-actions">
                    <button
                        onClick={() => addItem(product)}
                        className="h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#00a6eb] transition-all border border-gray-100"
                        title="Add to Cart"
                    >
                        <ShoppingCart className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className={`h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center transition-all border border-gray-100 ${isWishlisted ? 'text-[#e91e8c] bg-pink-50' : 'text-gray-600 hover:text-[#e91e8c] hover:bg-pink-50'}`}
                        title="Add to Wishlist"
                    >
                        <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-[#e91e8c]' : ''}`} />
                    </button>
                    <Link
                        href={`/product/${product.id}`}
                        className="h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#7c3aed] transition-all border border-gray-100"
                        title="Quick View"
                    >
                        <Eye className="h-4 w-4" />
                    </Link>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-1">
                {/* Category */}
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{product.category}</p>

                {/* Product Name */}
                <Link href={`/product/${product.id}`} className="mb-2">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-[#00a6eb] transition-colors leading-snug">
                        {product.name}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={`h-3 w-3 ${star <= Math.round(product.rating) ? 'star-filled' : 'text-gray-300 fill-gray-200'}`}
                        />
                    ))}
                    <span className="text-[10px] text-gray-400 ml-1">({product.rating})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-auto">
                    <span className="text-lg font-bold text-[#e53935]">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                </div>

                {/* Vendor */}
                <p className="text-[10px] text-gray-400 mt-1">by <span className="text-[#00a6eb] font-medium">{vendorName}</span></p>

                {/* Add to Cart Button */}
                <button
                    onClick={() => addItem(product)}
                    className="mt-3 w-full py-2.5 rounded-md border border-[#00a6eb] text-[#00a6eb] text-xs font-semibold hover:bg-[#00a6eb] hover:text-white transition-all duration-200 active:scale-95"
                >
                    Add to Cart
                </button>
            </div>
        </motion.div>
    );
};

export default ProductCard;
