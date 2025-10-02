export interface cartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  variantId?: number; // Optional variant ID
}
