"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProductBySlug } from "@/library/fetchProducts";
import type { Product } from "@/types/product";

export function useProductBySlug(slug: string) {
  return useQuery<Product>({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
    enabled: !!slug, // only fetch if slug is defined
  });
}
