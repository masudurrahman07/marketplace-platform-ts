export interface Product {
  _id: string;
  title: string;  
  name?: string;   
  description: string;
  image: string;
  price: number;
  rating: number;
  category: string;
  location: string;
  createdBy?: string;
  createdAt?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt?: string;
}

export interface Review {
  _id: string;
  itemId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt?: string;
}

export interface Booking {
  _id: string;
  itemId: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
  createdAt?: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalItems: number;
  totalOrders: number;
  totalRevenue: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface DashboardStats {
  totalUsers: number;
  totalItems: number;
  totalOrders: number;
  totalRevenue: number;
}
