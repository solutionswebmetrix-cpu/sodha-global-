import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { fetchProducts, fetchCategories } from '@/services/products';
import {
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  type ProductInput,
} from '@/services/admin';
import type { ProductWithCategory, Category } from '@/types';
import { formatPrice } from '@/utils/format';
import ProductFormModal from './ProductFormModal';
import { Plus, Pencil, Trash2, Search, Star, Award, X } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductWithCategory | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadData = () => {
    setLoading(true);
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([p, c]) => {
        setProducts(p);
        setCategories(c);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async (data: ProductInput) => {
    setSaving(true);
    setFormError(null);
    try {
      if (editingProduct) {
        await adminUpdateProduct(editingProduct.id, data);
      } else {
        await adminCreateProduct(data);
      }
      setShowForm(false);
      setEditingProduct(null);
      loadData();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await adminDeleteProduct(deleteId);
      setDeleteId(null);
      loadData();
    } catch {
      // ignore
    }
  };

  return (
    <AdminLayout active="/admin/products">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-charcoal-900">Products</h1>
          <p className="mt-1 text-sm text-charcoal-500">
            {products.length} product{products.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="btn-primary"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal-300" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-full border border-ivory-200 bg-white py-2.5 pl-11 pr-4 text-sm text-charcoal-900 focus:border-copper-500 focus:outline-none focus:ring-1 focus:ring-copper-500"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-20 rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-charcoal-500">
          No products found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ivory-200 text-left text-xs uppercase tracking-[0.15em] text-charcoal-400">
                <th className="px-4 py-4 font-medium">Product</th>
                <th className="hidden px-4 py-4 font-medium sm:table-cell">Category</th>
                <th className="px-4 py-4 font-medium">Price</th>
                <th className="hidden px-4 py-4 font-medium sm:table-cell">Status</th>
                <th className="px-4 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-ivory-100 last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-ivory-100">
                        {product.thumbnail && (
                          <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-charcoal-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-charcoal-400">/{product.slug}</p>
                        <div className="mt-1 flex gap-1">
                          {product.featured && (
                            <Star className="h-3.5 w-3.5 text-saffron-500" fill="currentColor" />
                          )}
                          {product.best_seller && (
                            <Award className="h-3.5 w-3.5 text-copper-500" fill="currentColor" />
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <span className="rounded-full bg-ivory-100 px-3 py-1 text-xs font-medium text-charcoal-600">
                      {product.category?.name ?? '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-charcoal-900">
                      {formatPrice(product.price)}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <span
                      className={`flex items-center gap-1.5 text-xs font-medium ${
                        product.availability ? 'text-sage-600' : 'text-copper-600'
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          product.availability ? 'bg-sage-500' : 'bg-copper-500'
                        }`}
                      />
                      {product.availability ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setShowForm(true);
                        }}
                        className="rounded-lg p-2 text-charcoal-500 transition-colors hover:bg-ivory-100 hover:text-copper-600"
                        aria-label="Edit product"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(product.id)}
                        className="rounded-lg p-2 text-charcoal-500 transition-colors hover:bg-copper-50 hover:text-copper-600"
                        aria-label="Delete product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Product form modal */}
      {showForm && (
        <ProductFormModal
          product={editingProduct}
          categories={categories}
          saving={saving}
          error={formError}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
            setFormError(null);
          }}
        />
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-charcoal-950/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setDeleteId(null)}
          />
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-scale-in">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-copper-50">
              <Trash2 className="h-6 w-6 text-copper-600" />
            </div>
            <h3 className="font-display text-xl font-semibold text-charcoal-900">
              Delete Product?
            </h3>
            <p className="mt-2 text-sm text-charcoal-500">
              This action cannot be undone. The product and all its recommendations will be
              permanently removed.
            </p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setDeleteId(null)} className="btn-ghost flex-1">
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-copper-600 px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-ivory-50 transition-colors hover:bg-copper-500"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
