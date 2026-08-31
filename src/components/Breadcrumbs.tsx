import { Link, useRouter } from '@/hooks/useRouter';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const { navigate } = useRouter();
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-charcoal-400">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {idx > 0 && <span className="text-charcoal-300">/</span>}
            {item.to ? (
              <Link
                to={item.to}
                className="transition-colors hover:text-copper-600"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-charcoal-600">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
