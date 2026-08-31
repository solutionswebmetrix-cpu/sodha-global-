import { Link } from '@/hooks/useRouter';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/format';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Plus, Minus, X, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center pt-28 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-ivory-100">
          <ShoppingBag className="h-12 w-12 text-charcoal-300" />
        </div>
        <p className="text-eyebrow mb-3">Your Cart</p>
        <h1 className="font-display text-4xl font-semibold text-charcoal-900">
          Your Cart is Waiting
        </h1>
        <p className="mt-3 max-w-md text-charcoal-500">
          Discover something delicious from the Sodha Global collection.
        </p>
        <Link to="/products" className="btn-primary mt-8">
          Explore Products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const shipping = subtotal >= 500 ? 0 : 49;
  const total = subtotal + shipping;

  return (
    <div className="pt-28">
      <div className="container-luxury">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
      </div>

      <section className="bg-ivory-100 py-8">
        <div className="container-luxury">
          <h1 className="text-display font-display font-semibold text-charcoal-900">
            Shopping Cart
          </h1>
          <p className="mt-2 text-sm text-charcoal-500">
            {items.length} item{items.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>
      </section>

      <section className="section-padding bg-ivory-50">
        <div className="container-luxury">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm sm:p-5"
                  >
                    <Link
                      to={`/products/${item.slug}`}
                      className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-ivory-100 sm:h-28 sm:w-28"
                    >
                      {item.thumbnail && (
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-display text-lg font-semibold text-charcoal-900">
                            {item.name}
                          </h3>
                          <p className="text-xs text-charcoal-400">Size: {item.size}</p>
                          <p className="mt-1 text-sm text-charcoal-500">
                            {formatPrice(item.price)} each
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId, item.size)}
                          className="text-charcoal-300 transition-colors hover:text-copper-600"
                          aria-label="Remove item"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center gap-2 rounded-full border border-ivory-200">
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal-600 transition-colors hover:bg-ivory-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-charcoal-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal-600 transition-colors hover:bg-ivory-100"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="font-display text-lg font-semibold text-charcoal-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Link to="/products" className="btn-ghost pl-0">
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-sm text-charcoal-400 transition-colors hover:text-copper-600"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="sticky top-28 rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="font-display text-xl font-semibold text-charcoal-900">
                  Order Summary
                </h2>
                <div className="mt-6 space-y-3 border-b border-ivory-200 pb-6">
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
                  {shipping > 0 && (
                    <p className="text-xs text-charcoal-400">
                      Add {formatPrice(500 - subtotal)} more for free shipping.
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between pt-6">
                  <span className="font-display text-lg font-semibold text-charcoal-900">Total</span>
                  <span className="font-display text-2xl font-bold text-charcoal-900">
                    {formatPrice(total)}
                  </span>
                </div>
                <Link to="/checkout" className="btn-primary mt-6 w-full">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
