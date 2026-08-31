import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { fetchProducts } from '@/services/products';
import {
  adminFetchRecommendations,
  adminAddRecommendation,
  adminRemoveRecommendation,
} from '@/services/admin';
import type { ProductWithCategory } from '@/types';
import { Plus, Trash2, Network, ArrowRight } from 'lucide-react';

export default function AdminRecommendationsPage() {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [recommendations, setRecommendations] = useState<
    { id: string; recommended_product_id: string; priority: number }[]
  >([]);
  const [newRecId, setNewRecId] = useState('');
  const [newPriority, setNewPriority] = useState(1);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        if (data.length > 0) setSelectedProductId(data[0].id);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedProductId) return;
    adminFetchRecommendations(selectedProductId)
      .then(setRecommendations)
      .catch(() => setRecommendations([]));
  }, [selectedProductId]);

  const handleAdd = async () => {
    if (!newRecId || !selectedProductId) return;
    if (newRecId === selectedProductId) return;
    setActionLoading(true);
    try {
      await adminAddRecommendation(selectedProductId, newRecId, Number(newPriority));
      const recs = await adminFetchRecommendations(selectedProductId);
      setRecommendations(recs);
      setNewRecId('');
      setNewPriority(1);
    } catch {
      // ignore
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemove = async (recId: string) => {
    setActionLoading(true);
    try {
      await adminRemoveRecommendation(recId);
      const recs = await adminFetchRecommendations(selectedProductId);
      setRecommendations(recs);
    } catch {
      // ignore
    } finally {
      setActionLoading(false);
    }
  };

  const selectedProduct = products.find((p) => p.id === selectedProductId);
  const availableProducts = products.filter(
    (p) =>
      p.id !== selectedProductId &&
      !recommendations.some((r) => r.recommended_product_id === p.id)
  );

  const recProductMap = new Map(products.map((p) => [p.id, p]));

  return (
    <AdminLayout active="/admin/recommendations">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-charcoal-900">
          Recommendations
        </h1>
        <p className="mt-1 text-sm text-charcoal-500">
          Manage which products are recommended for each product
        </p>
      </div>

      {loading ? (
        <div className="skeleton h-96 rounded-2xl" />
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Product selector */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-copper-600">
                Select Product
              </h3>
              <div className="space-y-1.5 max-h-[600px] overflow-y-auto">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProductId(product.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                      selectedProductId === product.id
                        ? 'bg-copper-50 text-charcoal-900'
                        : 'text-charcoal-600 hover:bg-ivory-100'
                    }`}
                  >
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-ivory-100">
                      {product.thumbnail && (
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-charcoal-400">
                        {recommendations.filter((r) => r.recommended_product_id === product.id).length} recs
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendation manager */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              {selectedProduct && (
                <>
                  <div className="mb-6 flex items-center gap-2 border-b border-ivory-200 pb-4">
                    <Network className="h-5 w-5 text-copper-600" />
                    <h3 className="font-display text-lg font-semibold text-charcoal-900">
                      {selectedProduct.name}
                    </h3>
                  </div>

                  {/* Current recommendations */}
                  <div className="mb-6">
                    <p className="mb-3 text-sm font-medium text-charcoal-700">
                      Current Recommendations ({recommendations.length})
                    </p>
                    {recommendations.length === 0 ? (
                      <p className="rounded-xl bg-ivory-100 px-4 py-6 text-center text-sm text-charcoal-400">
                        No recommendations set. Add products below.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {recommendations.map((rec) => {
                          const recProduct = recProductMap.get(rec.recommended_product_id);
                          return (
                            <div
                              key={rec.id}
                              className="flex items-center gap-3 rounded-xl border border-ivory-200 px-4 py-3"
                            >
                              <div className="flex items-center gap-2 text-xs font-medium text-charcoal-400">
                                P{rec.priority}
                              </div>
                              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-ivory-100">
                                {recProduct?.thumbnail && (
                                  <img
                                    src={recProduct.thumbnail}
                                    alt={recProduct.name}
                                    className="h-full w-full object-cover"
                                  />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-charcoal-900">
                                  {recProduct?.name ?? 'Unknown product'}
                                </p>
                              </div>
                              <button
                                onClick={() => handleRemove(rec.id)}
                                disabled={actionLoading}
                                className="rounded-lg p-2 text-charcoal-400 transition-colors hover:bg-copper-50 hover:text-copper-600"
                                aria-label="Remove recommendation"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Add new */}
                  {availableProducts.length > 0 && (
                    <div className="rounded-xl border border-ivory-200 p-4">
                      <p className="mb-3 text-sm font-medium text-charcoal-700">
                        Add Recommendation
                      </p>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                        <div className="flex-1">
                          <label className="mb-1 block text-xs text-charcoal-400">Product</label>
                          <select
                            value={newRecId}
                            onChange={(e) => setNewRecId(e.target.value)}
                            className="w-full rounded-xl border border-ivory-200 bg-ivory-50 px-4 py-2.5 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-copper-500"
                          >
                            <option value="">Select a product...</option>
                            {availableProducts.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="sm:w-24">
                          <label className="mb-1 block text-xs text-charcoal-400">Priority</label>
                          <input
                            type="number"
                            min="1"
                            value={newPriority}
                            onChange={(e) => setNewPriority(Number(e.target.value))}
                            className="w-full rounded-xl border border-ivory-200 bg-ivory-50 px-4 py-2.5 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-copper-500"
                          />
                        </div>
                        <button
                          onClick={handleAdd}
                          disabled={!newRecId || actionLoading}
                          className="btn-primary whitespace-nowrap"
                        >
                          <Plus className="h-4 w-4" />
                          Add
                        </button>
                      </div>
                      <p className="mt-2 text-xs text-charcoal-400">
                        Priority 1 = shown first. Lower number = higher priority.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
