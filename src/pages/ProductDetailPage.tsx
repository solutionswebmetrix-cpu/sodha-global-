import { useState, useEffect } from 'react';
import { useRouter, Link } from '@/hooks/useRouter';
import { fetchProductBySlug } from '@/services/products';
import type { ProductWithCategory } from '@/types';
import ProductGallery from '@/components/ProductGallery';
import ProductRecommendations from '@/components/ProductRecommendations';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ProductDetailSkeleton } from '@/components/Skeletons';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  ChevronDown,
  Mail,
  Phone,
  AlertCircle,
} from 'lucide-react';

interface AccordionSection {
  title: string;
  content: string | string[];
}

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-ivory-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <h3 className="font-display text-lg font-semibold text-charcoal-900">{title}</h3>
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
          <div className="pb-5 text-sm leading-relaxed text-charcoal-500">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage({ slug }: { slug: string }) {
  const { navigate } = useRouter();
  const [product, setProduct] = useState<ProductWithCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    fetchProductBySlug(slug)
      .then((data) => {
        if (!data) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-28">
        <div className="container-luxury py-12">
          <ProductDetailSkeleton />
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-20 text-center">
        <p className="text-eyebrow mb-4">404</p>
        <h1 className="font-display text-4xl font-semibold text-charcoal-900">
          Product Not Found
        </h1>
        <p className="mt-3 text-charcoal-500">
          The product you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/products" className="btn-primary mt-8">
          Explore Products
        </Link>
      </div>
    );
  }

  const categoryName = product.category?.name ?? 'Spice';

  return (
    <div className="pt-28">
      {/* Breadcrumbs */}
      <div className="container-luxury">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Products', to: '/products' },
            { label: product.name },
          ]}
        />
      </div>

      {/* Main product section */}
      <section className="py-8">
        <div className="container-luxury">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Gallery */}
            <div
              ref={ref}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <ProductGallery images={product.images} name={product.name} />
            </div>

            {/* Info */}
            <div>
              <p className="text-eyebrow mb-3">{categoryName}</p>
              <h1 className="text-display font-display font-semibold text-charcoal-900">
                {product.name}
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-charcoal-500">
                {product.short_description}
              </p>

              {/* Product Enquiry CTA */}
              <div className="mt-8 rounded-2xl border border-copper-200 bg-copper-50 p-6">
                <p className="font-display text-lg font-semibold text-charcoal-900 mb-2">
                  Interested in this product?
                </p>
                <p className="text-sm text-charcoal-600 mb-4">
                  Get in touch with Sodha Global for product enquiries, bulk orders, or any questions.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/contact"
                    className="btn-primary flex-1"
                  >
                    <Mail className="h-4 w-4" />
                    Send Enquiry
                  </Link>
                  <a
                    href="tel:+918918144967"
                    className="btn-secondary flex-1 flex items-center justify-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Call Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion info */}
      <section className="section-padding bg-ivory-100">
        <div className="container-luxury max-w-3xl">
          <h2 className="mb-6 font-display text-3xl font-semibold text-charcoal-900">
            Product Information
          </h2>
          <div className="rounded-2xl bg-white px-6 sm:px-8">
            <Accordion title="About the Product" defaultOpen>
              <p>{product.description}</p>
            </Accordion>

            {product.ingredients.length > 0 && (
              <Accordion title="Ingredients">
                <ul className="space-y-1">
                  {product.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-copper-500" />
                      {ing}
                    </li>
                  ))}
                </ul>
              </Accordion>
            )}

            <Accordion title="Taste & Aroma">
              <p>
                {product.short_description} The flavour profile is carefully preserved through
                our small-batch processing, ensuring the natural oils and aromatics reach you
                at their peak.
              </p>
            </Accordion>

            {product.usage.length > 0 && (
              <Accordion title="How to Use">
                <ul className="space-y-1">
                  {product.usage.map((u, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-copper-500" />
                      {u}
                    </li>
                  ))}
                </ul>
              </Accordion>
            )}

            <Accordion title="Storage">
              <p>{product.storage ?? 'Store in a cool, dry place away from direct sunlight. Seal tightly after opening.'}</p>
            </Accordion>

            <Accordion title="Product Specifications">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-charcoal-400">Weight</p>
                  <p className="font-medium text-charcoal-700">{product.weight ?? '—'}</p>
                </div>
                <div>
                  <p className="text-charcoal-400">Packaging</p>
                  <p className="font-medium text-charcoal-700">Premium sealed pack</p>
                </div>
                <div>
                  <p className="text-charcoal-400">Origin</p>
                  <p className="font-medium text-charcoal-700">{product.origin ?? 'India'}</p>
                </div>
                <div>
                  <p className="text-charcoal-400">SKU</p>
                  <p className="font-medium text-charcoal-700">{product.sku ?? '—'}</p>
                </div>
                <div>
                  <p className="text-charcoal-400">Availability</p>
                  <p className="font-medium text-charcoal-700">
                    {product.availability ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
              </div>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <ProductRecommendations productId={product.id} />
    </div>
  );
}
