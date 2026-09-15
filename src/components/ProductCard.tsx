import { Link } from '@/hooks/useRouter';
import type { ProductWithCategory } from '@/types';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: ProductWithCategory;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const categoryName = product.category?.name ?? 'Spice';

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block"
    >
      <article
        className="card-luxury flex h-full flex-col"
        style={{ animationDelay: `${index * 80}ms` }}
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-ivory-100">
          {product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={`Premium ${product.name}`}
              loading="lazy"
              className="h-full w-full object-contain p-4 transition-transform duration-[800ms] ease-out group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-ivory-200 to-earth-200" />
          )}

          {/* Badges */}
          <div className="absolute left-4 top-4 flex flex-col gap-2">
            {product.best_seller && (
              <span className="rounded-full bg-charcoal-900/90 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-ivory-50 backdrop-blur-sm">
                Best Seller
              </span>
            )}
          </div>

          {/* Hover overlay arrow */}
          <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ivory-50/0 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:bg-ivory-50/90 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5 text-charcoal-900" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <p className="text-eyebrow mb-2 text-[0.6rem]">{categoryName}</p>
          <h3 className="font-display text-lg font-semibold text-charcoal-900 transition-colors group-hover:text-copper-700">
            {product.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-charcoal-500">
            {product.short_description}
          </p>

          <div className="mt-auto flex items-center justify-end pt-4">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-copper-600 transition-all duration-300 group-hover:tracking-[0.2em]">
              View Product
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
