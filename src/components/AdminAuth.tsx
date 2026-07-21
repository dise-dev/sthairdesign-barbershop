import { useState } from 'react';
import { UserPlus, LogIn, Mail, Lock, Scissors } from 'lucide-react';
import { useAdmin } from '../lib/admin-context';

export function AdminAuth() {
  const { register, login } = useAdmin();
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Molimo popunite sva polja.');
      return;
    }
    setLoading(true);
    const result = mode === 'register' ? await register(email, password) : await login(email, password);
    setLoading(false);
    if (!result.success) {
      setError(result.error ?? 'Greška. Pokušajte ponovo.');
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-forest via-burgundy to-forest" />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-forest mb-4">
            <Scissors size={32} className="text-white" />
          </div>
          <h1 className="font-heading uppercase text-3xl font-bold text-white mb-2">St Hairdesign</h1>
          <p className="text-white/60 text-sm font-heading uppercase tracking-widest">Admin Panel</p>
        </div>

        <div className="bg-offwhite shadow-2xl">
          <div className="flex border-b-2 border-charcoal/10">
            <button
              onClick={() => { setMode('register'); setError(null); }}
              className={`flex-1 py-4 font-heading uppercase text-sm font-bold tracking-wide transition-colors ${
                mode === 'register' ? 'bg-forest text-white' : 'bg-offwhite text-charcoal/60 hover:text-charcoal'
              }`}
            >
              <UserPlus size={16} className="inline mr-2" /> Registracija
            </button>
            <button
              onClick={() => { setMode('login'); setError(null); }}
              className={`flex-1 py-4 font-heading uppercase text-sm font-bold tracking-wide transition-colors ${
                mode === 'login' ? 'bg-forest text-white' : 'bg-offwhite text-charcoal/60 hover:text-charcoal'
              }`}
            >
              <LogIn size={16} className="inline mr-2" /> Prijava
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-xs font-heading uppercase tracking-wide text-charcoal/70 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="admin@sthairdesign.ba"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-heading uppercase tracking-wide text-charcoal/70 mb-1.5">
                Lozinka
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-burgundy/10 border-l-4 border-burgundy px-4 py-3">
                <p className="text-sm text-burgundy">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-60"
            >
              {loading
                ? 'Sačekajte...'
                : mode === 'register'
                ? 'Registruj admin nalog'
                : 'Prijavi se'}
            </button>

            {mode === 'register' && (
              <p className="text-xs text-charcoal/50 text-center italic">
                Privremeni registracijski tok — biće uklonjen nakon postavljanja naloga.
              </p>
            )}
          </form>
        </div>

        <p className="text-center mt-6 text-white/40 text-xs">
          St Hairdesign · Admin Dashboard
        </p>
      </div>
    </div>
  );
}
