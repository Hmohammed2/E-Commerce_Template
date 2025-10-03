"use client";

import { useMutation } from "@tanstack/react-query";
import { checkout } from "@/library/createPaymentIntent";

export function useCheckout() {
  return useMutation({
    mutationFn: checkout,
  });
}
