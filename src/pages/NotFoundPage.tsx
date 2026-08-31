import { Link } from '@/hooks/useRouter';
import { ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pt-20 text-center">
      <p className="text-eyebrow mb-4">Error 404</p>
      <h1 className="font-display text-6xl font-bold text-charcoal-900 sm:text-8xl">404</h1>
      <h2 className="mt-4 font-display text-2xl font-semibold text-charcoal-900">
        Page Not Found
      </h2>
      <p className="mt-3 max-w-md text-charcoal-500">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Back to Home
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
