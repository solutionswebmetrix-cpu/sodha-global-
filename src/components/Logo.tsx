import { Link } from '@/hooks/useRouter';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex flex-col leading-none ${className}`}>
      <span className="font-display text-xl font-bold tracking-tight text-charcoal-900 sm:text-2xl">
        SODHA
      </span>
      <span className="text-[0.6rem] font-medium uppercase tracking-[0.4em] text-copper-600 sm:text-[0.65rem]">
        Global
      </span>
    </Link>
  );
}
