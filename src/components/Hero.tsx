import { Scissors, ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen bg-charcoal text-white flex items-center overflow-hidden">
      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'url(https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'grayscale(0.6) contrast(1.2) brightness(0.6)',
      }} />
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/85 to-charcoal/70" />

      {/* Accent lines */}
      <div className="absolute top-0 left-0 w-1 h-full bg-forest" />
      <div className="absolute top-0 right-0 w-1 h-full bg-burgundy" />

      <div className="container-x relative z-10 px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl animate-fade-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-forest" />
            <span className="font-heading uppercase text-sm tracking-[0.3em] text-forest">
              Zenica · BiH
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6">
            Precizno Šišanje.
            <br />
            <span className="text-forest">Brzi Fade.</span>
            <br />
            Moderni Stil.
          </h1>

          <p className="text-lg md:text-xl text-white/80 font-body mb-10 max-w-xl">
            Ko jednom dođe u naš salon, uvijek se vraća.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#usluge" className="btn-primary">
              <Scissors size={18} className="mr-2" /> Rezerviši termin
            </a>
            <a href="#barberi" className="btn-outline">
              Upoznaj naše barberi
            </a>
          </div>

          <div className="mt-16 flex items-center gap-8 text-white/60">
            <div>
              <div className="font-heading text-3xl font-bold text-white">8+</div>
              <div className="text-xs uppercase tracking-wide">Godina iskustva</div>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div>
              <div className="font-heading text-3xl font-bold text-white">2</div>
              <div className="text-xs uppercase tracking-wide">Barber stolice</div>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div>
              <div className="font-heading text-3xl font-bold text-white">8</div>
              <div className="text-xs uppercase tracking-wide">Usluga</div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#usluge"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white animate-bounce"
      >
        <ArrowDown size={28} />
      </a>
    </section>
  );
}
