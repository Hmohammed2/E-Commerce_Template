// app/checkout-success/[orderId]/page.tsx
import { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: { orderId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Order #${params.orderId} - Checkout Success`,
    description:
      "Thank you for your purchase! Your order was placed successfully.",
  };
}

export default async function CheckoutSuccessPage({ params }: Props) {
  const { orderId } = params;

  // ⚡ Example: Fetch order details from your Django API
  // Replace with your real API call
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_CLIENT}/api/orders/${orderId}/`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16">
        <h1 className="text-2xl font-bold text-red-600">Order not found</h1>
        <p className="mt-4">We couldn’t find this order in our system.</p>
        <Link
          href="/"
          className="mt-6 inline-block bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const order = await res.json();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful ✅
      </h1>
      <p className="mt-4 text-lg">Thank you for your order!</p>

      <div className="mt-8 bg-white shadow rounded-lg p-6 text-left">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Order Summary
        </h2>
        <p>
          <span className="font-medium">Order ID:</span> #{order.id}
        </p>
        <p>
          <span className="font-medium">Status:</span> {order.status}
        </p>
        <p>
          <span className="font-medium">Total:</span> £{order.total_price}
        </p>

        <div className="mt-6">
          <h3 className="font-medium text-gray-800 mb-2">Items:</h3>
          <ul className="space-y-2">
            {order.items?.map((item: any) => (
              <li key={item.id} className="flex justify-between border-b pb-2">
                <span>
                  {item.quantity} × {item.product.name}
                </span>
                <span>£{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        href="/"
        className="mt-8 inline-block bg-pink-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-pink-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
