import { useState, useEffect } from 'react';
import { Link } from '@/hooks/useRouter';
import { fetchProducts, PRODUCT_ASSET_MAP } from '@/services/products';
import type { ProductWithCategory } from '@/types';
import ProductCard from '@/components/ProductCard';
import AnimatedHeroHeading from '@/components/AnimatedHeroHeading';
import SectionHeading from '@/components/SectionHeading';
import { ProductGridSkeleton } from '@/components/Skeletons';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Package,
  Globe2,
  Flame,
  Sparkles,
  Heart,
} from 'lucide-react';

const SPICE_STORY = [
  {
    name: 'Golden Haldi',
    description: 'Deep, earthy turmeric with a warm golden hue — the soul of Indian cooking.',
    color: 'from-saffron-300 to-saffron-500',
    image: PRODUCT_ASSET_MAP.haldi.thumbnail,
  },
  {
    name: 'Fiery Mirch',
    description: 'Bold red chilli powder that brings vibrant colour and authentic heat.',
    color: 'from-copper-400 to-copper-600',
    image: PRODUCT_ASSET_MAP.mirch.thumbnail,
  },
  {
    name: 'Aromatic Jeera',
    description: 'Warm, earthy cumin seeds that release their oils when tempered in hot ghee.',
    color: 'from-earth-400 to-earth-600',
    image: PRODUCT_ASSET_MAP.jeera.thumbnail,
  },
  {
    name: 'Fresh Dhaniya',
    description: 'Citrusy, balanced coriander that forms the base of countless masalas.',
    color: 'from-sage-300 to-sage-500',
    image: PRODUCT_ASSET_MAP.dhaniya.thumbnail,
  },
  {
    name: 'Signature Garam Masala',
    description: 'A masterful blend of roasted spices for warmth, depth and complexity.',
    color: 'from-charcoal-600 to-charcoal-800',
    image: PRODUCT_ASSET_MAP['garam-masala'].thumbnail,
  },
  {
    name: 'Crunchy Peanuts',
    description: 'Carefully selected and roasted for a satisfying, wholesome crunch.',
    color: 'from-earth-300 to-copper-400',
    image: PRODUCT_ASSET_MAP.peanuts.thumbnail,
  },
];

const WHY_FEATURES = [
  {
    icon: Flame,
    title: 'Authentic Flavour',
    description: 'True Indian taste, crafted from carefully sourced ingredients.',
  },
  {
    icon: Leaf,
    title: 'Carefully Selected',
    description: 'Quality-focused sourcing from trusted growing regions.',
  },
  {
    icon: ShieldCheck,
    title: 'Consistent Quality',
    description: 'Reliable taste and product standards in every batch.',
  },
  {
    icon: Package,
    title: 'Hygienic Packaging',
    description: 'Designed for freshness, convenience and shelf appeal.',
  },
  {
    icon: Sparkles,
    title: 'Premium Ingredients',
    description: 'Selected for quality and culinary performance.',
  },
  {
    icon: Globe2,
    title: 'Global Vision',
    description: 'Built with modern consumers and wider markets in mind.',
  },
];

const STATS = [
  { label: 'Premium Ingredients', value: '100%' },
  { label: 'Carefully Sourced', value: 'Trusted' },
  { label: 'Quality Focused', value: 'Every Batch' },
  { label: 'Global Standards', value: 'Worldwide' },
];

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative flex min-h-screen items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/31280796/pexels-photo-31280796.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Indian spices in bowls on a dark textured background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/70 via-charcoal-950/50 to-charcoal-950/80" />
          <div className="absolute inset-0 bg-grain opacity-30 mix-blend-overlay" />
        </div>

        {/* Content */}
        <div className="container-luxury relative z-10 py-32 text-center">
          <p
            className="text-eyebrow mb-6 text-copper-300 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Sodha Global
          </p>
          <AnimatedHeroHeading
            wordDelay={600}
            pauseAfterComplete={1500}
            showCursor={true}
          />
          <p
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ivory-200/80 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.6s' }}
          >
            Authentic spices and premium ingredients, carefully sourced for exceptional
            flavour, purity and everyday excellence.
          </p>
          <div
            className="mt-10 flex flex-col items-center justify-center gap-4 opacity-0 animate-fade-up sm:flex-row"
            style={{ animationDelay: '0.8s' }}
          >
            <Link to="/products" className="btn-primary bg-copper-600 hover:bg-copper-500">
              Explore Our Collection
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="btn-secondary border-ivory-50/30 text-ivory-50 hover:border-ivory-50 hover:bg-ivory-50 hover:text-charcoal-900"
            >
              Discover Sodha Global
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <div className="flex h-10 w-6 justify-center rounded-full border border-ivory-50/30">
            <div className="mt-2 h-2 w-1 animate-float rounded-full bg-ivory-50/60" />
          </div>
        </div>
      </section>

      {/* ===== BRAND INTRODUCTION ===== */}
      <section className="section-padding bg-ivory-50">
        <div className="container-luxury">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left: Image */}
            <RevealSection>
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                  <img
                    src="https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg?auto=compress&cs=tinysrgb&w=1000"
                    alt="Vibrant array of spices including turmeric, cumin, and chili on a dark surface"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 overflow-hidden rounded-2xl border-8 border-ivory-50 sm:block">
                  <img
                    src="https://images.pexels.com/photos/4871347/pexels-photo-4871347.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Stone mortar and pestle with spices"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </RevealSection>

            {/* Right: Text + Stats */}
            <RevealSection>
              <div>
                <p className="text-eyebrow mb-4">Our Story</p>
                <h2 className="text-display font-display font-semibold text-charcoal-900">
                  Rooted in Tradition.
                  <br />
                  <span className="italic text-copper-600">Made for the World.</span>
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-charcoal-500">
                  Sodha Global was born from a deep respect for India's spice heritage and a
                  commitment to modern quality standards. We focus on quality ingredients,
                  authentic flavour, careful sourcing and consistent excellence — bringing the
                  true taste of Indian spices to kitchens across India and beyond.
                </p>

                <div className="mt-10 grid grid-cols-2 gap-6">
                  {STATS.map((stat) => (
                    <div key={stat.label} className="border-l-2 border-copper-500 pl-4">
                      <p className="font-display text-2xl font-semibold text-charcoal-900">
                        {stat.value}
                      </p>
                      <p className="text-sm text-charcoal-400">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <Link to="/about" className="btn-ghost mt-8 pl-0">
                  Read Our Story
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ===== PRODUCT COLLECTION ===== */}
      <section className="section-padding bg-ivory-100">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="The Collection"
            title="The Sodha Collection"
            subtitle="Pure ingredients. Distinctive flavour. Uncompromising quality."
          />

          <div className="mt-12">
            {loading ? (
              <ProductGridSkeleton count={6} />
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
                {products.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <Link to="/products" className="btn-primary">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SPICE STORY ===== */}
      <section className="section-padding bg-charcoal-950 text-ivory-50">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="The Colours of Flavour"
            title="The Colours of Flavour"
            subtitle="Each spice tells its own story — in colour, aroma and taste."
            light
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SPICE_STORY.map((spice, idx) => (
              <RevealSection key={spice.name}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <img
                    src={spice.image}
                    alt={spice.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[800ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-eyebrow mb-2 text-copper-300">
                      0{idx + 1}
                    </p>
                    <h3 className="font-display text-xl font-semibold text-ivory-50">
                      {spice.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ivory-200/70">
                      {spice.description}
                    </p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PREMIUM BRAND STATEMENT ===== */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/6808976/pexels-photo-6808976.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Vivid display of colorful spice powders in circular bowls"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal-950/60" />
        </div>
        <div className="container-luxury relative z-10 py-20 text-center">
          <RevealSection>
            <h2 className="mx-auto max-w-4xl text-display font-display font-semibold leading-tight text-ivory-50">
              Authentic Ingredients.
              <br />
              Timeless Flavour.
              <br />
              <span className="italic text-copper-300">Modern Standards.</span>
            </h2>
          </RevealSection>
        </div>
      </section>

      {/* ===== WHY SODHA GLOBAL ===== */}
      <section className="section-padding bg-ivory-50">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="Why Sodha Global"
            title="Crafted with Purpose"
            subtitle="Every detail — from sourcing to packaging — is considered with care."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_FEATURES.map((feature, idx) => (
              <RevealSection key={feature.title}>
                <div className="group h-full rounded-2xl border border-ivory-200 bg-white p-8 transition-all duration-500 hover:border-copper-300 hover:shadow-xl">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-ivory-100 transition-colors duration-500 group-hover:bg-copper-50">
                    <feature.icon className="h-7 w-7 text-copper-600" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-charcoal-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-500">
                    {feature.description}
                  </p>
                  <p className="text-eyebrow mt-4 text-[0.6rem] text-charcoal-300">
                    0{idx + 1}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden bg-earth-900 py-24">
        <div className="absolute inset-0 bg-grain opacity-20" />
        <div className="container-luxury relative z-10 text-center">
          <RevealSection>
            <p className="text-eyebrow mb-4 text-copper-300">Ready to Cook?</p>
            <h2 className="mx-auto max-w-3xl text-display font-display font-semibold text-ivory-50">
              Bring Better Flavour Home
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ivory-200/70">
              Explore the Sodha Global collection.
            </p>
            <Link to="/products" className="btn-primary mt-8 bg-copper-600 hover:bg-copper-500">
              Shop Our Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
