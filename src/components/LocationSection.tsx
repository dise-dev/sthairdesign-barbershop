import { MapPin, Clock, Phone, ExternalLink } from 'lucide-react';
import { MAPS_LINK, PHONE_NUMBER } from '../lib/constants';

export function LocationSection() {
  return (
    <section id="lokacija" className="bg-offwhite section-pad">
      <div className="container-x px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="font-heading uppercase text-sm tracking-[0.3em] text-burgundy mb-3 inline-block">
            Posjetite nas
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Gdje se nalazimo?
          </h2>
          <div className="h-1 w-20 bg-forest mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="flex flex-col justify-center space-y-6">
            <div className="bg-white border-l-4 border-forest p-6">
              <div className="flex items-start gap-4">
                <MapPin size={24} className="text-forest flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading uppercase text-lg font-bold text-charcoal mb-1">Adresa</h3>
                  <p className="text-charcoal/70">Zenica, Bosna i Hercegovina</p>
                  <p className="text-charcoal/70">Aleja Šehida bb</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-l-4 border-burgundy p-6">
              <div className="flex items-start gap-4">
                <Phone size={24} className="text-burgundy flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading uppercase text-lg font-bold text-charcoal mb-1">Telefon</h3>
                  <p className="text-charcoal/70">{PHONE_NUMBER}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-l-4 border-midgray p-6">
              <div className="flex items-start gap-4">
                <Clock size={24} className="text-midgray flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading uppercase text-lg font-bold text-charcoal mb-1">Radno vrijeme</h3>
                  <p className="text-charcoal/70">Pon — Sub: 09:00 — 19:00</p>
                  <p className="text-charcoal/70">Nedjelja: Ne radimo</p>
                </div>
              </div>
            </div>

            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MapPin size={18} className="mr-2" /> Otvori u Google Maps
              <ExternalLink size={14} className="ml-2" />
            </a>
          </div>

          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block bg-charcoal overflow-hidden group min-h-[400px]"
          >
            <div className="absolute inset-0" style={{
              backgroundImage: 'url(https://images.pexels.com/photos/417073/pexels-photo-417073.jpeg?auto=compress&cs=tinysrgb&w=1200)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(0.5) contrast(1.1) brightness(0.7)',
            }} />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-forest flex items-center justify-center mb-4 group-hover:bg-burgundy transition-colors">
                <MapPin size={32} className="text-white" />
              </div>
              <h3 className="font-heading uppercase text-white text-xl font-bold mb-2">
                St Hairdesign
              </h3>
              <p className="text-white/80 text-sm mb-1">Zenica, BiH · Aleja Šehida bb</p>
              <span className="inline-flex items-center gap-1 text-forest text-xs font-heading uppercase tracking-wide mt-2 group-hover:text-burgundy transition-colors">
                Klikni za upute <ExternalLink size={12} />
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
