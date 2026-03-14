import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserRecord {
    id: string;
    name: string;
    email: string;
    role: 'Customer' | 'Vendor';
    status: 'Active' | 'Disabled';
    joined: string;
}

interface UserState {
    users: UserRecord[];
    addUser: (user: Omit<UserRecord, 'id' | 'joined'>) => void;
    toggleStatus: (id: string) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            users: [
                { id: 'U-101', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Customer', status: 'Active', joined: 'Oct 12, 2023' },
                { id: 'U-102', name: 'Alex Rivera', email: 'alex@work.com', role: 'Vendor', status: 'Active', joined: 'Nov 05, 2023' },
                { id: 'U-103', name: 'Michael Chen', email: 'mike@chen.io', role: 'Customer', status: 'Disabled', joined: 'Jan 20, 2024' },
                { id: 'U-104', name: 'Emma Wilson', email: 'emma.w@gmail.com', role: 'Vendor', status: 'Active', joined: 'Feb 14, 2024' },
            ],
            addUser: (user) => set((state) => ({
                users: [
                    ...state.users,
                    {
                        ...user,
                        id: `U-${Date.now()}`,
                        joined: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
                    }
                ]
            })),
            toggleStatus: (id) => set((state) => ({
                users: state.users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Disabled' : 'Active' } : u)
            })),
        }),
        {
            name: 'user-storage',
        }
    )
);
