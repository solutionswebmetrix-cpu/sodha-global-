import { supabase } from '@/lib/supabase';
import type { Product, ProductWithCategory, Category } from '@/types';

// ============================================================
// PRODUCT CRUD
// ============================================================

export interface ProductInput {
  name: string;
  slug: string;
  category_id: string | null;
  short_description: string | null;
  description: string | null;
  price: number;
  compare_price: number | null;
  thumbnail: string | null;
  images: string[];
  sizes: string[];
  ingredients: string[];
  origin: string | null;
  weight: string | null;
  availability: boolean;
  featured: boolean;
  best_seller: boolean;
  tags: string[];
  benefits: string[];
  usage: string[];
  storage: string | null;
  sku: string | null;
  seo_title: string | null;
  seo_description: string | null;
  sort_order: number;
}

export async function adminCreateProduct(input: ProductInput): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert(input)
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function adminUpdateProduct(
  id: string,
  input: Partial<ProductInput>
): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update(input)
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function adminDeleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}

// ============================================================
// CATEGORY CRUD
// ============================================================

export async function adminCreateCategory(input: {
  name: string;
  slug: string;
  description?: string;
  sort_order?: number;
}): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .insert(input)
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function adminUpdateCategory(
  id: string,
  input: Partial<{ name: string; slug: string; description: string; sort_order: number }>
): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .update(input)
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function adminDeleteCategory(id: string): Promise<void> {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) throw error;
}

// ============================================================
// RECOMMENDATION CRUD
// ============================================================

export async function adminFetchRecommendations(productId: string): Promise<
  { id: string; recommended_product_id: string; priority: number }[]
> {
  const { data, error } = await supabase
    .from('product_recommendations')
    .select('id, recommended_product_id, priority')
    .eq('product_id', productId)
    .order('priority', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function adminAddRecommendation(
  productId: string,
  recommendedProductId: string,
  priority: number
): Promise<void> {
  const { error } = await supabase
    .from('product_recommendations')
    .insert({
      product_id: productId,
      recommended_product_id: recommendedProductId,
      priority,
    });
  if (error) throw error;
}

export async function adminRemoveRecommendation(recId: string): Promise<void> {
  const { error } = await supabase
    .from('product_recommendations')
    .delete()
    .eq('id', recId);
  if (error) throw error;
}

// ============================================================
// ORDER MANAGEMENT
// ============================================================

export interface OrderWithItems {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  subtotal: number;
  shipping: number;
  total: number;
  payment_status: string;
  order_status: string;
  notes: string | null;
  created_at: string;
  order_items: {
    id: string;
    product_id: string | null;
    product_name: string;
    quantity: number;
    price: number;
    size: string;
  }[];
}

export async function adminFetchOrders(): Promise<OrderWithItems[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function adminUpdateOrderStatus(
  orderId: string,
  field: 'order_status' | 'payment_status',
  value: string
): Promise<void> {
  const { error } = await supabase
    .from('orders')
    .update({ [field]: value })
    .eq('id', orderId);
  if (error) throw error;
}

// ============================================================
// ENQUIRY MANAGEMENT
// ============================================================

export interface ContactEnquiryRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
}

export async function adminFetchEnquiries(): Promise<ContactEnquiryRow[]> {
  const { data, error } = await supabase
    .from('contact_enquiries')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function adminUpdateEnquiryStatus(
  enquiryId: string,
  status: string
): Promise<void> {
  const { error } = await supabase
    .from('contact_enquiries')
    .update({ status })
    .eq('id', enquiryId);
  if (error) throw error;
}

export async function adminDeleteEnquiry(enquiryId: string): Promise<void> {
  const { error } = await supabase
    .from('contact_enquiries')
    .delete()
    .eq('id', enquiryId);
  if (error) throw error;
}

// ============================================================
// DASHBOARD STATS
// ============================================================

export interface DashboardStats {
  totalProducts: number;
  availableProducts: number;
  outOfStock: number;
  featuredProducts: number;
  bestSellers: number;
  totalOrders: number;
  pendingOrders: number;
  contactEnquiries: number;
}

export async function adminFetchStats(): Promise<DashboardStats> {
  const [productsRes, ordersRes, enquiriesRes] = await Promise.all([
    supabase.from('products').select('availability, featured, best_seller'),
    supabase.from('orders').select('order_status'),
    supabase.from('contact_enquiries').select('id', { count: 'exact', head: true }),
  ]);

  const products = productsRes.data ?? [];
  const orders = ordersRes.data ?? [];

  return {
    totalProducts: products.length,
    availableProducts: products.filter((p) => p.availability).length,
    outOfStock: products.filter((p) => !p.availability).length,
    featuredProducts: products.filter((p) => p.featured).length,
    bestSellers: products.filter((p) => p.best_seller).length,
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.order_status === 'new').length,
    contactEnquiries: enquiriesRes.count ?? 0,
  };
}

// ============================================================
// PRICE VALIDATION (for checkout)
// ============================================================

export async function validateCartPrices(
  items: { productId: string; price: number }[]
): Promise<{ valid: boolean; mismatches: { productId: string; dbPrice: number; cartPrice: number }[] }> {
  const ids = items.map((i) => i.productId);
  const { data, error } = await supabase
    .from('products')
    .select('id, price')
    .in('id', ids);

  if (error) throw error;

  const priceMap = new Map((data ?? []).map((p) => [p.id, Number(p.price)]));
  const mismatches: { productId: string; dbPrice: number; cartPrice: number }[] = [];

  for (const item of items) {
    const dbPrice = priceMap.get(item.productId);
    if (dbPrice === undefined || dbPrice !== item.price) {
      mismatches.push({
        productId: item.productId,
        dbPrice: dbPrice ?? 0,
        cartPrice: item.price,
      });
    }
  }

  return { valid: mismatches.length === 0, mismatches };
}

export type { Product, ProductWithCategory, Category };
