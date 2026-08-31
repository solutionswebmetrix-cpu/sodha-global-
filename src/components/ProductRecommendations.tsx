import { useState, useEffect } from 'react';
import { fetchRecommendedProducts } from '@/services/products';
import type { ProductWithCategory } from '@/types';
import ProductCard from './ProductCard';
import SectionHeading from './SectionHeading';

export default function ProductRecommendations({ productId }: { productId: string }) {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchRecommendedProducts(productId)
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setProducts([]);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (loading || products.length === 0) return null;

  return (
    <section className="section-padding bg-ivory-100">
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Curated Pairings"
          title="You May Also Like"
          subtitle="Complete your spice collection with these carefully selected companions."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
