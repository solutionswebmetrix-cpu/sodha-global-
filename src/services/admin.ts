import type { Product, ProductWithCategory, Category } from '@/types';

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
  return { ...input, id: `local-${Date.now()}`, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
}

export async function adminUpdateProduct(id: string, input: Partial<ProductInput>): Promise<Product> {
  return {
    id,
    name: input.name ?? '',
    slug: input.slug ?? '',
    category_id: input.category_id ?? null,
    short_description: input.short_description ?? null,
    description: input.description ?? null,
    price: input.price ?? 0,
    compare_price: input.compare_price ?? null,
    thumbnail: input.thumbnail ?? null,
    images: input.images ?? [],
    sizes: input.sizes ?? [],
    ingredients: input.ingredients ?? [],
    origin: input.origin ?? null,
    weight: input.weight ?? null,
    availability: input.availability ?? true,
    featured: input.featured ?? false,
    best_seller: input.best_seller ?? false,
    tags: input.tags ?? [],
    benefits: input.benefits ?? [],
    usage: input.usage ?? [],
    storage: input.storage ?? null,
    sku: input.sku ?? null,
    seo_title: input.seo_title ?? null,
    seo_description: input.seo_description ?? null,
    sort_order: input.sort_order ?? 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export async function adminDeleteProduct(_id: string): Promise<void> {
  return;
}

export async function adminCreateCategory(input: {
  name: string;
  slug: string;
  description?: string;
  sort_order?: number;
}): Promise<Category> {
  return {
    id: `local-${Date.now()}`,
    name: input.name,
    slug: input.slug,
    description: input.description ?? null,
    image: null,
    sort_order: input.sort_order ?? 0,
  };
}

export async function adminUpdateCategory(
  id: string,
  input: Partial<{ name: string; slug: string; description: string; sort_order: number }>
): Promise<Category> {
  return {
    id,
    name: input.name ?? '',
    slug: input.slug ?? '',
    description: input.description ?? null,
    image: null,
    sort_order: input.sort_order ?? 0,
  };
}

export async function adminDeleteCategory(_id: string): Promise<void> {
  return;
}

export async function adminFetchRecommendations(_productId: string): Promise<
  { id: string; recommended_product_id: string; priority: number }[]
> {
  return [];
}

export async function adminAddRecommendation(
  _productId: string,
  _recommendedProductId: string,
  _priority: number
): Promise<void> {
  return;
}

export async function adminRemoveRecommendation(_recId: string): Promise<void> {
  return;
}

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
  return [];
}

export async function adminUpdateOrderStatus(
  _orderId: string,
  _field: 'order_status' | 'payment_status',
  _value: string
): Promise<void> {
  return;
}

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
  return [];
}

export async function adminUpdateEnquiryStatus(
  _enquiryId: string,
  _status: string
): Promise<void> {
  return;
}

export async function adminDeleteEnquiry(_enquiryId: string): Promise<void> {
  return;
}

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
  return {
    totalProducts: 6,
    availableProducts: 6,
    outOfStock: 0,
    featuredProducts: 4,
    bestSellers: 2,
    totalOrders: 0,
    pendingOrders: 0,
    contactEnquiries: 0,
  };
}

export async function validateCartPrices(
  items: { productId: string; price: number }[]
): Promise<{ valid: boolean; mismatches: { productId: string; dbPrice: number; cartPrice: number }[] }> {
  return {
    valid: true,
    mismatches: items.map((item) => ({ productId: item.productId, dbPrice: item.price, cartPrice: item.price })),
  };
}

export type { Product, ProductWithCategory, Category };
