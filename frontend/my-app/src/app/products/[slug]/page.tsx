import type { Metadata } from "next";
import { fetchProducts } from "@/library/fetchProducts"; // API fetcher
import ProductPageClient from "@/components/ProductPageClient";

type Props = {
  params: { slug: string };
};

// ✅ Generate SEO metadata dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const products = await fetchProducts();
  const product = products.find(
    (p: { slug: string }) => p.slug === params.slug
  );

  if (!product) {
    return {
      title: "Product not found — ArcadeStickLabs",
      description: "The product you are looking for could not be found.",
    };
  }

  return {
    title: `${product.title} — ArcadeStickLabs`,
    description:
      product.subtitle ||
      `Buy ${product.title} from ArcadeStickLabs. Fast UK shipping, trusted brands.`,
    openGraph: {
      title: product.title,
      description: product.subtitle || product.title,
      type: "product",
      url: `https://arcadesticklabs.co.uk/products/${product.slug}`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.subtitle || product.title,
      images: [product.image],
    },
  };
}

// ✅ Server-render wrapper
export default async function ProductPage({ params }: Props) {
  return <ProductPageClient slug={params.slug} />;
}
