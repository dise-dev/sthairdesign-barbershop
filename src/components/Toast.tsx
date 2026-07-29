import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContextValue {
  showToast: (message: string, type?: Toast['type']) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-6 right-6 z-[200] flex flex-col gap-3 max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-slide-in flex items-start gap-3 bg-charcoal text-white px-5 py-4 shadow-2xl border-l-4"
            style={{ borderLeftColor: t.type === 'success' ? 'rgb(29 164 98)' : t.type === 'error' ? '#7B1F34' : '#808080' }}
          >
            {t.type === 'success' && <CheckCircle size={20} className="text-forest flex-shrink-0 mt-0.5" />}
            <p className="font-body text-sm flex-1">{t.message}</p>
            <button onClick={() => removeToast(t.id)} className="text-white/60 hover:text-white">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
