import { useState } from 'react';
import { Link } from '@/hooks/useRouter';
import { useCart } from '@/hooks/useCart';
import { createOrder } from '@/services/products';
import { formatPrice } from '@/utils/format';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Check, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState({
    customer_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderId, setOrderId] = useState('');

  const shipping = subtotal >= 500 ? 0 : 49;
  const total = subtotal + shipping;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.customer_name.trim()) e.customer_name = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.state.trim()) e.state = 'State is required';
    if (!form.pincode.trim()) e.pincode = 'PIN code is required';
    if (!form.country.trim()) e.country = 'Country is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || items.length === 0) return;
    setStatus('loading');
    try {
      const order = await createOrder(
        {
          customer_name: form.customer_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          state: form.state.trim(),
          pincode: form.pincode.trim(),
          country: form.country.trim(),
          subtotal,
          shipping,
          total,
          notes: form.notes.trim() || undefined,
        },
        items.map((item) => ({
          product_id: item.productId,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
        }))
      );
      setOrderId(order.id);
      setStatus('success');
      clearCart();
    } catch {
      setStatus('error');
    }
  };

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  if (status === 'success') {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center pt-28 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sage-100">
          <Check className="h-10 w-10 text-sage-600" />
        </div>
        <p className="text-eyebrow mb-3">Order Confirmed</p>
        <h1 className="font-display text-4xl font-semibold text-charcoal-900">
          Thank You for Your Order
        </h1>
        <p className="mt-3 max-w-md text-charcoal-500">
          Your order has been placed successfully. A confirmation email will be sent shortly.
        </p>
        <div className="mt-6 rounded-xl bg-ivory-100 px-6 py-3">
          <p className="text-xs uppercase tracking-[0.15em] text-charcoal-400">Order ID</p>
          <p className="font-mono text-sm font-medium text-charcoal-900">
            {orderId.slice(0, 8).toUpperCase()}
          </p>
        </div>
        <Link to="/products" className="btn-primary mt-8">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center pt-28 text-center">
        <h1 className="font-display text-3xl font-semibold text-charcoal-900">
          Your Cart is Empty
        </h1>
        <p className="mt-3 text-charcoal-500">
          Add some products before proceeding to checkout.
        </p>
        <Link to="/products" className="btn-primary mt-8">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28">
      <div className="container-luxury">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      </div>

      <section className="bg-ivory-100 py-8">
        <div className="container-luxury">
          <h1 className="text-display font-display font-semibold text-charcoal-900">Checkout</h1>
        </div>
      </section>

      <section className="section-padding bg-ivory-50">
        <div className="container-luxury">
          <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-3">
            {/* Form fields */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white p-6 sm:p-8">
                <h2 className="font-display text-xl font-semibold text-charcoal-900">
                  Shipping Details
                </h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-charcoal-700">
                      Full Name <span className="text-copper-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.customer_name}
                      onChange={(e) => update('customer_name', e.target.value)}
                      className={`w-full rounded-xl border bg-ivory-50 px-4 py-3 text-sm text-charcoal-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500 ${
                        errors.customer_name ? 'border-copper-500' : 'border-ivory-200'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.customer_name && <p className="mt-1 text-xs text-copper-600">{errors.customer_name}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-charcoal-700">
                      Email <span className="text-copper-600">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className={`w-full rounded-xl border bg-ivory-50 px-4 py-3 text-sm text-charcoal-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500 ${
                        errors.email ? 'border-copper-500' : 'border-ivory-200'
                      }`}
                      placeholder="you@email.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-copper-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-charcoal-700">
                      Phone <span className="text-copper-600">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className={`w-full rounded-xl border bg-ivory-50 px-4 py-3 text-sm text-charcoal-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500 ${
                        errors.phone ? 'border-copper-500' : 'border-ivory-200'
                      }`}
                      placeholder="+91 ..."
                    />
                    {errors.phone && <p className="mt-1 text-xs text-copper-600">{errors.phone}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-charcoal-700">
                      Address <span className="text-copper-600">*</span>
                    </label>
                    <textarea
                      value={form.address}
                      onChange={(e) => update('address', e.target.value)}
                      rows={2}
                      className={`w-full resize-none rounded-xl border bg-ivory-50 px-4 py-3 text-sm text-charcoal-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500 ${
                        errors.address ? 'border-copper-500' : 'border-ivory-200'
                      }`}
                      placeholder="House number, street, area"
                    />
                    {errors.address && <p className="mt-1 text-xs text-copper-600">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-charcoal-700">
                      City <span className="text-copper-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => update('city', e.target.value)}
                      className={`w-full rounded-xl border bg-ivory-50 px-4 py-3 text-sm text-charcoal-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500 ${
                        errors.city ? 'border-copper-500' : 'border-ivory-200'
                      }`}
                      placeholder="Your city"
                    />
                    {errors.city && <p className="mt-1 text-xs text-copper-600">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-charcoal-700">
                      State <span className="text-copper-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.state}
                      onChange={(e) => update('state', e.target.value)}
                      className={`w-full rounded-xl border bg-ivory-50 px-4 py-3 text-sm text-charcoal-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500 ${
                        errors.state ? 'border-copper-500' : 'border-ivory-200'
                      }`}
                      placeholder="Your state"
                    />
                    {errors.state && <p className="mt-1 text-xs text-copper-600">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-charcoal-700">
                      PIN Code <span className="text-copper-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.pincode}
                      onChange={(e) => update('pincode', e.target.value)}
                      className={`w-full rounded-xl border bg-ivory-50 px-4 py-3 text-sm text-charcoal-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500 ${
                        errors.pincode ? 'border-copper-500' : 'border-ivory-200'
                      }`}
                      placeholder="6-digit PIN"
                    />
                    {errors.pincode && <p className="mt-1 text-xs text-copper-600">{errors.pincode}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-charcoal-700">
                      Country <span className="text-copper-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.country}
                      onChange={(e) => update('country', e.target.value)}
                      className={`w-full rounded-xl border bg-ivory-50 px-4 py-3 text-sm text-charcoal-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500 ${
                        errors.country ? 'border-copper-500' : 'border-ivory-200'
                      }`}
                    />
                    {errors.country && <p className="mt-1 text-xs text-copper-600">{errors.country}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-charcoal-700">
                      Order Notes (optional)
                    </label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => update('notes', e.target.value)}
                      rows={2}
                      className="w-full resize-none rounded-xl border border-ivory-200 bg-ivory-50 px-4 py-3 text-sm text-charcoal-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500"
                      placeholder="Any special instructions..."
                    />
                  </div>
                </div>
              </div>

              {status === 'error' && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-copper-50 px-4 py-3 text-sm text-copper-700">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  Something went wrong placing your order. Please try again.
                </div>
              )}
            </div>

            {/* Order summary */}
            <div>
              <div className="sticky top-28 rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="font-display text-xl font-semibold text-charcoal-900">
                  Order Summary
                </h2>
                <div className="mt-6 space-y-3 border-b border-ivory-200 pb-6">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.size}`} className="flex gap-3">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-ivory-100">
                        {item.thumbnail && (
                          <img src={item.thumbnail} alt={item.name} className="h-full w-full object-cover" />
                        )}
                      </div>
                      <div className="flex flex-1 justify-between">
                        <div>
                          <p className="text-sm font-medium text-charcoal-900">{item.name}</p>
                          <p className="text-xs text-charcoal-400">
                            {item.size} × {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-charcoal-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 py-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal-500">Subtotal</span>
                    <span className="font-medium text-charcoal-900">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal-500">Shipping</span>
                    <span className="font-medium text-charcoal-900">
                      {shipping === 0 ? 'Free' : formatPrice(shipping)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-ivory-200 pt-4">
                  <span className="font-display text-lg font-semibold text-charcoal-900">Total</span>
                  <span className="font-display text-2xl font-bold text-charcoal-900">
                    {formatPrice(total)}
                  </span>
                </div>

                <button type="submit" disabled={status === 'loading'} className="btn-primary mt-6 w-full">
                  {status === 'loading' ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-ivory-50 border-t-transparent" />
                  ) : (
                    'Place Order'
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-charcoal-400">
                  <ShieldCheck className="h-4 w-4" />
                  Secure checkout — your data is protected
                </div>

                <Link to="/cart" className="btn-ghost mt-4 w-full">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Cart
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
