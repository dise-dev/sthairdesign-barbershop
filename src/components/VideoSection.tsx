import { Play, Heart } from 'lucide-react';

export function VideoSection() {
  return (
    <section id="video" className="bg-offwhite section-pad">
      <div className="container-x px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="font-heading uppercase text-sm tracking-[0.3em] text-burgundy mb-3 inline-block">
            Inicijativa
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4 max-w-3xl mx-auto leading-tight">
            Besplatnim šišanjem smo počastili jednog sretnog prolaznika
          </h2>
          <div className="h-1 w-20 bg-forest mx-auto mb-4" />
          <p className="text-charcoal/70 max-w-2xl mx-auto">
            Sulejman Turanović — poznati digitalni kreator iz Zenice — dijeli besplatne šišanja prolaznicima na ulici.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto group cursor-pointer">
          <div className="relative aspect-video bg-charcoal overflow-hidden">
            <img
              src="https://images.pexels.com/photos/4503271/pexels-photo-4503271.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Video spot"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ filter: 'grayscale(0.4) contrast(1.15) brightness(0.7)' }}
            />
            <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-forest flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-burgundy group-hover:scale-110">
                  <Play size={36} className="text-white ml-1" fill="white" />
                </div>
                <p className="font-heading uppercase text-white text-sm tracking-[0.3em]">
                  Sledi uskoro
                </p>
              </div>
            </div>
            <div className="absolute top-4 left-4 bg-burgundy text-white px-3 py-1.5 flex items-center gap-2">
              <Heart size={14} fill="white" />
              <span className="font-heading uppercase text-xs tracking-wide">Besplatno šišanje</span>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-charcoal/10 -z-10" />
        </div>
      </div>
    </section>
  );
}
