import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';
import { mockProducts } from '@/lib/api/mockData';

interface ProductState {
    products: Product[];
    addProduct: (product: Omit<Product, 'id'>) => void;
    removeProduct: (id: string) => void;
}

export const useProductStore = create<ProductState>()(
    persist(
        (set) => ({
            products: mockProducts,
            addProduct: (product) => set((state) => ({
                products: [
                    { ...product, id: `p-${Date.now()}` },
                    ...state.products
                ]
            })),
            removeProduct: (id) => set((state) => ({
                products: state.products.filter(p => p.id !== id)
            })),
        }),
        {
            name: 'product-storage',
        }
    )
);
