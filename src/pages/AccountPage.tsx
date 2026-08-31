import { Link } from '@/hooks/useRouter';
import Breadcrumbs from '@/components/Breadcrumbs';
import { User, ShoppingBag, Heart, Package, MapPin } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="pt-28">
      <div className="container-luxury">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Account' }]} />
      </div>

      <section className="bg-ivory-100 py-12">
        <div className="container-luxury">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-charcoal-900">
              <User className="h-8 w-8 text-ivory-50" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-semibold text-charcoal-900">My Account</h1>
              <p className="text-sm text-charcoal-500">Manage your orders and preferences</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory-50">
        <div className="container-luxury">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Package, title: 'My Orders', desc: 'Track and review your past orders', to: '/cart' },
              { icon: ShoppingBag, title: 'Shopping Cart', desc: 'View items in your cart', to: '/cart' },
              { icon: Heart, title: 'Wishlist', desc: 'Your saved products', to: '/products' },
              { icon: MapPin, title: 'Addresses', desc: 'Manage shipping addresses', to: '/contact' },
            ].map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className="group rounded-2xl border border-ivory-200 bg-white p-6 transition-all hover:shadow-xl"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-ivory-100 transition-colors group-hover:bg-copper-50">
                  <item.icon className="h-6 w-6 text-copper-600" />
                </div>
                <h3 className="font-display text-lg font-semibold text-charcoal-900">{item.title}</h3>
                <p className="mt-1 text-sm text-charcoal-500">{item.desc}</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-charcoal-950 p-8 text-center sm:p-12">
            <h2 className="font-display text-2xl font-semibold text-ivory-50">
              Account Features Coming Soon
            </h2>
            <p className="mt-2 text-sm text-ivory-200/70">
              We're building a full account experience with order history, saved addresses and more.
              In the meantime, explore our collection.
            </p>
            <Link to="/products" className="btn-primary mt-6 bg-copper-600 hover:bg-copper-500">
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
