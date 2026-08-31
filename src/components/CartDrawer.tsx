import { Link } from '@/hooks/useRouter';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/format';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <div
        className="absolute inset-0 bg-charcoal-950/50 backdrop-blur-sm animate-fade-in"
        onClick={closeCart}
      />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory-50 shadow-2xl animate-slide-down">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ivory-200 px-6 py-5">
          <div>
            <h3 className="font-display text-xl font-semibold text-charcoal-900">
              Your Cart
            </h3>
            <p className="text-xs text-charcoal-400">
              {itemCount} item{itemCount !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="rounded-full p-2 text-charcoal-400 transition-colors hover:bg-ivory-200 hover:text-charcoal-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-ivory-200">
              <ShoppingBag className="h-10 w-10 text-charcoal-300" />
            </div>
            <h4 className="font-display text-2xl text-charcoal-900">
              Your Cart is Waiting
            </h4>
            <p className="mt-2 text-sm text-charcoal-500">
              Discover something delicious from the Sodha Global collection.
            </p>
            <Link
              to="/products"
              onClick={closeCart}
              className="btn-primary mt-6"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex gap-4 rounded-xl bg-white p-3 shadow-sm"
                  >
                    <Link
                      to={`/products/${item.slug}`}
                      onClick={closeCart}
                      className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-ivory-100"
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
                        <h4 className="font-display text-base font-semibold text-charcoal-900">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.productId, item.size)}
                          className="text-charcoal-300 transition-colors hover:text-copper-600"
                          aria-label="Remove item"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-charcoal-400">Size: {item.size}</p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 rounded-full border border-ivory-200">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.size, item.quantity - 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full text-charcoal-600 transition-colors hover:bg-ivory-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium text-charcoal-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.size, item.quantity + 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full text-charcoal-600 transition-colors hover:bg-ivory-100"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-display text-base font-semibold text-charcoal-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-ivory-200 px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-charcoal-500">Subtotal</span>
                <span className="font-display text-2xl font-semibold text-charcoal-900">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mb-4 text-xs text-charcoal-400">
                Shipping and taxes calculated at checkout.
              </p>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="btn-primary w-full"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/cart"
                onClick={closeCart}
                className="btn-ghost mt-2 w-full"
              >
                View Full Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
