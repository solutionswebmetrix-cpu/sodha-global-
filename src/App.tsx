import { useState, useEffect, lazy, Suspense } from 'react';
import { RouterProvider, useRouter } from '@/hooks/useRouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ProductsPage = lazy(() => import('@/pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const QualityPage = lazy(() => import('@/pages/QualityPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const FAQPage = lazy(() => import('@/pages/FAQPage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const TermsPage = lazy(() => import('@/pages/TermsPage'));
const ShippingPage = lazy(() => import('@/pages/ShippingPage'));
const ReturnsPage = lazy(() => import('@/pages/ReturnsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// Admin pages
const AdminLoginPage = lazy(() => import('@/pages/admin/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'));
const AdminProductsPage = lazy(() => import('@/pages/admin/AdminProductsPage'));
const AdminRecommendationsPage = lazy(() => import('@/pages/admin/AdminRecommendationsPage'));
const AdminEnquiriesPage = lazy(() => import('@/pages/admin/AdminEnquiriesPage'));
const AdminOrdersPage = lazy(() => import('@/pages/admin/AdminOrdersPage'));

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center pt-28">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-charcoal-300 border-t-copper-600" />
    </div>
  );
}

function Routes() {
  const { path } = useRouter();

  // Parse product detail route
  const productMatch = path.match(/^\/products\/([^/]+)$/);

  let page: React.ReactNode;
  let pageKey = path;

  if (path === '/' || path === '') {
    page = <HomePage />;
  } else if (path === '/products') {
    page = <ProductsPage />;
  } else if (productMatch) {
    page = <ProductDetailPage slug={productMatch[1]} />;
    pageKey = `product-${productMatch[1]}`;
  } else if (path === '/about') {
    page = <AboutPage />;
  } else if (path === '/quality') {
    page = <QualityPage />;
  } else if (path === '/contact') {
    page = <ContactPage />;
  } else if (path === '/faq') {
    page = <FAQPage />;
  } else if (path === '/privacy') {
    page = <PrivacyPage />;
  } else if (path === '/terms') {
    page = <TermsPage />;
  } else if (path === '/shipping') {
    page = <ShippingPage />;
  } else if (path === '/returns') {
    page = <ReturnsPage />;
  } else if (path === '/admin/login') {
    page = <AdminLoginPage />;
  } else if (path === '/admin' || path === '/admin/') {
    page = <AdminDashboardPage />;
  } else if (path === '/admin/products') {
    page = <AdminProductsPage />;
  } else if (path === '/admin/recommendations') {
    page = <AdminRecommendationsPage />;
  } else if (path === '/admin/enquiries') {
    page = <AdminEnquiriesPage />;
  } else if (path === '/admin/orders') {
    page = <AdminOrdersPage />;
  } else {
    page = <NotFoundPage />;
  }

  return (
    <Suspense key={pageKey} fallback={<PageLoader />}>
      {page}
    </Suspense>
  );
}

function SEOManager() {
  const { path } = useRouter();

  useEffect(() => {
    const productMatch = path.match(/^\/products\/([^/]+)$/);

    let title = 'Sodha Global — Premium Indian Spices & Peanuts';
    let description = 'Authentic spices and premium ingredients, carefully sourced for exceptional flavour, purity and everyday excellence.';

    const pageTitles: Record<string, [string, string]> = {
      '/': ['Sodha Global — Premium Indian Spices & Peanuts', 'Authentic spices and premium ingredients, carefully sourced for exceptional flavour, purity and everyday excellence.'],
      '/products': ['Our Products — Sodha Global', 'Explore the Sodha Global collection of premium Indian spices, masalas, seeds and nuts.'],
      '/about': ['About Us — Sodha Global', 'Discover the story of Sodha Global — rooted in Indian tradition, crafted for the world.'],
      '/quality': ['Quality — Sodha Global', 'From sourcing to delivery, every step of our process is designed to preserve quality and flavour.'],
      '/contact': ['Contact Us — Sodha Global', 'Get in touch with Sodha Global. Email: sodhaglobal@gmail.com, Phone: +91 89181 44967.'],
      '/faq': ['FAQ — Sodha Global', 'Find answers to common questions about Sodha Global products, shipping and policies.'],
      '/privacy': ['Privacy Policy — Sodha Global', 'How Sodha Global collects, uses and protects your personal data.'],
      '/terms': ['Terms & Conditions — Sodha Global', 'Terms and conditions for using the Sodha Global website and purchasing our products.'],
      '/shipping': ['Shipping Policy — Sodha Global', 'Shipping information for Sodha Global orders across India.'],
      '/returns': ['Returns & Refunds — Sodha Global', 'Return and refund policy for Sodha Global products.'],
    };

    if (pageTitles[path]) {
      [title, description] = pageTitles[path];
    } else if (productMatch) {
      title = `${productMatch[1].replace(/-/g, ' ')} — Sodha Global`;
      description = `Premium ${productMatch[1].replace(/-/g, ' ')} from Sodha Global. Carefully sourced for authentic Indian flavour.`;
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
  }, [path]);

  return null;
}

function AppContent() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <SEOManager />
      <Header onSearchClick={() => setSearchOpen(true)} />
      <main>
        <Routes />
      </main>
      <Footer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
