import { SERVICES } from '../lib/constants';
import { ServiceCard } from './ServiceCard';

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
            Izaberite uslugu, odaberite dan i vrijeme, i rezervišite termin u jednom kliku.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
