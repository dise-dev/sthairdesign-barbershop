import { useEffect, useState, useRef } from 'react';
import { Scissors, ArrowDown } from 'lucide-react';

const LINES = ['Precizno Šišanje.', 'Brzi Fade.', 'Moderni Stil.'];

export function Hero() {
  const [phase, setPhase] = useState<'location' | 'title' | 'subtitle' | 'buttons' | 'stats'>('location');
  const [typed, setTyped] = useState<string[]>(['', '', '']);
  const [currentLine, setCurrentLine] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const addTimer = (fn: () => void, delay: number) => {
      const t = setTimeout(fn, delay);
      timersRef.current.push(t);
    };

    // 1. Location slides in from left (0–800ms)
    addTimer(() => setPhase('title'), 900);

    // 2. Typewriter title sequence (starts at 900ms)
    // Each char takes 60ms; pause 400ms after each line completes
    let elapsed = 900;
    LINES.forEach((line, lineIdx) => {
      for (let i = 1; i <= line.length; i++) {
        addTimer(() => {
          setTyped(prev => {
            const next = [...prev];
            next[lineIdx] = line.slice(0, i);
            return next;
          });
          setCurrentLine(lineIdx);
        }, elapsed);
        elapsed += 60;
      }
      // Move cursor to next line after a pause
      elapsed += 400;
      addTimer(() => setCurrentLine(lineIdx + 1), elapsed - 400);
    });

    // 3. Subtitle fades up
    addTimer(() => setPhase('subtitle'), elapsed + 200);
    // 4. Buttons fade up
    addTimer(() => setPhase('buttons'), elapsed + 600);
    // 5. Stats fade up
    addTimer(() => setPhase('stats'), elapsed + 1000);

    return () => {
      timersRef.current.forEach(t => clearTimeout(t));
    };
  }, []);

  const showSubtitle = phase === 'subtitle' || phase === 'buttons' || phase === 'stats';
  const showButtons = phase === 'buttons' || phase === 'stats';
  const showStats = phase === 'stats';

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
        <div className="max-w-3xl">
          {/* Location — slides in from left first */}
          <div className="flex items-center gap-3 mb-6 animate-slide-left">
            <div className="h-px w-12 bg-forest" />
            <span className="font-heading uppercase text-sm tracking-[0.3em] text-forest">
              Zenica · BiH
            </span>
          </div>

          {/* Title — typewriter effect, line by line */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6 min-h-[3em]">
            {typed[0]}
            {currentLine === 0 && phase === 'title' && (
              <span className="animate-blink">|</span>
            )}
            <br />
            <span className="text-forest">{typed[1]}</span>
            {currentLine === 1 && phase === 'title' && (
              <span className="text-forest animate-blink">|</span>
            )}
            <br />
            {typed[2]}
            {currentLine === 2 && phase === 'title' && (
              <span className="animate-blink">|</span>
            )}
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg md:text-xl text-white/80 font-body mb-10 max-w-xl transition-all duration-700 ${
              showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Ko jednom dođe u naš salon, uvijek se vraća.
          </p>

          {/* Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${
              showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <a href="#usluge" className="btn-primary">
              <Scissors size={18} className="mr-2" /> Rezerviši termin
            </a>
            <a href="#barberi" className="btn-outline">
              Upoznaj naše barberi
            </a>
          </div>

          {/* Stats */}
          <div
            className={`mt-16 flex items-center gap-8 text-white/60 transition-all duration-700 ${
              showStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div>
              <div className="text-3xl font-bold text-white">10+</div>
              <div className="text-sm uppercase tracking-wide">Godina iskustva</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <div className="text-3xl font-bold text-white">5000+</div>
              <div className="text-sm uppercase tracking-wide">Zadovoljnih klijenata</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <div className="text-3xl font-bold text-white">3</div>
              <div className="text-sm uppercase tracking-wide"> Barbera</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 transition-all duration-700 ${
          showStats ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ArrowDown size={24} className="animate-bounce" />
      </div>
    </section>
  );
}
