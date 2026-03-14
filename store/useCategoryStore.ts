import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Category } from '@/types';
import { mockCategories } from '@/lib/api/mockData';

interface CategoryState {
    categories: Category[];
    addCategory: (name: string) => void;
    removeCategory: (id: string) => void;
}

export const useCategoryStore = create<CategoryState>()(
    persist(
        (set) => ({
            categories: mockCategories,
            addCategory: (name: string) => set((state) => {
                const newCat: Category = {
                    id: `cat-${Date.now()}`,
                    name,
                    slug: name.toLowerCase().replace(/\s+/g, '-'),
                };
                return { categories: [...state.categories, newCat] };
            }),
            removeCategory: (id: string) => set((state) => ({
                categories: state.categories.filter((c) => c.id !== id),
            })),
        }),
        {
            name: 'category-storage',
        }
    )
);
