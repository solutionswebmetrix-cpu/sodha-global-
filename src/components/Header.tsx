import { useState, useEffect } from 'react';
import { Link, useRouter } from '@/hooks/useRouter';
import Logo from './Logo';
import { Search, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Our Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Quality', to: '/quality' },
  { label: 'Contact', to: '/contact' },
];

interface HeaderProps {
  onSearchClick: () => void;
}

export default function Header({ onSearchClick }: HeaderProps) {
  const { path } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (to: string) =>
    to === '/' ? path === '/' : path.startsWith(to);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ivory-50/95 shadow-sm backdrop-blur-md'
            : 'bg-charcoal-950/25 backdrop-blur-sm'
        }`}
        style={{ height: scrolled ? '64px' : '80px' }}
      >
        <div className="container-luxury flex h-full items-center justify-between">
          {/* Left: Logo (desktop) / Logo (mobile) */}
          <div className="flex items-center gap-3">
            <button
              className={`lg:hidden ${scrolled ? 'text-charcoal-900' : 'text-ivory-50'}`}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 text-charcoal-900" />
            </button>
            <Logo />
          </div>

          {/* Center: Nav (desktop) */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActive(link.to)
                    ? 'text-copper-600'
                    : scrolled
                      ? 'text-charcoal-700 hover:text-copper-600'
                      : 'text-ivory-100 hover:text-ivory-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 sm:gap-5">
            <button
              onClick={onSearchClick}
              aria-label="Search"
              className={`transition-colors hover:text-copper-600 ${
                scrolled ? 'text-charcoal-700' : 'text-ivory-50'
              }`}
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-charcoal-950/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-ivory-50 shadow-2xl animate-slide-down">
            <div className="flex items-center justify-between border-b border-ivory-200 px-6 py-5">
              <Logo />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6 text-charcoal-900" />
              </button>
            </div>
            <nav className="flex flex-col px-6 py-6">
              {NAV_LINKS.map((link, idx) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`border-b border-ivory-200 py-4 font-display text-xl transition-colors ${
                    isActive(link.to) ? 'text-copper-600' : 'text-charcoal-900'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-eyebrow mr-3 text-[0.6rem]">0{idx + 1}</span>
                  {link.label}
                </Link>
              ))}
              <Link
                to="/faq"
                className="border-b border-ivory-200 py-4 font-display text-xl text-charcoal-900"
                onClick={() => setMobileOpen(false)}
              >
                <span className="text-eyebrow mr-3 text-[0.6rem]">06</span>
                FAQ
              </Link>
            </nav>
            <div className="px-6 py-6">
              <p className="text-eyebrow mb-2">Contact</p>
              <a
                href="mailto:sodhaglobal@gmail.com"
                className="block text-sm text-charcoal-700"
              >
                sodhaglobal@gmail.com
              </a>
              <a
                href="tel:+918918144967"
                className="mt-1 block text-sm text-charcoal-700"
              >
                +91 89181 44967
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
