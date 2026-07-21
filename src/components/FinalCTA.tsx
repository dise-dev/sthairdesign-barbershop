import { Scissors, ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="relative bg-charcoal text-white py-20 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-forest via-burgundy to-forest" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'url(https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'grayscale(0.6) contrast(1.2)',
      }} />

      <div className="container-x relative z-10 px-4 sm:px-6 lg:px-8 text-center">
        <span className="font-heading uppercase text-sm tracking-[0.3em] text-forest mb-4 inline-block">
          Spremni?
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[0.95]">
          Rezerviši svoj termin.
          <br />
          <span className="text-forest">Danas.</span>
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
          Jedan klik do preciznog šišanja. Bez čekanja, bez komplikacija.
        </p>
        <a href="#usluge" className="btn-primary text-lg !px-12 !py-5">
          <Scissors size={20} className="mr-2" /> Rezerviši termin
          <ArrowRight size={18} className="ml-2" />
        </a>
      </div>
    </section>
  );
}
