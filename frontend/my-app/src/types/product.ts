export type Product = {
  id: number;
  title: string;
  subtitle: string;
  price: number; // DRF returns DecimalField as string
  image: string;
  category?: string;
  available?: boolean;
  slug: string;
  description?: string;
  variantId?: number; // Optional variant ID
};
