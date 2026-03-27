'use client';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { 
      'Content-Type': 'application/json', 
      ...options?.headers 
    },
  });
  
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const api = {
 
  getItems: (params?: Record<string, any>) => {
    let query = '';
    if (params) {
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== '' && v !== 'all')
      );
      const searchParams = new URLSearchParams(filteredParams);
      query = `?${searchParams.toString()}`;
    }
    return request<any>(`/items${query}`);
  },
  getItem: (id: string) => request<any>(`/items/${id}`),


  login: (data: { email: string; password: string }) =>
    request<any>('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  
  register: (data: { name: string; email: string; password: string }) =>
    request<any>('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

  
  getReviews: (itemId: string) => request<any>(`/reviews/item/${itemId}`),
  
  getMyReviews: (token: string) => 
    request<any>('/reviews/my', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  createReview: (data: object, token: string) =>
    request<any>('/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
    }),

  deleteReview: (id: string, token: string) =>
    request<any>(`/reviews/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),

  getStats: (token: string) =>
    request<any>('/dashboard/stats', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getBookings: (token: string) =>
    request<any>('/bookings', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }),

  createBooking: (data: object, token: string) =>
    request<any>('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
    }),
};