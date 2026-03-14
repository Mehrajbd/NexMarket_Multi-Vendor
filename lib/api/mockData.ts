import { Product, Vendor, Category } from '@/types';

export const mockCategories: Category[] = [
    { id: '1', name: 'Electronics', slug: 'electronics' },
    { id: '2', name: 'Fashion', slug: 'fashion' },
    { id: '3', name: 'Home & Living', slug: 'home-living' },
    { id: '4', name: 'Beauty', slug: 'beauty' },
    { id: '5', name: 'Sports', slug: 'sports' },
];

export const mockVendors: Vendor[] = [
    {
        id: 'v1',
        name: 'TechStore Premium',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aba9?w=100&h=100&fit=crop',
        description: 'Latest gadgets and electronics.',
        rating: 4.8,
        totalSales: 1200,
        isVerified: true,
    },
    {
        id: 'v2',
        name: 'Urban Threads',
        logo: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=100&h=100&fit=crop',
        description: 'Contemporary fashion for everyone.',
        rating: 4.6,
        totalSales: 850,
        isVerified: true,
    },
];

export const mockProducts: Product[] = [
    {
        id: 'p1',
        name: 'Elite Wireless Headphones',
        description: 'High-quality noise-cancelling wireless headphones with 40h battery life.',
        price: 299,
        originalPrice: 349,
        discount: 15,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'],
        category: 'Electronics',
        vendorId: 'v1',
        vendorName: 'TechStore Premium',
        stock: 50,
        rating: 4.9,
        reviewsCount: 120,
        isFeatured: true,
    },
    {
        id: 'p2',
        name: 'Classic Minimalist Watch',
        description: 'Elegant minimalist watch with genuine leather strap.',
        price: 185,
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'],
        category: 'Fashion',
        vendorId: 'v2',
        vendorName: 'Urban Threads',
        stock: 25,
        rating: 4.7,
        reviewsCount: 85,
        isFeatured: true,
    },
    // Add more mock products as needed
];
