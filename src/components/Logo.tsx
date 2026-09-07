import { Link } from '@/hooks/useRouter';
import logo from '@/assets/logo.png';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center ${className}`}>
      <img src={logo} alt="Sodha Global" className="h-14 w-14 object-contain sm:h-16 sm:w-16" />
    </Link>
  );
}
