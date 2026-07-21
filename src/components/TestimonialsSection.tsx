import { Star, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Sulejman', age: 27, text: 'Najbolji fade u Zenici, nema dileme. Svaki put tačno ono što tražim.' },
  { name: 'Amar', age: 24, text: 'Profesionalan pristup, brzo i precizno. Ne idem nigdje drugo.' },
  { name: 'Denis', age: 31, text: 'Brada mi nikad nije bila ovako uredna. Preporuka za sve.' },
  { name: 'Haris', age: 19, text: 'Cijena i kvalitet u savršenom balansu. Vrhunski rad.' },
  { name: 'Mirza', age: 35, text: 'Deca kod njega šišam bez stresa. Strpljiv i precizan.' },
];

export function TestimonialsSection() {
  return (
    <section id="recenzije" className="bg-charcoal text-white section-pad relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-burgundy to-transparent" />

      <div className="container-x px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="font-heading uppercase text-sm tracking-[0.3em] text-forest mb-3 inline-block">
            Recenzije
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Šta kažu naši klijenti</h2>
          <div className="h-1 w-20 bg-burgundy mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 p-6 backdrop-blur-sm hover:border-forest transition-colors group"
            >
              <Quote size={28} className="text-forest mb-4 group-hover:text-burgundy transition-colors" />
              <p className="text-white/90 text-sm mb-5 leading-relaxed font-body italic">
                "{t.text}"
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <div className="font-heading uppercase font-bold text-white">{t.name}</div>
                  <div className="text-xs text-white/50">{t.age} godina</div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="text-forest" fill="#1A4731" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
