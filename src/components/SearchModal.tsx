import { useState, useEffect, useRef } from 'react';
import { Link } from '@/hooks/useRouter';
import { searchProducts } from '@/services/products';
import { formatPrice } from '@/utils/format';
import type { ProductWithCategory } from '@/types';
import { Search, X, ArrowUpRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ProductWithCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
      setSearched(false);
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchProducts(query.trim());
        setResults(data);
        setSearched(true);
      } catch {
        setResults([]);
        setSearched(true);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <div
        className="absolute inset-0 bg-charcoal-950/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="absolute inset-x-0 top-0 mx-auto max-h-[85vh] w-full overflow-y-auto bg-ivory-50 shadow-2xl animate-slide-down">
        <div className="container-luxury py-6">
          {/* Search bar */}
          <div className="flex items-center gap-4 border-b-2 border-charcoal-900 pb-4">
            <Search className="h-6 w-6 shrink-0 text-charcoal-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search spices, masalas, peanuts..."
              className="flex-1 bg-transparent font-display text-2xl text-charcoal-900 placeholder:text-charcoal-300 focus:outline-none sm:text-3xl"
            />
            <button
              onClick={onClose}
              aria-label="Close search"
              className="shrink-0 rounded-full p-2 text-charcoal-400 transition-colors hover:bg-ivory-200 hover:text-charcoal-900"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Results */}
          <div className="mt-6">
            {loading && (
              <p className="py-8 text-center text-sm text-charcoal-400">Searching...</p>
            )}

            {!loading && !query.trim() && (
              <p className="py-8 text-center text-sm text-charcoal-400">
                Start typing to search our collection
              </p>
            )}

            {!loading && searched && query.trim() && results.length === 0 && (
              <div className="py-12 text-center">
                <p className="font-display text-2xl text-charcoal-900">No products found</p>
                <p className="mt-2 text-sm text-charcoal-500">
                  Try a different search term, or explore our full collection.
                </p>
                <Link
                  to="/products"
                  className="btn-primary mt-6"
                  onClick={onClose}
                >
                  Explore Collection
                </Link>
              </div>
            )}

            {!loading && results.length > 0 && (
              <>
                <p className="text-eyebrow mb-4">
                  {results.length} result{results.length > 1 ? 's' : ''}
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/${product.slug}`}
                      onClick={onClose}
                      className="group flex items-center gap-4 rounded-xl bg-white p-3 transition-all hover:shadow-lg"
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-ivory-100">
                        {product.thumbnail && (
                          <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.6rem] uppercase tracking-[0.15em] text-copper-600">
                          {product.category?.name}
                        </p>
                        <h4 className="truncate font-display text-base font-semibold text-charcoal-900">
                          {product.name}
                        </h4>
                        <p className="text-sm text-charcoal-500">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-charcoal-300 transition-colors group-hover:text-copper-600" />
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
