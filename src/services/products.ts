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

const categories: Category[] = [
  { id: 'cat-spices', name: 'Spices', slug: 'spices', description: 'Premium spices', image: null, sort_order: 1 },
  { id: 'cat-masala', name: 'Masala', slug: 'masala', description: 'Signature blends', image: null, sort_order: 2 },
  { id: 'cat-nuts', name: 'Nuts', slug: 'nuts', description: 'Premium nuts and seeds', image: null, sort_order: 3 },
];

const categoryById = new Map(categories.map((cat) => [cat.id, cat]));

const normalizeProductKey = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

function buildProduct(
  id: string,
  name: string,
  slug: string,
  categoryId: string,
  overrides: Partial<Product> = {}
): Product {
  const asset = PRODUCT_ASSET_MAP[normalizeProductKey(slug) as keyof typeof PRODUCT_ASSET_MAP] ??
    PRODUCT_ASSET_MAP[normalizeProductKey(name) as keyof typeof PRODUCT_ASSET_MAP];

  return {
    id,
    name,
    slug,
    category_id: categoryId,
    short_description: 'Authentic Indian flavour from trusted growers.',
    description: 'Premium quality product crafted for real taste and everyday excellence.',
    price: 0,
    compare_price: null,
    thumbnail: asset?.thumbnail ?? null,
    images: [...(asset?.images ?? [])],
    sizes: [],
    ingredients: [],
    origin: 'India',
    weight: '500 g',
    availability: true,
    featured: false,
    best_seller: false,
    tags: [],
    benefits: [],
    usage: [],
    storage: 'Store in a cool, dry place away from sunlight.',
    sku: null,
    seo_title: null,
    seo_description: null,
    sort_order: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  };
}

const products: Product[] = [
  buildProduct('prod-haldi', 'Haldi / Turmeric', 'haldi', 'cat-spices', {
    price: 190,
    compare_price: 220,
    featured: true,
    best_seller: true,
    sort_order: 1,
    short_description: 'Warm, earthy turmeric with a rich golden hue and authentic flavour.',
    description: 'Haldi / Turmeric brings depth, colour and warmth to everyday Indian cooking. Carefully sourced for consistent quality and a vibrant finish.',
    ingredients: ['Turmeric'],
    benefits: ['Rich flavour', 'Natural colour', 'Everyday staple'],
    usage: ['Add to curries and gravies', 'Use for haldi doodh and festive recipes'],
  }),
  buildProduct('prod-mirch', 'Mirch / Red Chilli', 'red-chilli', 'cat-spices', {
    price: 210,
    compare_price: 240,
    featured: true,
    sort_order: 2,
    short_description: 'Bold red chilli with vibrant colour and authentic heat.',
    description: 'Mirch / Red Chilli adds brightness and warmth to dishes, making it an essential flavour base for Indian cooking.',
    ingredients: ['Red chilli'],
    benefits: ['Vibrant colour', 'Authentic heat', 'Balanced flavour'],
    usage: ['Use in masalas and gravies', 'Perfect for curries and pickles'],
  }),
  buildProduct('prod-jeera', 'Jeera / Cumin', 'cumin', 'cat-spices', {
    price: 220,
    compare_price: 260,
    best_seller: true,
    sort_order: 3,
    short_description: 'Aromatic cumin with a warm, earthy and nutty profile.',
    description: 'Jeera / Cumin brings an unmistakable earthy aroma and a soft warming flavour that defines many classic Indian dishes.',
    ingredients: ['Cumin'],
    benefits: ['Warm aroma', 'Digestive ease', 'Essential spice'],
    usage: ['Temper in hot oil', 'Use in dals, curries and rice'],
  }),
  buildProduct('prod-dhaniya', 'Dhaniya / Coriander', 'coriander', 'cat-spices', {
    price: 200,
    compare_price: 230,
    sort_order: 4,
    short_description: 'Citrusy, fresh coriander with a clean, balanced profile.',
    description: 'Dhaniya / Coriander is a staple spice for layered aroma and fresh flavour. It provides depth without overpowering the dish.',
    ingredients: ['Coriander'],
    benefits: ['Fresh aroma', 'Balanced flavour', 'Everyday ingredient'],
    usage: ['Use in chutneys and masalas', 'Great with curries and snacks'],
  }),
  buildProduct('prod-garam-masala', 'Garam Masala', 'garam-masala', 'cat-masala', {
    price: 260,
    compare_price: 300,
    featured: true,
    sort_order: 5,
    short_description: 'A premium spice blend with warmth, depth and aroma.',
    description: 'Garam Masala is a signature blend of roasted spices, crafted for richness, warmth and culinary depth.',
    ingredients: ['Coriander', 'Cinnamon', 'Black pepper', 'Cloves'],
    benefits: ['Complex aroma', 'Rich warmth', 'Signature blend'],
    usage: ['Finish curries and gravies', 'Season rice and vegetables'],
  }),
  buildProduct('prod-peanuts', 'Peanuts', 'peanuts', 'cat-nuts', {
    price: 180,
    compare_price: 210,
    sort_order: 6,
    short_description: 'Roasted peanuts with a wholesome crunch and rich taste.',
    description: 'Our premium peanuts are selected for flavour, crunch and quality, making them an ideal snack or ingredient for everyday use.',
    ingredients: ['Peanuts'],
    benefits: ['Crunchy and satisfying', 'High-quality protein', 'Premium snack'],
    usage: ['Roasted snack', 'Add to recipes and trail mixes'],
  }),
];

const recommendationMap: Record<string, string[]> = {
  'prod-haldi': ['prod-jeera', 'prod-dhaniya', 'prod-garam-masala'],
  'prod-mirch': ['prod-jeera', 'prod-garam-masala', 'prod-haldi'],
  'prod-jeera': ['prod-haldi', 'prod-dhaniya', 'prod-garam-masala'],
  'prod-dhaniya': ['prod-jeera', 'prod-garam-masala', 'prod-peanuts'],
  'prod-garam-masala': ['prod-haldi', 'prod-jeera', 'prod-dhaniya'],
  'prod-peanuts': ['prod-dhaniya', 'prod-jeera', 'prod-garam-masala'],
};

const productMap = new Map(products.map((product) => [product.id, product]));

const withCategory = (product: Product): ProductWithCategory => ({
  ...product,
  category: categoryById.get(product.category_id ?? '') ?? null,
});

export async function fetchCategories(): Promise<Category[]> {
  return [...categories].sort((a, b) => a.sort_order - b.sort_order);
}

export async function fetchProducts(): Promise<ProductWithCategory[]> {
  return products.map(withCategory);
}

export async function fetchProductBySlug(slug: string): Promise<ProductWithCategory | null> {
  const product = products.find((item) => item.slug === slug);
  return product ? withCategory(product) : null;
}

export async function fetchRecommendedProducts(productId: string): Promise<ProductWithCategory[]> {
  const ids = recommendationMap[productId] ?? [];
  return ids
    .map((id) => productMap.get(id))
    .filter((product): product is Product => Boolean(product))
    .map(withCategory);
}

export async function searchProducts(query: string): Promise<ProductWithCategory[]> {
  const term = query.trim().toLowerCase();
  if (!term) return [];

  return products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.short_description?.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term)
    )
    .map(withCategory);
}

export async function createOrder(
  order: OrderInput,
  items: Omit<OrderItemInput, 'order_id'>[]
): Promise<{ id: string }> {
  void order;
  void items;
  return { id: 'local-order' };
}

export async function submitContactEnquiry(enquiry: ContactEnquiry): Promise<void> {
  void enquiry;
}

export async function subscribeNewsletter(email: string): Promise<void> {
  void email;
}

export type { Product, ProductWithCategory, Category };
