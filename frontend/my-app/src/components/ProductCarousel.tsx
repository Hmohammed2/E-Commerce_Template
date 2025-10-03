"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "./card"; // your Card component
import type { Product } from "@/types/product";

interface CardProps extends Product {}

interface CarouselProps {
  products: CardProps[];
}

const ProductCarousel: React.FC<CarouselProps> = ({ products }) => {
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3); // default: 3 cards

  // Handle responsive breakpoints
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1); // mobile
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2); // tablet
      } else {
        setVisibleCount(3); // desktop
      }
    };

    updateVisibleCount(); // run on mount
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const prev = () => {
    setCurrent((current - 1 + products.length) % products.length);
  };

  const next = () => {
    setCurrent((current + 1) % products.length);
  };

  // Compute visible items based on visibleCount
  const visibleProducts = Array.from({ length: visibleCount }).map(
    (_, i) => products[(current + i) % products.length]
  );

  return (
    <div className="relative max-w-6xl mx-auto mb-10">
      {/* Left arrow */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow 
                   hover:bg-pink-600 hover:text-white transition z-10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Cards row */}
      <div className="flex justify-center gap-6 px-10">
        {visibleProducts.map((product, id) => (
          <div key={id} className="w-64 flex-shrink-0">
            <Card {...product} />
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow 
                   hover:bg-pink-600 hover:text-white transition z-10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProductCarousel;
