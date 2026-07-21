import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { supabase } from './supabase';
import type { AdminUser } from './constants';

interface AdminContextValue {
  admin: AdminUser | null;
  loading: boolean;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('st-hairdesign-admin');
    if (stored) {
      try {
        setAdmin(JSON.parse(stored));
      } catch {
        localStorage.removeItem('st-hairdesign-admin');
      }
    }
    setLoading(false);
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase
      .from('admin_users')
      .insert({ email, password })
      .select()
      .single();
    if (error) {
      return { success: false, error: error.message };
    }
    const user = data as AdminUser;
    setAdmin(user);
    localStorage.setItem('st-hairdesign-admin', JSON.stringify(user));
    return { success: true };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .maybeSingle();
    if (error) {
      return { success: false, error: error.message };
    }
    if (!data) {
      return { success: false, error: 'Pogrešan email ili lozinka.' };
    }
    const user = data as AdminUser;
    setAdmin(user);
    localStorage.setItem('st-hairdesign-admin', JSON.stringify(user));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setAdmin(null);
    localStorage.removeItem('st-hairdesign-admin');
  }, []);

  return (
    <AdminContext.Provider value={{ admin, loading, register, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
