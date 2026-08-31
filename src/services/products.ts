import { supabase } from '@/lib/supabase';
import haldiImage from '@/assets/Haldi.png';
import mirchImage from '@/assets/Mirch.png';
import jeeraImage from '@/assets/Jeera.png';
import dhaniyaImage from '@/assets/Dhaniya.png';
import garamMasalaImage from '@/assets/Garam Masala.png';
import peanutsImage from '@/assets/Peanuts.png';
import type {
  Product,
  ProductWithCategory,
  Category,
  OrderInput,
  OrderItemInput,
  ContactEnquiry,
} from '@/types';

export const PRODUCT_ASSET_MAP = {
  haldi: { thumbnail: haldiImage, images: [haldiImage] },
  turmeric: { thumbnail: haldiImage, images: [haldiImage] },
  mirch: { thumbnail: mirchImage, images: [mirchImage] },
  'red-chilli': { thumbnail: mirchImage, images: [mirchImage] },
  chilli: { thumbnail: mirchImage, images: [mirchImage] },
  jeera: { thumbnail: jeeraImage, images: [jeeraImage] },
  cumin: { thumbnail: jeeraImage, images: [jeeraImage] },
  dhaniya: { thumbnail: dhaniyaImage, images: [dhaniyaImage] },
  coriander: { thumbnail: dhaniyaImage, images: [dhaniyaImage] },
  'garam-masala': { thumbnail: garamMasalaImage, images: [garamMasalaImage] },
  peanuts: { thumbnail: peanutsImage, images: [peanutsImage] },
} as const;

const normalizeProductKey = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

function applyProductAssetData<T extends Partial<ProductWithCategory>>(product: T): T {
  if (!product) return product;

  const slugKey = product.slug ? normalizeProductKey(product.slug) : '';
  const nameKey = product.name ? normalizeProductKey(product.name) : '';
  const asset = PRODUCT_ASSET_MAP[slugKey as keyof typeof PRODUCT_ASSET_MAP] ??
    PRODUCT_ASSET_MAP[nameKey as keyof typeof PRODUCT_ASSET_MAP];

  if (!asset) return product;

  return {
    ...product,
    thumbnail: asset.thumbnail,
    images: asset.images,
  };
}

function mapProducts<T extends Partial<ProductWithCategory>>(items: T[] | null | undefined): T[] {
  return (items ?? []).map((item) => applyProductAssetData(item));
}

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchProducts(): Promise<ProductWithCategory[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return mapProducts(data ?? []) as ProductWithCategory[];
}

export async function fetchProductBySlug(slug: string): Promise<ProductWithCategory | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data ? (applyProductAssetData(data) as ProductWithCategory) : null;
}

export async function fetchRecommendedProducts(productId: string): Promise<ProductWithCategory[]> {
  const { data: recs, error: recError } = await supabase
    .from('product_recommendations')
    .select('recommended_product_id, priority')
    .eq('product_id', productId)
    .order('priority', { ascending: true })
    .limit(4);

  if (recError) throw recError;
  if (!recs || recs.length === 0) return [];

  const ids = recs.map((r) => r.recommended_product_id);
  const { data: products, error: prodError } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .in('id', ids);

  if (prodError) throw prodError;
  if (!products) return [];

  // Sort by recommendation priority
  const priorityMap = new Map(recs.map((r) => [r.recommended_product_id, r.priority]));
  return mapProducts(products)
    .sort((a, b) => {
      const pa = priorityMap.get(a.id) ?? 999;
      const pb = priorityMap.get(b.id) ?? 999;
      return pa - pb;
    }) as ProductWithCategory[];
}

export async function searchProducts(query: string): Promise<ProductWithCategory[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .or(
      `name.ilike.%${query}%,short_description.ilike.%${query}%,description.ilike.%${query}%`
    )
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return mapProducts(data ?? []) as ProductWithCategory[];
}

export async function createOrder(
  order: OrderInput,
  items: Omit<OrderItemInput, 'order_id'>[]
): Promise<{ id: string }> {
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert(order)
    .select('id')
    .single();

  if (orderError) throw orderError;
  if (!orderData) throw new Error('Failed to create order');

  const orderItems = items.map((item) => ({
    ...item,
    order_id: orderData.id,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) throw itemsError;
  return { id: orderData.id };
}

export async function submitContactEnquiry(enquiry: ContactEnquiry): Promise<void> {
  const { error } = await supabase.from('contact_enquiries').insert(enquiry);
  if (error) throw error;
}

export async function subscribeNewsletter(email: string): Promise<void> {
  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email });
  if (error) throw error;
}

export type { Product, ProductWithCategory, Category };
