import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { ServicesSection } from './ServicesSection';
import { ProductsSection } from './ProductsSection';
import { BarbersSection } from './BarbersSection';
import { VideoSection } from './VideoSection';
import { TestimonialsSection } from './TestimonialsSection';
import { LocationSection } from './LocationSection';
import { FinalCTA } from './FinalCTA';
import { Footer } from './Footer';

export function HomePage() {
  return (
    <div className="min-h-screen bg-offwhite">
      <Navbar />
      <Hero />
      <ServicesSection />
      <ProductsSection />
      <BarbersSection />
      <VideoSection />
      <TestimonialsSection />
      <LocationSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
