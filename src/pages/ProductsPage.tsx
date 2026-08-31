import { useState, useEffect, useMemo } from 'react';
import { fetchProducts, fetchCategories } from '@/services/products';
import type { ProductWithCategory, Category } from '@/types';
import ProductCard from '@/components/ProductCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ProductGridSkeleton } from '@/components/Skeletons';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SlidersHorizontal, Check } from 'lucide-react';

type SortOption = 'featured' | 'best-seller' | 'price-low' | 'price-high';

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filter, setFilter] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);

  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([prodData, catData]) => {
        setProducts(prodData);
        setCategories(catData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      const cat = categories.find((c) => c.slug === selectedCategory);
      if (cat) {
        result = result.filter((p) => p.category_id === cat.id);
      }
    }

    // Sort
    switch (filter) {
      case 'featured':
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.sort_order - b.sort_order;
        });
        break;
      case 'best-seller':
        result.sort((a, b) => {
          if (a.best_seller && !b.best_seller) return -1;
          if (!a.best_seller && b.best_seller) return 1;
          return a.sort_order - b.sort_order;
        });
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [products, categories, selectedCategory, filter]);

  return (
    <div className="pt-28">
      {/* Page header */}
      <section className="bg-ivory-100 py-12">
        <div className="container-luxury">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Our Products' },
            ]}
          />
          <div
            ref={headingRef}
            className={`transition-all duration-700 ${
              headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-eyebrow mb-3">The Collection</p>
            <h1 className="text-display font-display font-semibold text-charcoal-900">
              Our Products
            </h1>
            <p className="mt-3 max-w-xl text-lg text-charcoal-500">
              Pure ingredients. Distinctive flavour. Uncompromising quality.
            </p>
          </div>
        </div>
      </section>

      {/* Products + Filters */}
      <section className="section-padding bg-ivory-50">
        <div className="container-luxury">
          {/* Filter bar */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Category pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-charcoal-900 text-ivory-50'
                    : 'bg-ivory-100 text-charcoal-600 hover:bg-ivory-200'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-charcoal-900 text-ivory-50'
                      : 'bg-ivory-100 text-charcoal-600 hover:bg-ivory-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort + Filter toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 rounded-full border border-ivory-200 px-4 py-2 text-sm font-medium text-charcoal-700 transition-colors hover:border-charcoal-300"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Sort
              </button>
              {showFilters && (
                <div className="flex flex-wrap gap-2 animate-fade-in">
                  {(
                    [
                      { value: 'featured', label: 'Featured' },
                      { value: 'best-seller', label: 'Best Seller' },
                      { value: 'price-low', label: 'Price: Low to High' },
                      { value: 'price-high', label: 'Price: High to Low' },
                    ] as { value: SortOption; label: string }[]
                  ).map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setFilter(opt.value)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                        filter === opt.value
                          ? 'bg-copper-600 text-ivory-50'
                          : 'bg-ivory-100 text-charcoal-500 hover:bg-ivory-200'
                      }`}
                    >
                      {filter === opt.value && <Check className="h-3 w-3" />}
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product count */}
          <p className="mb-6 text-sm text-charcoal-400">
            {loading ? 'Loading...' : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`}
          </p>

          {/* Grid */}
          {loading ? (
            <ProductGridSkeleton count={6} />
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display text-2xl text-charcoal-900">No products found</p>
              <p className="mt-2 text-sm text-charcoal-500">
                Try a different category or filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
