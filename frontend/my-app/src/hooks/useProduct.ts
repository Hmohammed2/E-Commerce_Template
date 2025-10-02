"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/library/fetchProducts";
import type { Product } from "@/types/product";

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}
