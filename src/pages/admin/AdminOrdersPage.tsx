import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { adminFetchOrders, adminUpdateOrderStatus, type OrderWithItems } from '@/services/admin';
import { formatPrice } from '@/utils/format';
import { ChevronDown, X, Mail, Phone, MapPin, Package } from 'lucide-react';

const ORDER_STATUSES = ['new', 'processing', 'shipped', 'delivered', 'cancelled'];
const PAYMENT_STATUSES = ['pending', 'paid', 'failed', 'refunded'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderWithItems | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    adminFetchOrders()
      .then(setOrders)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (
    orderId: string,
    field: 'order_status' | 'payment_status',
    value: string
  ) => {
    setUpdating(true);
    try {
      await adminUpdateOrderStatus(orderId, field, value);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, [field]: value } : o))
      );
      if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) => (prev ? { ...prev, [field]: value } : prev));
      }
    } catch {
      // ignore
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-saffron-100 text-saffron-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-sage-100 text-sage-700';
      case 'cancelled': return 'bg-copper-100 text-copper-700';
      case 'paid': return 'bg-sage-100 text-sage-700';
      case 'pending': return 'bg-saffron-100 text-saffron-700';
      case 'failed': return 'bg-copper-100 text-copper-700';
      default: return 'bg-ivory-100 text-charcoal-600';
    }
  };

  return (
    <AdminLayout active="/admin/orders">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-charcoal-900">Orders</h1>
        <p className="mt-1 text-sm text-charcoal-500">
          {orders.length} order{orders.length !== 1 ? 's' : ''} total
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-20 rounded-2xl" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="py-12 text-center text-charcoal-500">No orders yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ivory-200 text-left text-xs uppercase tracking-[0.15em] text-charcoal-400">
                <th className="px-4 py-4 font-medium">Order ID</th>
                <th className="hidden px-4 py-4 font-medium sm:table-cell">Customer</th>
                <th className="hidden px-4 py-4 font-medium md:table-cell">Date</th>
                <th className="px-4 py-4 font-medium">Total</th>
                <th className="hidden px-4 py-4 font-medium sm:table-cell">Status</th>
                <th className="px-4 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-ivory-100 last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-mono text-sm font-medium text-charcoal-900">
                      {order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-xs text-charcoal-400">{order.order_items.length} items</p>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <p className="text-sm font-medium text-charcoal-900">{order.customer_name}</p>
                    <p className="text-xs text-charcoal-400">{order.email}</p>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <p className="text-sm text-charcoal-600">{formatDate(order.created_at)}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-charcoal-900">
                      {formatPrice(order.total)}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor(order.order_status)}`}>
                      {order.order_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="rounded-lg border border-ivory-200 px-3 py-1.5 text-xs font-medium text-charcoal-700 transition-colors hover:border-copper-300 hover:text-copper-600"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order detail modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[80] overflow-y-auto">
          <div
            className="fixed inset-0 bg-charcoal-950/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedOrder(null)}
          />
          <div className="relative mx-auto my-8 w-full max-w-2xl rounded-2xl bg-ivory-50 p-6 shadow-2xl animate-scale-in sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold text-charcoal-900">
                  Order {selectedOrder.id.slice(0, 8).toUpperCase()}
                </h2>
                <p className="mt-1 text-sm text-charcoal-400">{formatDate(selectedOrder.created_at)}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-full p-2 text-charcoal-400 transition-colors hover:bg-ivory-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Status controls */}
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.1em] text-charcoal-400">
                  Order Status
                </label>
                <div className="relative">
                  <select
                    value={selectedOrder.order_status}
                    onChange={(e) => handleStatusChange(selectedOrder.id, 'order_status', e.target.value)}
                    disabled={updating}
                    className="w-full appearance-none rounded-xl border border-ivory-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-copper-500"
                  >
                    {ORDER_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.1em] text-charcoal-400">
                  Payment Status
                </label>
                <div className="relative">
                  <select
                    value={selectedOrder.payment_status}
                    onChange={(e) => handleStatusChange(selectedOrder.id, 'payment_status', e.target.value)}
                    disabled={updating}
                    className="w-full appearance-none rounded-xl border border-ivory-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-copper-500"
                  >
                    {PAYMENT_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
                </div>
              </div>
            </div>

            {/* Customer info */}
            <div className="mb-6 rounded-2xl bg-white p-5">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-copper-600">
                Customer
              </h3>
              <div className="space-y-2">
                <p className="text-sm font-medium text-charcoal-900">{selectedOrder.customer_name}</p>
                <p className="flex items-center gap-2 text-sm text-charcoal-500">
                  <Mail className="h-4 w-4 text-charcoal-400" />
                  {selectedOrder.email}
                </p>
                <p className="flex items-center gap-2 text-sm text-charcoal-500">
                  <Phone className="h-4 w-4 text-charcoal-400" />
                  {selectedOrder.phone}
                </p>
                <p className="flex items-start gap-2 text-sm text-charcoal-500">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-charcoal-400" />
                  <span>
                    {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.state} {selectedOrder.pincode}, {selectedOrder.country}
                  </span>
                </p>
                {selectedOrder.notes && (
                  <p className="mt-2 rounded-lg bg-ivory-100 px-3 py-2 text-xs text-charcoal-500">
                    <strong>Notes:</strong> {selectedOrder.notes}
                  </p>
                )}
              </div>
            </div>

            {/* Order items */}
            <div className="mb-6 rounded-2xl bg-white p-5">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-copper-600">
                Items
              </h3>
              <div className="space-y-3">
                {selectedOrder.order_items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 border-b border-ivory-100 pb-3 last:border-0 last:pb-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ivory-100">
                      <Package className="h-5 w-5 text-charcoal-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-charcoal-900">{item.product_name}</p>
                      <p className="text-xs text-charcoal-400">
                        {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-charcoal-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-1 border-t border-ivory-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal-500">Subtotal</span>
                  <span className="font-medium text-charcoal-900">{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal-500">Shipping</span>
                  <span className="font-medium text-charcoal-900">
                    {selectedOrder.shipping === 0 ? 'Free' : formatPrice(selectedOrder.shipping)}
                  </span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-display text-lg font-semibold text-charcoal-900">Total</span>
                  <span className="font-display text-xl font-bold text-charcoal-900">
                    {formatPrice(selectedOrder.total)}
                  </span>
                </div>
              </div>
            </div>

            <button onClick={() => setSelectedOrder(null)} className="btn-ghost w-full">
              Close
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
