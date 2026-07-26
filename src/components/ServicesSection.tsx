import { Clock, Tag, Smartphone, ExternalLink, Scissors } from 'lucide-react';
import { SERVICES, APP_LINK } from '../lib/constants';

export function ServicesSection() {
  return (
    <section id="usluge" className="bg-offwhite section-pad">
      <div className="container-x px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="font-heading uppercase text-sm tracking-[0.3em] text-burgundy mb-3 inline-block">
            Naše usluge
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Usluge & Cjenovnik
          </h2>
          <div className="h-1 w-20 bg-forest mx-auto mb-4" />
          <p className="text-charcoal/70 max-w-2xl mx-auto">
            Izaberite uslugu i rezervišite termin po želji. Sve rezervacije vrše se isključivo putem naše aplikacije — jednim klikom na „Rezerviši Termin".
          </p>
        </div>

        {/* Services list */}
        <div className="max-w-4xl mx-auto bg-white shadow-lg border-t-4 border-forest overflow-hidden">
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              className={`flex items-center gap-4 sm:gap-6 px-5 sm:px-8 py-5 sm:py-6 transition-colors hover:bg-forest/5 ${
                i !== SERVICES.length - 1 ? 'border-b border-charcoal/10' : ''
              }`}
            >
              <div className="hidden sm:flex flex-shrink-0 w-10 h-10 bg-charcoal text-white items-center justify-center font-heading font-bold text-sm">
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-heading uppercase font-bold text-lg sm:text-xl text-charcoal truncate">
                  {service.name}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-charcoal/60">
                  <Clock size={14} className="text-forest" />
                  <span>{service.duration} min</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Tag size={16} className="text-burgundy hidden sm:block" />
                <span className="font-heading font-bold text-xl sm:text-2xl text-charcoal">
                  {service.price} <span className="text-sm text-charcoal/60">KM</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Single CTA to app */}
        <div className="text-center mt-12">
          <a
            href={APP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg !px-10 !py-5"
          >
            <Smartphone size={20} className="mr-2" /> Rezerviši Termin
            <ExternalLink size={16} className="ml-2" />
          </a>
          <p className="mt-4 text-sm text-charcoal/50 flex items-center justify-center gap-2">
            <Scissors size={14} className="text-forest" />
            Rezervacije samo putem aplikacije — dostupna na Google Play
          </p>
        </div>
      </div>
    </section>
  );
}
