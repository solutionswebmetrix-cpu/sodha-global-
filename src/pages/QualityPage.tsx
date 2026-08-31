import Breadcrumbs from '@/components/Breadcrumbs';
import SectionHeading from '@/components/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from '@/hooks/useRouter';
import { ArrowRight } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Sourcing',
    desc: 'Carefully selected raw ingredients from trusted growing regions across India.',
    image: 'https://images.pexels.com/photos/16238699/pexels-photo-16238699.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    num: '02',
    title: 'Selection',
    desc: 'Quality inspection and sorting to ensure only the best ingredients move forward.',
    image: 'https://images.pexels.com/photos/37386773/pexels-photo-37386773.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    num: '03',
    title: 'Processing',
    desc: 'Handled with care to preserve quality, flavour and natural aroma.',
    image: 'https://images.pexels.com/photos/4871289/pexels-photo-4871289.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    num: '04',
    title: 'Packaging',
    desc: 'Secure and hygienic packaging designed to preserve freshness and flavour.',
    image: 'https://images.pexels.com/photos/4194077/pexels-photo-4194077.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    num: '05',
    title: 'Delivered',
    desc: 'Ready for kitchens across India and beyond — from our hands to yours.',
    image: 'https://images.pexels.com/photos/3368291/pexels-photo-3368291.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

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

export default function QualityPage() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/4871347/pexels-photo-4871347.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Stone mortar and pestle with a mix of spices on a wooden surface"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal-950/60" />
        </div>
        <div className="container-luxury relative z-10 py-20 text-center">
          <Reveal>
            <p className="text-eyebrow mb-4 text-copper-300">Our Quality Promise</p>
            <h1 className="text-hero font-display font-bold text-ivory-50">
              Quality You Can Taste
            </h1>
          </Reveal>
        </div>
      </section>

      <div className="container-luxury">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Quality' }]} />
      </div>

      {/* Intro */}
      <section className="section-padding bg-ivory-50">
        <div className="container-luxury">
          <SectionHeading
            eyebrow="The Journey"
            title="From Source to Shelf"
            subtitle="Every product follows a careful journey — five steps that ensure quality at every stage."
          />
        </div>
      </section>

      {/* Timeline — Desktop horizontal / Mobile vertical */}
      <section className="bg-ivory-100 py-12 lg:py-20">
        <div className="container-luxury">
          {/* Desktop: horizontal */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-0 right-0 top-[180px] h-px bg-ivory-300" />
              <div className="grid grid-cols-5 gap-4">
                {STEPS.map((step, idx) => (
                  <Reveal key={step.num}>
                    <div className="group text-center">
                      <div className="relative mx-auto mb-6 aspect-square w-48 overflow-hidden rounded-2xl">
                        <img
                          src={step.image}
                          alt={step.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-charcoal-950/30 transition-opacity group-hover:bg-charcoal-950/10" />
                        <span className="absolute left-3 top-3 font-display text-2xl font-bold text-ivory-50">
                          {step.num}
                        </span>
                      </div>
                      <div className="relative">
                        <div className="absolute -top-[44px] left-1/2 h-6 w-6 -translate-x-1/2 rounded-full border-4 border-ivory-100 bg-copper-600" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-charcoal-900">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-500">
                        {step.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: vertical */}
          <div className="lg:hidden">
            <div className="relative space-y-8 pl-8">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-ivory-300" />
              {STEPS.map((step) => (
                <Reveal key={step.num}>
                  <div className="group relative">
                    <div className="absolute -left-[26px] top-2 h-6 w-6 rounded-full border-4 border-ivory-50 bg-copper-600" />
                    <div className="overflow-hidden rounded-2xl">
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={step.image}
                          alt={step.title}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="bg-white p-5">
                        <p className="text-eyebrow mb-1">{step.num}</p>
                        <h3 className="font-display text-lg font-semibold text-charcoal-900">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-charcoal-500">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-ivory-50">
        <div className="container-luxury text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-display font-display font-semibold text-charcoal-900">
              Taste the Difference
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-charcoal-500">
              Experience the quality that defines every Sodha Global product.
            </p>
            <Link to="/products" className="btn-primary mt-8">
              Shop Our Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
