import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { supabase } from './supabase';
import type { ProductOrder } from './constants';

interface ProductOrderContextValue {
  orders: ProductOrder[];
  loading: boolean;
  refresh: () => Promise<void>;
  updateStatus: (id: string, status: 'Na čekanju' | 'Završeno') => Promise<void>;
}

const ProductOrderContext = createContext<ProductOrderContextValue | undefined>(undefined);

export function ProductOrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<ProductOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { data, error } = await supabase
      .from('product_orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching product orders:', error.message);
      return;
    }
    setOrders((data as ProductOrder[]) ?? []);
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await refresh();
      setLoading(false);
    })();

    const channel = supabase
      .channel('product-orders-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'product_orders' },
        () => {
          refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refresh]);

  const updateStatus = useCallback(
    async (id: string, status: 'Na čekanju' | 'Završeno') => {
      const { error } = await supabase.from('product_orders').update({ status }).eq('id', id);
      if (error) {
        console.error('Error updating product order status:', error.message);
        return;
      }
      await refresh();
    },
    [refresh]
  );

  return (
    <ProductOrderContext.Provider value={{ orders, loading, refresh, updateStatus }}>
      {children}
    </ProductOrderContext.Provider>
  );
}

export function useProductOrders() {
  const ctx = useContext(ProductOrderContext);
  if (!ctx) throw new Error('useProductOrders must be used within ProductOrderProvider');
  return ctx;
}
