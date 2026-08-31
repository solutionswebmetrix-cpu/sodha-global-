import { type ReactNode } from 'react';
import { Link, useRouter } from '@/hooks/useRouter';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import {
  LayoutDashboard,
  Package,
  Network,
  ShoppingCart,
  Mail,
  LogOut,
  ExternalLink,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
  { label: 'Products', to: '/admin/products', icon: Package },
  { label: 'Recommendations', to: '/admin/recommendations', icon: Network },
  { label: 'Orders', to: '/admin/orders', icon: ShoppingCart },
  { label: 'Enquiries', to: '/admin/enquiries', icon: Mail },
];

export default function AdminLayout({ children, active }: { children: ReactNode; active: string }) {
  const { signOut } = useAdminAuth();
  const { navigate, path } = useRouter();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-ivory-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-charcoal-950 lg:flex">
          <div className="border-b border-charcoal-800 px-6 py-5">
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-ivory-50">SODHA</span>
              <span className="text-[0.55rem] font-medium uppercase tracking-[0.4em] text-copper-400">
                Global Admin
              </span>
            </div>
          </div>

          <nav className="flex-1 px-3 py-6">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.to || (item.to !== '/admin' && path.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-copper-600 text-ivory-50'
                      : 'text-ivory-200/60 hover:bg-charcoal-800 hover:text-ivory-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-charcoal-800 px-3 py-4">
            <Link
              to="/"
              className="mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-ivory-200/60 transition-colors hover:bg-charcoal-800 hover:text-ivory-50"
            >
              <ExternalLink className="h-5 w-5" />
              View Store
            </Link>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-ivory-200/60 transition-colors hover:bg-charcoal-800 hover:text-ivory-50"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-charcoal-800 bg-charcoal-950 px-4 py-3 lg:hidden">
          <span className="font-display text-lg font-bold text-ivory-50">SODHA Admin</span>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-ivory-200/60">
              <ExternalLink className="h-5 w-5" />
            </Link>
            <button onClick={handleSignOut} className="text-ivory-200/60">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="fixed inset-x-0 top-[52px] z-30 flex border-b border-charcoal-800 bg-charcoal-900 px-2 py-2 lg:hidden">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.to || (item.to !== '/admin' && path.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-1 flex-col items-center gap-1 rounded-lg py-2 text-[0.65rem] font-medium transition-colors ${
                  isActive ? 'bg-copper-600 text-ivory-50' : 'text-ivory-200/50'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Main content */}
        <main className="flex-1 lg:ml-64">
          <div className="px-4 pt-20 pb-12 lg:px-8 lg:pt-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
