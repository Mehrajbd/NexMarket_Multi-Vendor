export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor' | 'admin';
  avatar?: string;
}

export interface Vendor {
  id: string;
  name: string;
  logo: string;
  description: string;
  rating: number;
  totalSales: number;
  isVerified: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  vendorId: string;
  vendorName: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: string;
}
