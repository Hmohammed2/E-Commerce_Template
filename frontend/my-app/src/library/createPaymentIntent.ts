const baseUrl = process.env.NEXT_PUBLIC_API_URL_CLIENT;

// lib/checkout.ts
export async function checkout(
  items: { product_id: number; quantity: number }[]
) {
  const res = await fetch(`${baseUrl}/api/checkout/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
    credentials: "include", // so auth cookies are sent
  });

  if (!res.ok) {
    throw new Error("Checkout failed");
  }

  return res.json();
  // { clientSecret, order_id, payment_id, amount, currency }
}
