export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  sort_order: number;
}

export interface Product {
  id: string;
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
  created_at: string;
  updated_at: string;
}

export interface ProductWithCategory extends Product {
  category?: Category | null;
}

export interface ProductRecommendation {
  id: string;
  product_id: string;
  recommended_product_id: string;
  priority: number;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  thumbnail: string | null;
  size: string;
  quantity: number;
}

export interface OrderInput {
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
  notes?: string;
}

export interface OrderItemInput {
  order_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  price: number;
  size: string;
}

export interface ContactEnquiry {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}
