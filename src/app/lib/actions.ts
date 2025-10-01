// lib/actions.ts (Server Actions)
'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://0.0.0.0:8006';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const res = await fetch(`${API_URL}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ username: email, password }),
    });
    
    if (!res.ok) {
      throw new Error('Login failed');
    }
    
    const data = await res.json();
    
    const cookieStore = await cookies();
    cookieStore.set('token', data.access_token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Invalid credentials or server connection failed' };
  }
  
  redirect('/');
}

export async function register(formData: FormData) {
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    name: formData.get('name') as string,
    country: formData.get('country') as string,
    title: formData.get('title') as string || undefined,
    specialization: formData.get('specialization') as string || undefined,
  };

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Registration failed');
    }

    // Auto login after registration
    const loginRes = await fetch(`${API_URL}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ username: data.email, password: data.password }),
    });

    if (!loginRes.ok) {
      return { error: 'Registration successful, please login manually' };
    }

    const loginData = await loginRes.json();
    const cookieStore = await cookies();
    cookieStore.set('token', loginData.access_token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    });
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Registration failed or server connection failed' };
  }
  
  redirect('/');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  redirect('/');
}

export async function createBlog(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) redirect('/login');

  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  };

  try {
    await fetch(`${API_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Blog creation error:', error);
    return { error: 'Failed to create blog' };
  }
  
  redirect('/');
}

export async function createComment(blogId: number, content: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return { error: 'Please login to comment' };

  try {
    const res = await fetch(`${API_URL}/blogs/${blogId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(errorData.detail || 'Failed to create comment');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Comment creation error:', error);
    return { error: error instanceof Error ? error.message : 'Failed to create comment' };
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;

  try {
    const res = await fetch(`${API_URL}/users/me`, {
      headers: { 'Authorization': `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}