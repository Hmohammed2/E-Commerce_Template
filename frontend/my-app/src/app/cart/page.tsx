"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/useCart";
import { getImageUrl } from "@/library/getImageUrl";

export default function CartPage() {
  const { items, removeItem, clearCart, updateQuantity, getTotalPrice } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen max-w-3xl mx-auto py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link
          href="/shop"
          className="text-blue-600 hover:underline font-medium"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto py-12 px-4">
      {/* Notice Bar */}
      <div className="mb-6 rounded-md bg-yellow-100 border border-yellow-300 p-4 text-sm text-yellow-900 text-center">
        <p>
          <strong>Note:</strong> As of now we are only supplying curated
          products to fellow enthusiasts in the{" "}
          <span className="font-semibold">United Kingdom</span>. This may change
          in the near future once we scale up. If you’d like to discuss orders
          outside the UK, please email{" "}
          <a
            href="mailto:sales@arcadesticklabs.co.uk"
            className="underline font-medium text-yellow-800 hover:text-yellow-900"
          >
            sales@arcadesticklabs.co.uk
          </a>
          .
        </p>
      </div>

      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              {item.image && (
                <Image
                  src={getImageUrl(item.image)}
                  alt={item.title}
                  width={200}
                  height={100}
                  className="rounded-md border mx-auto object-contain"
                />
              )}
              <div className="ml-10">
                <p className="font-medium">{item.title}</p>
                {item.variantId && (
                  <p className="text-sm text-gray-500">{item.variantId}</p>
                )}
                <p className="text-gray-700">£{item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value) || 1)
                }
                className="w-16 border rounded px-2 py-1 text-center"
              />
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4">
        <p className="text-xl font-semibold">
          Subtotal: £{getTotalPrice().toFixed(2)}
        </p>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm"
          >
            Clear Cart
          </button>
          <Link
            href="/checkout"
            className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
