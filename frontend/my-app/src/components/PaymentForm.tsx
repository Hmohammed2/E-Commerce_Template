"use client";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useCart } from "@/store/useCart";
import { useCheckout } from "@/hooks/useCheckout";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PaymentForm({ formData }: { formData: any }) {
  const stripe = useStripe();
  const elements = useElements();
  const { getCartItems, clearCart } = useCart();
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  const checkoutMutation = useCheckout();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      // 1. Build cart payload
      const items = getCartItems().map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      }));

      // 2. Call backend to create order + intent
      const { clientSecret, order_id } =
        await checkoutMutation.mutateAsync(items);

      // 3. Confirm payment with billing details
      const card = elements.getElement(CardNumberElement);
      if (!card) return;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: formData.billingName,
            email: formData.billingEmail,
            phone: formData.billingPhone,
            address: {
              line1: formData.billingAddress1,
              line2: formData.billingAddress2,
              city: formData.billingCity,
              postal_code: formData.billingPostcode,
              country: formData.billingCountry || "GB", // Stripe uses ISO country codes
            },
          },
        },
      });

      if (result.error) {
        console.error(result.error.message);
        alert(result.error.message);
      } else if (result.paymentIntent?.status === "succeeded") {
        clearCart();
        router.push(`/checkout-success/${order_id}`);
      }
    } catch (err: any) {
      console.error(err.message);
      alert("Payment failed ❌");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Payment Details
      </h2>
      <form onSubmit={handlePayment} className="space-y-6">
        {/* Card Elements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <CardNumberElement className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry
            </label>
            <CardExpiryElement className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVC
            </label>
            <CardCvcElement className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3" />
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || processing || checkoutMutation.isPending}
          className="w-full bg-pink-600 text-white py-2 px-3 rounded-md font-semibold hover:bg-pink-700 disabled:opacity-50"
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
        {/* Powered by Stripe */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 bg-white border rounded-md px-4 py-2 shadow-sm">
            <span className="text-sm text-gray-500">Powered by</span>
            <Image
              src="/stripe-logo.svg"
              alt="Stripe"
              width={100}
              height={100}
              className="h-10 w-auto"
            />
          </div>
        </div>
      </form>
    </section>
  );
}
