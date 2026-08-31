import { Link } from '@/hooks/useRouter';
import Breadcrumbs from '@/components/Breadcrumbs';
import SectionHeading from '@/components/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Leaf, ShieldCheck, Sparkles, Globe2, ArrowRight } from 'lucide-react';

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
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

const DIFFERENCES = [
  { icon: Leaf, title: 'Carefully Selected Ingredients', desc: 'We source from trusted growing regions, choosing each ingredient for quality and character.' },
  { icon: ShieldCheck, title: 'Quality-Focused Sourcing', desc: 'Every batch is inspected and sorted to meet our consistent quality standards.' },
  { icon: Sparkles, title: 'Authentic Flavour', desc: 'Our processing preserves the natural oils and aromatics that define true Indian taste.' },
  { icon: Globe2, title: 'Modern Packaging & Standards', desc: 'Hygienic, freshness-preserving packaging designed for modern kitchens and global markets.' },
];

export default function AboutPage() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/17870116/pexels-photo-17870116.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Colorful array of spices and dry goods at a bustling New Delhi market stall"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal-950/60" />
        </div>
        <div className="container-luxury relative z-10 py-20 text-center">
          <Reveal>
            <p className="text-eyebrow mb-4 text-copper-300">About Sodha Global</p>
            <h1 className="text-hero font-display font-bold text-ivory-50">
              From Indian Soil
              <br />
              <span className="italic font-medium text-copper-300">to Global Tables</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <div className="container-luxury">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About Us' }]} />
      </div>

      {/* Our Story */}
      <section className="section-padding bg-ivory-50">
        <div className="container-luxury">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  src="https://images.pexels.com/photos/2632292/pexels-photo-2632292.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Flat lay of colorful spices with metal spoons on a dark background"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal>
              <div>
                <p className="text-eyebrow mb-4">Our Story</p>
                <h2 className="text-display font-display font-semibold text-charcoal-900">
                  A Brand Born from Respect for Spice
                </h2>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-charcoal-500">
                  <p>
                    Sodha Global was founded with a singular vision: to bring the authentic
                    taste of Indian spices to kitchens around the world, without compromising
                    on quality, purity or flavour.
                  </p>
                  <p>
                    India's relationship with spice spans millennia — it is woven into the
                    culture, the cuisine and the very identity of the subcontinent. We honour
                    that heritage by sourcing carefully, processing thoughtfully and packaging
                    with modern standards.
                  </p>
                  <p>
                    From the golden fields of turmeric to the fiery red of chilli, from
                    aromatic cumin to the complex warmth of garam masala, every product in our
                    collection is selected to deliver an exceptional culinary experience.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="section-padding bg-charcoal-950 text-ivory-50">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="Our Philosophy"
            title="Quality. Authenticity. Purity. Consistency."
            subtitle="Four principles that guide every decision we make — from sourcing to your kitchen."
            light
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Quality', desc: 'Every batch meets our consistent quality standards.' },
              { title: 'Authenticity', desc: 'True Indian flavour, never compromised.' },
              { title: 'Purity', desc: 'No unnecessary additives. Just real ingredients.' },
              { title: 'Consistency', desc: 'Reliable taste and performance, batch after batch.' },
            ].map((item, idx) => (
              <Reveal key={item.title}>
                <div className="rounded-2xl border border-charcoal-800 p-8 transition-colors hover:border-copper-600">
                  <p className="text-eyebrow mb-4 text-copper-300">0{idx + 1}</p>
                  <h3 className="font-display text-2xl font-semibold text-ivory-50">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory-200/60">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="section-padding bg-ivory-50">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="What Makes Us Different"
            title="The Sodha Difference"
            subtitle="Considered choices at every step of the journey."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {DIFFERENCES.map((item, idx) => (
              <Reveal key={item.title}>
                <div className="group flex h-full gap-5 rounded-2xl border border-ivory-200 bg-white p-8 transition-all hover:shadow-xl">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ivory-100 transition-colors group-hover:bg-copper-50">
                    <item.icon className="h-7 w-7 text-copper-600" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-charcoal-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-500">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/products" className="btn-primary">
              Explore Our Collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
