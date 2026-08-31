export function ProductCardSkeleton() {
  return (
    <div className="card-luxury">
      <div className="skeleton aspect-[4/5] w-full" />
      <div className="p-5">
        <div className="skeleton mb-3 h-3 w-20 rounded-full" />
        <div className="skeleton mb-2 h-5 w-3/4 rounded" />
        <div className="skeleton mb-4 h-4 w-full rounded" />
        <div className="flex items-center justify-between">
          <div className="skeleton h-5 w-16 rounded" />
          <div className="skeleton h-3 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <div className="skeleton aspect-square w-full rounded-2xl" />
        <div className="mt-4 grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton aspect-square rounded-xl" />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="skeleton h-3 w-24 rounded-full" />
        <div className="skeleton h-10 w-3/4 rounded" />
        <div className="skeleton h-5 w-full rounded" />
        <div className="skeleton h-5 w-2/3 rounded" />
        <div className="skeleton mt-4 h-8 w-32 rounded" />
        <div className="skeleton mt-4 h-12 w-full rounded-full" />
        <div className="skeleton h-12 w-full rounded-full" />
      </div>
    </div>
  );
}
