// Authentication utilities for client-side
const API_URL = typeof window !== 'undefined' ? window.location.origin : '';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export async function login(email: string, password: string): Promise<{ success: boolean; token?: string; user?: User; error?: string }> {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      // Store token in localStorage
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return { success: true, token: data.token, user: data.user };
    }
    
    return { success: false, error: data.error || 'Login failed' };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

export async function logout(): Promise<void> {
  const token = localStorage.getItem('auth_token');
  
  if (token) {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
}

export async function getSession(): Promise<User | null> {
  const token = localStorage.getItem('auth_token');
  
  if (!token) {
    return null;
  }
  
  try {
    const response = await fetch(`${API_URL}/api/auth/session`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    
    if (data.authenticated && data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
      return data.user;
    }
    
    // Token invalid, clear storage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    return null;
  } catch (error) {
    console.error('Session check error:', error);
    return null;
  }
}

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}
