import { Award, Repeat, Scissors } from 'lucide-react';

const barbers = [
  {
    name: 'Sulejman Turanović',
    role: 'Founder & Master Barber',
    image: '/sulejman-barber.jpg',
  },
  {
    name: 'Edvin Šahinović',
    role: 'Barber',
    image: '/saha-barber.jpg',
  },
];

const credentials = [
  { icon: Award, title: '8+ godina iskustva', desc: 'Godine rada s različitim tipovima kose i stilova.' },
  { icon: Repeat, title: 'Konzistentnost', desc: 'Svaki rezultat mora biti isti — vrhunski.' },
  { icon: Scissors, title: 'Sve vrste frizura', desc: 'Specijalist za moderne fade i muške stilove.' },
];

export function BarbersSection() {
  return (
    <section id="barberi" className="bg-charcoal text-white section-pad relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest to-transparent" />

      <div className="container-x px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="font-heading uppercase text-sm tracking-[0.3em] text-forest mb-3 inline-block">
            Naš tim
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Upoznajte Barbere</h2>
          <div className="h-1 w-20 bg-burgundy mx-auto" />
        </div>

        {/* Barber profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {barbers.map((b) => (
            <div key={b.name} className="group relative overflow-hidden">
              <div className="relative h-[420px] overflow-hidden">
                <img
                  src={b.image}
                  alt={b.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'grayscale(0.4) contrast(1.15) brightness(0.85)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block bg-forest text-white text-xs font-heading uppercase tracking-wider px-3 py-1 mb-3">
                    {b.role}
                  </span>
                  <h3 className="text-3xl font-bold text-white">{b.name}</h3>
                </div>
                <div className="absolute top-0 left-0 w-1 h-full bg-forest group-hover:bg-burgundy transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Credentials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {credentials.map((c) => (
            <div key={c.title} className="bg-white/5 border-l-4 border-forest p-6 backdrop-blur-sm">
              <c.icon size={32} className="text-forest mb-4" />
              <h3 className="text-xl font-bold mb-2">{c.title}</h3>
              <p className="text-white/70 text-sm">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Two-chair setup imagery */}
        <div className="relative h-72 md:h-96 overflow-hidden group">
          <img
            src="https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Barbershop interijer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ filter: 'grayscale(0.35) contrast(1.15) brightness(0.8) saturate(1.1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
            <span className="font-heading uppercase text-xs tracking-[0.3em] text-forest mb-2 inline-block">
              Naš prostor
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Dvije stolice · Dva barbera · Nula čekanja
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
