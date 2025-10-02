"use client";

import { useCart } from "@/store/useCart";
import { useProducts } from "@/hooks/useProduct";

export default function ProductPageClient({ slug }: { slug: string }) {
  const { data: products, isLoading } = useProducts();
  const addItem = useCart((state) => state.addItem);

  if (isLoading) return <p>Loading...</p>;

  const product = products?.find((p) => p.slug === slug);

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-gray-600">{product.subtitle}</p>
      <p className="text-xl font-semibold mt-2">£{product.price}</p>
      <button
        onClick={() =>
          addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
          })
        }
        className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
      >
        Add to Basket
      </button>
    </div>
  );
}
