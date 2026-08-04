import { useState } from 'react';
import { ShoppingBag, LogIn, Info, Check, Loader2, Package } from 'lucide-react';
import { useCustomerAuth } from '../lib/customer-auth-context';
import { useToast } from './Toast';
import { supabase } from '../lib/supabase';
import { HAIR_PRODUCTS, BEARD_PRODUCTS, type Product } from '../lib/constants';

function ProductCard({ product }: { product: Product }) {
  const { user, signInWithGoogle } = useCustomerAuth();
  const { showToast } = useToast();
  const [ordering, setOrdering] = useState(false);

  const handleOrder = async () => {
    if (!user) {
      showToast('Morate se prijaviti putem Google-a da biste naručili.', 'info');
      await signInWithGoogle();
      return;
    }

    setOrdering(true);
    const { error } = await supabase.from('product_orders').insert({
      user_id: user.id,
      user_email: user.email ?? '',
      user_name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? null,
      product_category: product.category,
      product_name: product.name,
      price: product.price,
    });

    setOrdering(false);

    if (error) {
      showToast('Greška pri naručivanju. Pokušajte ponovo.', 'error');
      return;
    }

    showToast(`Narudžba za "${product.name}" uspješno kreirana!`, 'success');
  };

  return (
    <div className="group bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-charcoal/5 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-offwhite">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-charcoal text-white px-3 py-1 font-heading font-bold text-sm">
          {product.price} KM
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h4 className="font-heading font-bold text-charcoal text-sm sm:text-base mb-3 flex-1">
          {product.name}
        </h4>
        <button
          onClick={handleOrder}
          disabled={ordering}
          className="w-full flex items-center justify-center gap-2 bg-forest text-white px-3 py-2.5 font-heading uppercase text-xs tracking-wide font-bold transition-all hover:bg-[#1d8a52] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {ordering ? (
            <>
              <Loader2 size={14} className="animate-spin" /> Naručivanje...
            </>
          ) : !user ? (
            <>
              <LogIn size={14} /> Naruči uz preuzimanje
            </>
          ) : (
            <>
              <ShoppingBag size={14} /> Naruči uz preuzimanje
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function ProductGroup({ subtitle, products }: { subtitle: string; products: Product[] }) {
  return (
    <div className="mb-16">
      <h3 className="text-2xl md:text-3xl font-heading font-bold text-charcoal mb-2 flex items-center gap-3">
        <span className="h-8 w-1.5 bg-forest" />
        {subtitle}
      </h3>
      <div className="h-px w-full bg-charcoal/10 mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export function ProductsSection() {
  const { user, signOut } = useCustomerAuth();

  return (
    <section id="preparati" className="bg-offwhite section-pad">
      <div className="container-x px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-heading uppercase text-sm tracking-[0.3em] text-burgundy mb-3 inline-block">
            Naša ponuda
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Preparati za njegu kose i brade
          </h2>
          <div className="h-1 w-20 bg-forest mx-auto mb-4" />
        </div>

        {/* Disclaimer */}
        <div className="max-w-3xl mx-auto mb-12 bg-white border-l-4 border-burgundy px-5 py-4 shadow-sm flex items-start gap-3">
          <Info size={20} className="text-burgundy flex-shrink-0 mt-0.5" />
          <p className="text-sm text-charcoal/70">
            Preuzimanje i plaćanje se vrši direktno u objektu. Naručite online, a mi ćemo
            Vam pripremiti proizvod za preuzimanje u salonu.
          </p>
        </div>

        {/* Auth status bar */}
        <div className="max-w-3xl mx-auto mb-10 flex items-center justify-between bg-charcoal text-white px-5 py-3">
          {user ? (
            <>
              <div className="flex items-center gap-2 text-sm">
                <Check size={16} className="text-forest" />
                Prijavljeni ste kao <span className="font-bold">{user.email}</span>
              </div>
              <button
                onClick={() => signOut()}
                className="text-xs font-heading uppercase tracking-wide text-white/60 hover:text-white transition-colors"
              >
                Odjava
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Package size={16} className="text-forest" />
                Prijavite se putem Google-a za narudžbu
              </div>
              <span className="text-xs text-white/50">Klikom na narudžbu</span>
            </>
          )}
        </div>

        {/* Product groups */}
        <div className="max-w-5xl mx-auto">
          <ProductGroup subtitle="Preparati za kosu" products={HAIR_PRODUCTS} />
          <ProductGroup subtitle="Balzam za bradu" products={BEARD_PRODUCTS} />
        </div>
      </div>
    </section>
  );
}
