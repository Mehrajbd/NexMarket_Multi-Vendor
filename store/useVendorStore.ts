import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Vendor } from '@/types';
import { mockVendors } from '@/lib/api/mockData';

interface VendorState {
    vendors: Vendor[];
    addVendor: (vendor: Vendor) => void;
    updateVendor: (id: string, updatedVendor: Partial<Vendor>) => void;
    deleteVendor: (id: string) => void;
    getVendorById: (id: string) => Vendor | undefined;
}

export const useVendorStore = create<VendorState>()(
    persist(
        (set, get) => ({
            vendors: mockVendors,
            addVendor: (vendor) => set((state) => ({
                vendors: [...state.vendors, vendor]
            })),
            updateVendor: (id, updatedVendor) => set((state) => ({
                vendors: state.vendors.map((v) => v.id === id ? { ...v, ...updatedVendor } : v)
            })),
            deleteVendor: (id) => set((state) => ({
                vendors: state.vendors.filter((v) => v.id !== id)
            })),
            getVendorById: (id) => get().vendors.find((v) => v.id === id),
        }),
        {
            name: 'vendor-storage',
        }
    )
);
