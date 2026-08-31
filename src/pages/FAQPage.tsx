import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Link } from '@/hooks/useRouter';
import { ChevronDown, ArrowRight } from 'lucide-react';

const FAQS = [
  {
    q: 'What makes Sodha Global spices different from other brands?',
    a: 'We focus on careful sourcing, quality-focused selection and small-batch processing to preserve the natural oils and aromatics of each spice. Our products are selected for consistent quality, authentic flavour and modern packaging standards.',
  },
  {
    q: 'Where are your spices sourced from?',
    a: 'Our spices are sourced from trusted growing regions across India, chosen for their ideal climate and soil conditions for each specific spice.',
  },
  {
    q: 'How should I store my spices?',
    a: 'Store all spices in a cool, dry place away from direct sunlight. Seal the packaging tightly after each use to preserve colour, aroma and flavour. Avoid storing spices near heat sources or in humid environments.',
  },
  {
    q: 'What is the shelf life of your products?',
    a: 'For the best flavour and aroma, we recommend using our ground spices within 12 months and whole spices within 18-24 months of purchase. Always check the packaging for specific guidance.',
  },
  {
    q: 'Do you ship across India?',
    a: 'Yes, we ship across India. Shipping costs and delivery times vary by location. Please see our Shipping Policy for more details.',
  },
  {
    q: 'What is your return and refund policy?',
    a: 'We accept returns for unopened and undamaged products within 7 days of delivery. Please see our Returns & Refunds Policy page for full details.',
  },
  {
    q: 'How can I track my order?',
    a: 'Once your order is dispatched, you will receive a confirmation email with tracking information. You can use this to track your delivery status.',
  },
  {
    q: 'Do you offer bulk or wholesale pricing?',
    a: 'For bulk or wholesale enquiries, please contact us at sodhaglobal@gmail.com or call +91 89181 44967, and our team will be happy to assist.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-ivory-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <h3 className="font-display text-lg font-medium text-charcoal-900">{q}</h3>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-charcoal-400 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-sm leading-relaxed text-charcoal-500">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="pt-28">
      <div className="container-luxury">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]} />
      </div>

      <section className="bg-ivory-100 py-12">
        <div className="container-luxury">
          <p className="text-eyebrow mb-3">Help & Support</p>
          <h1 className="text-display font-display font-semibold text-charcoal-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 max-w-xl text-lg text-charcoal-500">
            Find answers to common questions about our products, shipping and policies.
          </p>
        </div>
      </section>

      <section className="section-padding bg-ivory-50">
        <div className="container-luxury max-w-3xl">
          <div className="rounded-2xl bg-white px-6 sm:px-8">
            {FAQS.map((faq, idx) => (
              <FAQItem key={idx} q={faq.q} a={faq.a} />
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-charcoal-950 p-8 text-center sm:p-12">
            <h2 className="font-display text-2xl font-semibold text-ivory-50">
              Still Have Questions?
            </h2>
            <p className="mt-2 text-sm text-ivory-200/70">
              Our team is here to help. Reach out and we'll get back to you.
            </p>
            <Link to="/contact" className="btn-primary mt-6 bg-copper-600 hover:bg-copper-500">
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
