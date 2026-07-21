import { useState, useMemo } from 'react';
import {
  LogOut, Scissors, Check, Clock, X, Phone, User, Calendar, Search,
} from 'lucide-react';
import { useAdmin } from '../lib/admin-context';
import { useBookings } from '../lib/booking-context';
import { STATUS_TABS, type BookingStatus, type Booking } from '../lib/constants';

const STATUS_STYLES: Record<BookingStatus, string> = {
  'Na čekanju': 'bg-burgundy/10 text-burgundy border-burgundy',
  'Završeno': 'bg-forest/10 text-forest border-forest',
  'Otkazano/Propušteno': 'bg-gray-200 text-gray-600 border-gray-400',
};

export function AdminDashboard() {
  const { admin, logout } = useAdmin();
  const { bookings, loading, updateStatus, releaseSlot } = useBookings();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = bookings;
    if (activeTab !== 'all') {
      list = list.filter((b) => b.status === activeTab);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.client_name.toLowerCase().includes(q) ||
          b.phone.toLowerCase().includes(q) ||
          b.barber.toLowerCase().includes(q) ||
          b.service_name.toLowerCase().includes(q)
      );
    }
    return list;
  }, [bookings, activeTab, search]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: bookings.length };
    STATUS_TABS.slice(1).forEach((t) => {
      c[t.key] = bookings.filter((b) => b.status === t.key).length;
    });
    return c;
  }, [bookings]);

  const handleComplete = (id: string) => updateStatus(id, 'Završeno');
  const handleRelease = (id: string) => releaseSlot(id);

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Header */}
      <header className="bg-charcoal text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-forest flex items-center justify-center">
              <Scissors size={20} />
            </div>
            <div>
              <h1 className="font-heading uppercase text-lg font-bold leading-none">St Hairdesign</h1>
              <p className="text-xs text-white/50 font-heading uppercase tracking-widest">Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm text-white/70">
              {admin?.email}
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-burgundy hover:bg-[#5e1627] px-4 py-2 text-white font-heading uppercase text-sm tracking-wide transition-colors"
            >
              <LogOut size={16} /> Odjava
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {STATUS_TABS.map((t) => (
            <div key={t.key} className="bg-white border-l-4 p-5 shadow-sm" style={{
              borderLeftColor: t.key === 'all' ? '#343a40' : t.key === 'Na čekanju' ? '#7B1F34' : t.key === 'Završeno' ? '#1A4731' : '#808080',
            }}>
              <p className="text-xs font-heading uppercase tracking-wide text-charcoal/60 mb-1">{t.label}</p>
              <p className="text-3xl font-heading font-bold text-charcoal">{counts[t.key] ?? 0}</p>
            </div>
          ))}
        </div>

        {/* Tabs + search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-1 bg-white border-2 border-charcoal/10">
            {STATUS_TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-4 py-3 font-heading uppercase text-sm tracking-wide transition-all ${
                  activeTab === t.key
                    ? 'bg-charcoal text-white'
                    : 'text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5'
                }`}
              >
                {t.label}
                <span className="ml-2 text-xs opacity-70">({counts[t.key] ?? 0})</span>
              </button>
            ))}
          </div>

          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pretraga..."
              className="input-field pl-10 w-full md:w-64"
            />
          </div>
        </div>

        {/* Bookings table */}
        {loading ? (
          <div className="text-center py-20 text-charcoal/50 font-heading uppercase tracking-wide">
            Učitavanje termina...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white border-2 border-charcoal/10">
            <Calendar size={48} className="mx-auto text-charcoal/20 mb-4" />
            <p className="font-heading uppercase text-charcoal/50 tracking-wide">Nema termina u ovoj kategoriji.</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden lg:block bg-white shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-charcoal text-white">
                    {['Klijent', 'Telefon', 'Barber', 'Usluga', 'Datum', 'Vrijeme', 'Status', 'Akcije'].map((h) => (
                      <th key={h} className="px-4 py-4 text-left font-heading uppercase text-xs tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b: Booking) => (
                    <tr key={b.id} className="border-b border-charcoal/10 hover:bg-charcoal/5 transition-colors">
                      <td className="px-4 py-4 font-medium text-charcoal">{b.client_name}</td>
                      <td className="px-4 py-4 text-charcoal/70 text-sm">{b.phone}</td>
                      <td className="px-4 py-4 text-charcoal/70 text-sm">{b.barber}</td>
                      <td className="px-4 py-4 text-charcoal/70 text-sm">{b.service_name}</td>
                      <td className="px-4 py-4 text-charcoal/70 text-sm">
                        {new Date(b.booked_date).toLocaleDateString('bs-BA')}
                      </td>
                      <td className="px-4 py-4 text-charcoal/70 text-sm">{b.booked_time}h</td>
                      <td className="px-4 py-4">
                        <span className={`inline-block px-2.5 py-1 text-xs font-heading uppercase tracking-wide border ${STATUS_STYLES[b.status]}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleComplete(b.id)}
                            disabled={b.status === 'Završeno'}
                            className="flex items-center gap-1 bg-forest text-white px-3 py-1.5 text-xs font-heading uppercase tracking-wide hover:bg-[#0f3520] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                          >
                            <Check size={12} /> Završeno
                          </button>
                          <button
                            onClick={() => handleRelease(b.id)}
                            disabled={b.status === 'Otkazano/Propušteno'}
                            className="flex items-center gap-1 bg-burgundy text-white px-3 py-1.5 text-xs font-heading uppercase tracking-wide hover:bg-[#5e1627] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                          >
                            <X size={12} /> Oslobodi
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="lg:hidden space-y-4">
              {filtered.map((b: Booking) => (
                <div key={b.id} className="bg-white p-5 shadow-sm border-l-4" style={{
                  borderLeftColor: b.status === 'Na čekanju' ? '#7B1F34' : b.status === 'Završeno' ? '#1A4731' : '#808080',
                }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-heading uppercase font-bold text-charcoal text-lg">{b.client_name}</h3>
                      <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-heading uppercase tracking-wide border ${STATUS_STYLES[b.status]}`}>
                        {b.status}
                      </span>
                    </div>
                    <span className="text-charcoal/40 text-xs font-heading">
                      {new Date(b.created_at).toLocaleDateString('bs-BA')}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div className="flex items-center gap-2 text-charcoal/70">
                      <Phone size={14} className="text-forest" /> {b.phone}
                    </div>
                    <div className="flex items-center gap-2 text-charcoal/70">
                      <User size={14} className="text-forest" /> {b.barber}
                    </div>
                    <div className="flex items-center gap-2 text-charcoal/70">
                      <Scissors size={14} className="text-forest" /> {b.service_name}
                    </div>
                    <div className="flex items-center gap-2 text-charcoal/70">
                      <Clock size={14} className="text-forest" /> {b.booked_time}h
                    </div>
                    <div className="flex items-center gap-2 text-charcoal/70 col-span-2">
                      <Calendar size={14} className="text-forest" />
                      {new Date(b.booked_date).toLocaleDateString('bs-BA', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleComplete(b.id)}
                      disabled={b.status === 'Završeno'}
                      className="flex-1 flex items-center justify-center gap-1 bg-forest text-white px-3 py-2 text-xs font-heading uppercase tracking-wide hover:bg-[#0f3520] disabled:opacity-40 transition-colors"
                    >
                      <Check size={12} /> Završeno
                    </button>
                    <button
                      onClick={() => handleRelease(b.id)}
                      disabled={b.status === 'Otkazano/Propušteno'}
                      className="flex-1 flex items-center justify-center gap-1 bg-burgundy text-white px-3 py-2 text-xs font-heading uppercase tracking-wide hover:bg-[#5e1627] disabled:opacity-40 transition-colors"
                    >
                      <X size={12} /> Oslobodi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
