import { useState } from 'react';
import { Link } from '@/hooks/useRouter';
import { subscribeNewsletter } from '@/services/products';
import { Mail, Phone, MapPin, ArrowRight, Check } from 'lucide-react';

const EXPLORE_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Our Products', to: '/products' },
  { label: 'About Us', to: '/about' },
  { label: 'Quality', to: '/quality' },
  { label: 'Contact', to: '/contact' },
];

const CUSTOMER_LINKS = [
  { label: 'FAQ', to: '/faq' },
  { label: 'Shipping Policy', to: '/shipping' },
  { label: 'Returns & Refunds', to: '/returns' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      await subscribeNewsletter(email.trim());
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-charcoal-950 text-ivory-100">
      {/* Newsletter band */}
      <div className="border-b border-charcoal-800">
        <div className="container-luxury py-12">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-md">
              <h3 className="font-display text-2xl font-semibold text-ivory-50">
                Join the Sodha Circle
              </h3>
              <p className="mt-2 text-sm text-ivory-200/70">
                Subscribe for product updates, recipes, and stories from the world of spices.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="w-full max-w-md">
              <div className="flex items-center gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 rounded-full border border-charcoal-700 bg-charcoal-900 px-5 py-3 text-sm text-ivory-50 placeholder:text-ivory-200/40 focus:border-copper-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-copper-600 text-ivory-50 transition-colors hover:bg-copper-500 disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  {status === 'success' ? (
                    <Check className="h-5 w-5" />
                  ) : status === 'loading' ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-ivory-50 border-t-transparent" />
                  ) : (
                    <ArrowRight className="h-5 w-5" />
                  )}
                </button>
              </div>
              {status === 'success' && (
                <p className="mt-2 text-xs text-sage-300">
                  Thank you for subscribing!
                </p>
              )}
              {status === 'error' && (
                <p className="mt-2 text-xs text-copper-300">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-luxury py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="font-display text-2xl font-bold text-ivory-50">SODHA</span>
              <span className="ml-2 text-[0.6rem] font-medium uppercase tracking-[0.4em] text-copper-400">
                Global
              </span>
            </div>
            <p className="text-sm leading-relaxed text-ivory-200/60">
              Authentic Indian spices and premium peanuts, carefully sourced for exceptional
              flavour, purity and everyday excellence.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-copper-400">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-ivory-200/70 transition-colors hover:text-ivory-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-copper-400">
              Customer
            </h4>
            <ul className="space-y-2.5">
              {CUSTOMER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-ivory-200/70 transition-colors hover:text-ivory-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-copper-400">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:sodhaglobal@gmail.com"
                  className="flex items-center gap-2 text-sm text-ivory-200/70 transition-colors hover:text-ivory-50"
                >
                  <Mail className="h-4 w-4 shrink-0 text-copper-500" />
                  sodhaglobal@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918918144967"
                  className="flex items-center gap-2 text-sm text-ivory-200/70 transition-colors hover:text-ivory-50"
                >
                  <Phone className="h-4 w-4 shrink-0 text-copper-500" />
                  +91 89181 44967
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-ivory-200/70">
                <MapPin className="h-4 w-4 shrink-0 text-copper-500" />
                India
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-charcoal-800">
        <div className="container-luxury py-6">
          <p className="text-center text-xs text-ivory-200/50">
            © 2026 Sodha Global. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
