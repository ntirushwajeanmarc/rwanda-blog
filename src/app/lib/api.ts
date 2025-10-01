// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://blog.circuitnotion.com';

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
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ detail: 'Server error occurred' }));
      throw new APIError(res.status, errorData.detail || `Server returned ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    if (error instanceof APIError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new APIError(0, 'Request timed out. Please try again.');
    }
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new APIError(0, 'Unable to connect to server. Please try again later.');
    }
    throw new APIError(0, 'Something went wrong. Please check your internet connection.');
  }
}

export const blogAPI = {
  getBlogs: async (skip = 0, limit = 20): Promise<Blog[]> => {
    try {
      return await fetchAPI(`/blogs?skip=${skip}&limit=${limit}`, { cache: 'no-store' });
    } catch (error) {
      // Silently return empty array for build-time and graceful degradation
      if (process.env.NODE_ENV !== 'production') {
        console.warn('API unavailable during build:', error);
      }
      return [];
    }
  },
  
  getBlog: async (id: number): Promise<Blog> => 
    fetchAPI(`/blogs/${id}`, { cache: 'no-store' }),
};