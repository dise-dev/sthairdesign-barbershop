import { useEffect, useState } from 'react';
import { BookingProvider } from './lib/booking-context';
import { AdminProvider } from './lib/admin-context';
import { ToastProvider } from './components/Toast';
import { HomePage } from './components/HomePage';
import { AdminPage } from './components/AdminPage';

function useRoute() {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPop);

    // Intercept anchor clicks for client-side nav
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (target.getAttribute('target') === '_blank') return;
      if (href === '/admin' || href === '/') {
        e.preventDefault();
        window.history.pushState({}, '', href);
        setRoute(href);
      }
    };
    document.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return route;
}

function App() {
  const route = useRoute();
  const isAdmin = route === '/admin';

  return (
    <ToastProvider>
      <BookingProvider>
        <AdminProvider>
          {isAdmin ? <AdminPage /> : <HomePage />}
        </AdminProvider>
      </BookingProvider>
    </ToastProvider>
  );
}

export default App;
