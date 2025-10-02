"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/useCart";

export default function CartPage() {
  const {
    items,
    removeItem,
    clearCart,
    updateQuantity,
    getCartItems,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link
          href="/products"
          className="text-blue-600 hover:underline font-medium"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
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
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="rounded-md border"
                />
              )}
              <div>
                <p className="font-medium">{item.title}</p>
                {item.variantId && (
                  <p className="text-sm text-gray-500">{item.variantId}</p>
                )}
                <p className="text-gray-700">£{item.price.toFixed(2)}</p>
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
