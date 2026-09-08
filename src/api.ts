import { Article } from './types';

export interface HealthStatus {
  status: string;
  timestamp: string;
  backend: string;
  database: string;
  mongoConnected: boolean;
  mongoUriConfigured: boolean;
  stats?: {
    articlesCount: number;
    subscribersCount: number;
  };
  error?: string | null;
}

export async function fetchHealthStatus(): Promise<HealthStatus | null> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn('API Health check failed:', err);
    return null;
  }
}

export async function fetchArticlesFromServer(): Promise<Article[] | null> {
  try {
    const res = await fetch('/api/articles');
    if (!res.ok) return null;
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data;
    }
    return null;
  } catch (err) {
    console.warn('Could not fetch articles from server, using local store:', err);
    return null;
  }
}

export const DEFAULT_ADMIN_KEY = 'mukesh-admin-2026';

export interface AdminUser {
  username: string;
  displayName: string;
  role: string;
}

export function getStoredAdminKey(): string {
  if (typeof window === 'undefined') return '';
  return (
    localStorage.getItem('mukesh_admin_token') ||
    localStorage.getItem('mukesh_admin_key') ||
    ''
  );
}

export function getStoredAdminUser(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('mukesh_admin_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredAdminSession(token: string, user?: AdminUser): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mukesh_admin_token', token.trim());
    localStorage.setItem('mukesh_admin_key', token.trim());
    if (user) {
      localStorage.setItem('mukesh_admin_user', JSON.stringify(user));
    }
  }
}

export function clearStoredAdminSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('mukesh_admin_token');
    localStorage.removeItem('mukesh_admin_key');
    localStorage.removeItem('mukesh_admin_user');
  }
}

export async function loginAdminWithPassword(
  password: string,
  username?: string
): Promise<{ success: boolean; token?: string; user?: AdminUser; error?: string }> {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: password.trim(), username: username?.trim() }),
    });
    const json = await res.json();
    if (json.success && json.token) {
      setStoredAdminSession(json.token, json.user);
    }
    return json;
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error during login' };
  }
}

export async function verifyAdminKeyOnServer(adminKey: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': adminKey,
        'x-admin-key': adminKey,
      },
      body: JSON.stringify({ password: adminKey }),
    });
    const json = await res.json();
    return json;
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function createArticleOnServer(
  article: Article,
  adminKey?: string
): Promise<{ success: boolean; data?: Article; error?: string }> {
  try {
    const key = adminKey || getStoredAdminKey();
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': key,
      },
      body: JSON.stringify(article),
    });
    const json = await res.json();
    return json;
  } catch (err: any) {
    console.error('Error posting article to server:', err);
    return { success: false, error: err.message };
  }
}

export async function deleteArticleOnServer(
  id: string,
  adminKey?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const key = adminKey || getStoredAdminKey();
    const res = await fetch(`/api/articles/${id}`, {
      method: 'DELETE',
      headers: {
        'x-admin-key': key,
      },
    });
    const json = await res.json();
    return json;
  } catch (err: any) {
    console.error('Error deleting article on server:', err);
    return { success: false, error: err.message };
  }
}

export async function subscribeNewsletterOnServer(email: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.warn('Newsletter subscription API fallback:', err);
    return { success: true, message: 'Subscribed locally' };
  }
}
