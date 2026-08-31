import Breadcrumbs from '@/components/Breadcrumbs';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function LegalPage({
  title,
  breadcrumb,
  sections,
}: {
  title: string;
  breadcrumb: string;
  sections: { heading: string; body: string[] }[];
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div className="pt-28">
      <div className="container-luxury">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: breadcrumb }]} />
      </div>

      <section className="bg-ivory-100 py-12">
        <div className="container-luxury">
          <p className="text-eyebrow mb-3">Legal</p>
          <h1 className="text-display font-display font-semibold text-charcoal-900">{title}</h1>
          <p className="mt-3 text-sm text-charcoal-400">Last updated: August 2026</p>
        </div>
      </section>

      <section className="section-padding bg-ivory-50">
        <div className="container-luxury max-w-3xl">
          <div
            ref={ref}
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="space-y-10">
              {sections.map((section, idx) => (
                <div key={idx}>
                  <h2 className="font-display text-xl font-semibold text-charcoal-900">
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {section.body.map((para, pIdx) => (
                      <p key={pIdx} className="text-sm leading-relaxed text-charcoal-500">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
