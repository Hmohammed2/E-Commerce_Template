"use client";

import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "@/library/fetchProducts";
import type { Product } from "@/types/product";

export function useSearchProducts(query: string) {
  return useQuery<Product[]>({
    queryKey: ["searchProducts", query],
    queryFn: () => searchProducts(query),
    enabled: !!query, // only run if query is not empty
  });
}
