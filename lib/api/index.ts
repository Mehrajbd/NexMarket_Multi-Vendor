import axios from 'axios';
import { mockProducts, mockVendors, mockCategories } from './mockData';

// This is a mock API service that simulates network requests
const api = axios.create({
    baseURL: '/api',
});

export const productApi = {
    getAll: async () => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        return mockProducts;
    },
    getById: async (id: string) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const product = mockProducts.find((p) => p.id === id);
        if (!product) throw new Error('Product not found');
        return product;
    },
    getByCategory: async (category: string) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return mockProducts.filter((p) => p.category === category);
    },
};

export const vendorApi = {
    getAll: async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return mockVendors;
    },
    getById: async (id: string) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const vendor = mockVendors.find((v) => v.id === id);
        if (!vendor) throw new Error('Vendor not found');
        return vendor;
    },
};

export const categoryApi = {
    getAll: async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return mockCategories;
    },
};

export default api;
