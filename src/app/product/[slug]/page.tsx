"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

export default function ProductDetails() {
  const { slug } = useParams(); // Fetch slug from the URL
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const query = `*[_type == "products" && slug.current == $slug][0]`;
      const data = await client.fetch(query, { slug });
      setProduct(data);
    };

    if (slug) fetchProduct();
  }, [slug]);

  if (!product) {
    return (
      <div className="container mx-auto text-center py-20">
        <p className="text-2xl">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Image
            src={product.image.asset.url}
            alt={product.description}
            width={500}
            height={500}
            className="rounded-lg object-cover"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="text-2xl font-semibold text-black mb-6">
            ${product.price}
            {product.priceWithoutDiscount && (
              <span className="text-gray-400 line-through text-lg ml-2">
                ${product.priceWithoutDiscount}
              </span>
            )}
          </div>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
