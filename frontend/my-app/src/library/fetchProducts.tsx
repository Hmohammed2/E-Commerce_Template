const baseUrl = process.env.NEXT_PUBLIC_API_URL_CLIENT;

export async function fetchProducts() {
  const res = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
