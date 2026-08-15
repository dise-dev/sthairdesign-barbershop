import { useState, useEffect } from 'react';
import { Menu, X, Scissors } from 'lucide-react';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Usluge', href: '#usluge' },
    { label: 'Barberi', href: '#barberi' },
    { label: 'Video', href: '#video' },
    { label: 'Recenzije', href: '#recenzije' },
    { label: 'Lokacija', href: '#lokacija' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? 'bg-charcoal shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex items-center justify-between px-4 sm:px-6 lg:px-8 pt-0 pb-4">
        <a href="#top" className="flex items-center">
          <img src="/sthairdesign-logo.png" alt="St Hairdesign" className="h-32 w-auto object-contain" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-heading uppercase text-sm tracking-wide text-white/80 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a href="#usluge" className="btn-primary !py-2.5 !px-5 text-sm">
            Rezerviši termin
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
          aria-label="Meni"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-charcoal border-t border-white/10 animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block font-heading uppercase text-sm tracking-wide text-white/80 hover:text-white py-2"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#usluge"
              onClick={() => setOpen(false)}
              className="btn-primary w-full"
            >
              <Scissors size={16} className="mr-2" /> Rezerviši termin
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
