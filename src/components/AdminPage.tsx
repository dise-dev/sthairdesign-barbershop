import { useAdmin } from '../lib/admin-context';
import { AdminAuth } from './AdminAuth';
import { AdminDashboard } from './AdminDashboard';

export function AdminPage() {
  const { admin, loading } = useAdmin();

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <p className="text-white/60 font-heading uppercase tracking-widest">Učitavanje...</p>
      </div>
    );
  }

  if (!admin) {
    return <AdminAuth />;
  }

  return <AdminDashboard />;
}
