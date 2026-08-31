export function formatPrice(price: number): string {
  return '₹' + price.toFixed(0);
}

export function formatPriceWithDecimals(price: number): string {
  return '₹' + price.toFixed(2);
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
