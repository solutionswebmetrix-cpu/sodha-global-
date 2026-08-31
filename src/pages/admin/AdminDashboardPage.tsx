import { useState, useEffect } from 'react';
import { Link } from '@/hooks/useRouter';
import AdminLayout from './AdminLayout';
import { adminFetchStats, type DashboardStats } from '@/services/admin';
import {
  Package,
  CheckCircle2,
  XCircle,
  Star,
  Award,
  ShoppingCart,
  Clock,
  Mail,
  TrendingUp,
} from 'lucide-react';

const STAT_CARDS = [
  { key: 'totalProducts', label: 'Total Products', icon: Package, color: 'text-charcoal-900', bg: 'bg-ivory-100' },
  { key: 'availableProducts', label: 'Available', icon: CheckCircle2, color: 'text-sage-600', bg: 'bg-sage-50' },
  { key: 'outOfStock', label: 'Out of Stock', icon: XCircle, color: 'text-copper-600', bg: 'bg-copper-50' },
  { key: 'featuredProducts', label: 'Featured', icon: Star, color: 'text-saffron-600', bg: 'bg-saffron-50' },
  { key: 'bestSellers', label: 'Best Sellers', icon: Award, color: 'text-copper-600', bg: 'bg-copper-50' },
  { key: 'totalOrders', label: 'Total Orders', icon: ShoppingCart, color: 'text-charcoal-900', bg: 'bg-ivory-100' },
  { key: 'pendingOrders', label: 'Pending Orders', icon: Clock, color: 'text-saffron-600', bg: 'bg-saffron-50' },
  { key: 'contactEnquiries', label: 'Enquiries', icon: Mail, color: 'text-copper-600', bg: 'bg-copper-50' },
] as const;

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetchStats()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout active="/admin">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-charcoal-900">Dashboard</h1>
        <p className="mt-1 text-sm text-charcoal-500">Overview of your store</p>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton h-28 rounded-2xl" />
          ))}
        </div>
      ) : stats ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STAT_CARDS.map((card) => (
              <div key={card.key} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${card.bg}`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
                <p className="font-display text-3xl font-bold text-charcoal-900">
                  {stats[card.key]}
                </p>
                <p className="mt-1 text-sm text-charcoal-400">{card.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-copper-600" />
                <h2 className="font-display text-lg font-semibold text-charcoal-900">
                  Quick Actions
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  to="/admin/products"
                  className="rounded-xl border border-ivory-200 px-4 py-3 text-sm font-medium text-charcoal-700 transition-colors hover:border-copper-300 hover:text-copper-600"
                >
                  Manage Products
                </Link>
                <Link
                  to="/admin/recommendations"
                  className="rounded-xl border border-ivory-200 px-4 py-3 text-sm font-medium text-charcoal-700 transition-colors hover:border-copper-300 hover:text-copper-600"
                >
                  Edit Recommendations
                </Link>
                <Link
                  to="/admin/orders"
                  className="rounded-xl border border-ivory-200 px-4 py-3 text-sm font-medium text-charcoal-700 transition-colors hover:border-copper-300 hover:text-copper-600"
                >
                  View Orders
                </Link>
                <Link
                  to="/admin/enquiries"
                  className="rounded-xl border border-ivory-200 px-4 py-3 text-sm font-medium text-charcoal-700 transition-colors hover:border-copper-300 hover:text-copper-600"
                >
                  Check Enquiries
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-charcoal-950 p-6 text-ivory-50">
              <h2 className="font-display text-lg font-semibold">Store Health</h2>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
                  <span className="text-sm text-ivory-200/60">Product Availability</span>
                  <span className="text-sm font-medium">
                    {stats.availableProducts}/{stats.totalProducts} in stock
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
                  <span className="text-sm text-ivory-200/60">Featured Products</span>
                  <span className="text-sm font-medium">{stats.featuredProducts} active</span>
                </div>
                <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
                  <span className="text-sm text-ivory-200/60">Pending Orders</span>
                  <span className="text-sm font-medium">{stats.pendingOrders} awaiting</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ivory-200/60">New Enquiries</span>
                  <span className="text-sm font-medium">{stats.contactEnquiries} total</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="py-12 text-center">
          <p className="text-charcoal-500">Failed to load dashboard data.</p>
        </div>
      )}
    </AdminLayout>
  );
}
