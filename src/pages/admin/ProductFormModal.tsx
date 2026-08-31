import { useState } from 'react';
import type { ProductWithCategory, Category } from '@/types';
import type { ProductInput } from '@/services/admin';
import { X, Plus, Trash2 } from 'lucide-react';

interface ProductFormModalProps {
  product: ProductWithCategory | null;
  categories: Category[];
  saving: boolean;
  error: string | null;
  onSave: (data: ProductInput) => void;
  onClose: () => void;
}

function arrayToString(arr: string[]): string {
  return arr.join(', ');
}

function stringToArray(str: string): string[] {
  return str
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function ProductFormModal({
  product,
  categories,
  saving,
  error,
  onSave,
  onClose,
}: ProductFormModalProps) {
  const [form, setForm] = useState<ProductInput>({
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    category_id: product?.category_id ?? categories[0]?.id ?? null,
    short_description: product?.short_description ?? '',
    description: product?.description ?? '',
    price: product?.price ?? 0,
    compare_price: product?.compare_price ?? null,
    thumbnail: product?.thumbnail ?? '',
    images: product?.images ?? [],
    sizes: product?.sizes ?? [],
    ingredients: product?.ingredients ?? [],
    origin: product?.origin ?? '',
    weight: product?.weight ?? '',
    availability: product?.availability ?? true,
    featured: product?.featured ?? false,
    best_seller: product?.best_seller ?? false,
    tags: product?.tags ?? [],
    benefits: product?.benefits ?? [],
    usage: product?.usage ?? [],
    storage: product?.storage ?? '',
    sku: product?.sku ?? '',
    seo_title: product?.seo_title ?? '',
    seo_description: product?.seo_description ?? '',
    sort_order: product?.sort_order ?? 99,
  });

  const [imagesText, setImagesText] = useState(arrayToString(form.images));
  const [sizesText, setSizesText] = useState(arrayToString(form.sizes));
  const [ingredientsText, setIngredientsText] = useState(arrayToString(form.ingredients));
  const [tagsText, setTagsText] = useState(arrayToString(form.tags));
  const [benefitsText, setBenefitsText] = useState(arrayToString(form.benefits));
  const [usageText, setUsageText] = useState(arrayToString(form.usage));

  const update = (key: keyof ProductInput, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      price: Number(form.price),
      compare_price: form.compare_price ? Number(form.compare_price) : null,
      images: stringToArray(imagesText),
      sizes: stringToArray(sizesText),
      ingredients: stringToArray(ingredientsText),
      tags: stringToArray(tagsText),
      benefits: stringToArray(benefitsText),
      usage: stringToArray(usageText),
      sort_order: Number(form.sort_order),
    });
  };

  const inputClass =
    'w-full rounded-xl border border-ivory-200 bg-ivory-50 px-4 py-2.5 text-sm text-charcoal-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500';
  const labelClass = 'mb-1.5 block text-sm font-medium text-charcoal-700';

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto">
      <div
        className="fixed inset-0 bg-charcoal-950/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative mx-auto my-8 w-full max-w-3xl rounded-2xl bg-ivory-50 p-6 shadow-2xl animate-scale-in sm:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-charcoal-900">
            {product ? 'Edit Product' : 'Add Product'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-charcoal-400 transition-colors hover:bg-ivory-200 hover:text-charcoal-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Basic info */}
          <div className="rounded-2xl bg-white p-5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-copper-600">
              Basic Information
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Slug *</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => update('slug', e.target.value)}
                  required
                  placeholder="haldi, red-chilli..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <select
                  value={form.category_id ?? ''}
                  onChange={(e) => update('category_id', e.target.value || null)}
                  className={inputClass}
                >
                  <option value="">No category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>SKU</label>
                <input
                  type="text"
                  value={form.sku ?? ''}
                  onChange={(e) => update('sku', e.target.value || null)}
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Short Description</label>
                <input
                  type="text"
                  value={form.short_description ?? ''}
                  onChange={(e) => update('short_description', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Full Description</label>
                <textarea
                  value={form.description ?? ''}
                  onChange={(e) => update('description', e.target.value)}
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="rounded-2xl bg-white p-5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-copper-600">
              Pricing
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className={labelClass}>Price (₹) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => update('price', e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Compare Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.compare_price ?? ''}
                  onChange={(e) => update('compare_price', e.target.value ? Number(e.target.value) : null)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Sort Order</label>
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => update('sort_order', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="rounded-2xl bg-white p-5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-copper-600">
              Images
            </h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Thumbnail URL</label>
                <input
                  type="text"
                  value={form.thumbnail ?? ''}
                  onChange={(e) => update('thumbnail', e.target.value || null)}
                  className={inputClass}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className={labelClass}>All Image URLs (comma-separated)</label>
                <textarea
                  value={imagesText}
                  onChange={(e) => setImagesText(e.target.value)}
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="https://..., https://..."
                />
              </div>
              {form.thumbnail && (
                <div className="h-24 w-24 overflow-hidden rounded-lg bg-ivory-100">
                  <img
                    src={form.thumbnail}
                    alt="Thumbnail preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Arrays */}
          <div className="rounded-2xl bg-white p-5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-copper-600">
              Product Details
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Sizes (comma-separated)</label>
                <input
                  type="text"
                  value={sizesText}
                  onChange={(e) => setSizesText(e.target.value)}
                  className={inputClass}
                  placeholder="100g, 250g, 500g"
                />
              </div>
              <div>
                <label className={labelClass}>Ingredients (comma-separated)</label>
                <input
                  type="text"
                  value={ingredientsText}
                  onChange={(e) => setIngredientsText(e.target.value)}
                  className={inputClass}
                  placeholder="Turmeric, Salt..."
                />
              </div>
              <div>
                <label className={labelClass}>Tags (comma-separated)</label>
                <input
                  type="text"
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                  className={inputClass}
                  placeholder="turmeric, golden, curry"
                />
              </div>
              <div>
                <label className={labelClass}>Origin</label>
                <input
                  type="text"
                  value={form.origin ?? ''}
                  onChange={(e) => update('origin', e.target.value || null)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Weight</label>
                <input
                  type="text"
                  value={form.weight ?? ''}
                  onChange={(e) => update('weight', e.target.value || null)}
                  className={inputClass}
                  placeholder="100g – 1kg"
                />
              </div>
              <div>
                <label className={labelClass}>Storage</label>
                <input
                  type="text"
                  value={form.storage ?? ''}
                  onChange={(e) => update('storage', e.target.value || null)}
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Benefits (comma-separated)</label>
                <input
                  type="text"
                  value={benefitsText}
                  onChange={(e) => setBenefitsText(e.target.value)}
                  className={inputClass}
                  placeholder="Vibrant colour, Warm aroma..."
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Usage (comma-separated)</label>
                <input
                  type="text"
                  value={usageText}
                  onChange={(e) => setUsageText(e.target.value)}
                  className={inputClass}
                  placeholder="Add to curries, Use in marinades..."
                />
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="rounded-2xl bg-white p-5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-copper-600">
              SEO
            </h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>SEO Title</label>
                <input
                  type="text"
                  value={form.seo_title ?? ''}
                  onChange={(e) => update('seo_title', e.target.value || null)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>SEO Description</label>
                <textarea
                  value={form.seo_description ?? ''}
                  onChange={(e) => update('seo_description', e.target.value || null)}
                  rows={2}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>
          </div>

          {/* Status toggles */}
          <div className="rounded-2xl bg-white p-5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-copper-600">
              Status & Flags
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {([
                { key: 'availability', label: 'Available' },
                { key: 'featured', label: 'Featured' },
                { key: 'best_seller', label: 'Best Seller' },
              ] as { key: 'availability' | 'featured' | 'best_seller'; label: string }[]).map(
                (toggle) => (
                  <label
                    key={toggle.key}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-ivory-200 px-4 py-3"
                  >
                    <input
                      type="checkbox"
                      checked={form[toggle.key] as boolean}
                      onChange={(e) => update(toggle.key, e.target.checked)}
                      className="h-5 w-5 rounded border-ivory-300 text-copper-600 focus:ring-copper-500"
                    />
                    <span className="text-sm font-medium text-charcoal-700">{toggle.label}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-copper-50 px-4 py-3 text-sm text-copper-700">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="btn-ghost flex-1">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn-primary flex-1">
              {saving ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-ivory-50 border-t-transparent" />
              ) : product ? (
                'Save Changes'
              ) : (
                'Create Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
