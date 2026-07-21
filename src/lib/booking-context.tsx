import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { supabase } from './supabase';
import type { Booking, BookingStatus } from './constants';

interface BookingContextValue {
  bookings: Booking[];
  loading: boolean;
  refresh: () => Promise<void>;
  addBooking: (input: Omit<Booking, 'id' | 'status' | 'created_at'>) => Promise<{ success: boolean; error?: string }>;
  updateStatus: (id: string, status: BookingStatus) => Promise<void>;
  releaseSlot: (id: string) => Promise<void>;
  getBookedSlots: (date: string) => Booking[];
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching bookings:', error.message);
      return;
    }
    setBookings((data as Booking[]) ?? []);
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await refresh();
      setLoading(false);
    })();

    const channel = supabase
      .channel('bookings-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        () => {
          refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refresh]);

  const addBooking = useCallback(
    async (input: Omit<Booking, 'id' | 'status' | 'created_at'>) => {
      const { error } = await supabase.from('bookings').insert({
        ...input,
        status: 'Na čekanju' as BookingStatus,
      });
      if (error) {
        return { success: false, error: error.message };
      }
      await refresh();
      return { success: true };
    },
    [refresh]
  );

  const updateStatus = useCallback(
    async (id: string, status: BookingStatus) => {
      const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
      if (error) {
        console.error('Error updating status:', error.message);
        return;
      }
      await refresh();
    },
    [refresh]
  );

  const releaseSlot = useCallback(
    async (id: string) => {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'Otkazano/Propušteno' as BookingStatus })
        .eq('id', id);
      if (error) {
        console.error('Error releasing slot:', error.message);
        return;
      }
      await refresh();
    },
    [refresh]
  );

  const getBookedSlots = useCallback(
    (date: string) => bookings.filter((b) => b.booked_date === date && b.status === 'Na čekanju'),
    [bookings]
  );

  return (
    <BookingContext.Provider
      value={{ bookings, loading, refresh, addBooking, updateStatus, releaseSlot, getBookedSlots }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBookings must be used within BookingProvider');
  return ctx;
}
