import { Facebook, Phone, MapPin } from 'lucide-react';
import { FACEBOOK_LINK, PHONE_NUMBER, MAPS_LINK } from '../lib/constants';

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container-x px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left: logo */}
          <div>
            <div className="mb-4">
              <img src="/sthairdesign-logo.png" alt="St Hairdesign" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-white/50 text-sm max-w-xs">
              Moderni muški frizerski salon u Zenici. Preciznost, brzina, stil.
            </p>
          </div>

          {/* Right: contact */}
          <div className="md:text-right">
            <h3 className="font-heading uppercase text-lg font-bold mb-4 text-white">
              Kontaktirajte nas
            </h3>
            <div className="space-y-3 md:flex md:flex-col md:items-end">
              <a
                href={FACEBOOK_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors md:justify-end group"
              >
                <Facebook size={18} className="text-forest group-hover:text-burgundy transition-colors" />
                <span className="font-body">ST Hairdesign</span>
              </a>

              <a
                href={`tel:+${PHONE_NUMBER.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors md:justify-end group"
              >
                <Phone size={18} className="text-forest group-hover:text-burgundy transition-colors" />
                <span className="font-body">{PHONE_NUMBER}</span>
              </a>

              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors md:justify-end group"
              >
                <MapPin size={18} className="text-forest group-hover:text-burgundy transition-colors" />
                <span className="font-body">Zenica, BiH</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} St Hairdesign. Sva prava zadržana.
          </p>
          <p className="text-white/40 text-xs font-heading uppercase tracking-wide">
            Sulejman Turanović
          </p>
        </div>
      </div>
    </footer>
  );
}
