// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://0.0.0.0:8006';

export interface User {
  id: number;
  email: string;
  name: string;
  country: string;
  title?: string;
  specialization?: string;
  photo_filename?: string;
  created_at: string;
}

export interface Comment {
  id: number;
  content: string;
  author: User;
  created_at: string;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  likes: number;
  shares: number;
  author: User;
  created_at: string;
  updated_at: string;
  comments: Comment[];
}

class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ detail: 'Unknown error' }));
      throw new APIError(res.status, errorData.detail || `HTTP ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    if (error instanceof APIError) throw error;
    throw new APIError(0, 'Network error - please check your connection');
  }
}

export const blogAPI = {
  getBlogs: async (skip = 0, limit = 20): Promise<Blog[]> => {
    try {
      return await fetchAPI(`/blogs?skip=${skip}&limit=${limit}`, { cache: 'no-store' });
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      return []; // Return empty array instead of throwing
    }
  },
  
  getBlog: async (id: number): Promise<Blog> => 
    fetchAPI(`/blogs/${id}`, { cache: 'no-store' }),
};