"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";  // Correct import
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { Product } from "../../types/products"; // Assuming you have the Product interface
import { toast } from "@/hooks/use-toast";
import { BsCartDash } from "react-icons/bs";

export default function ProductDetails() {
  const { slug } = useParams(); // Fetch slug from the URL
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const query = `*[_type == "products" && slug.current == $slug][0]{
        _id,
        title,
        price,
        priceWithoutDiscount,
        badge,
        "imageUrl": image.asset->url,
        description
      }`;
      const data: Product = await client.fetch(query, { slug });
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
    <div className="container mx-auto py-12 px-4 ">
      <div className="flex gap-6 lg:grid-cols-2 ">
        <div className="w-auto h-auto aspect-square lg:w-1/2 ">
          <Image
            src={product.imageUrl} // Use imageUrl from the Product interface
            alt={product.description}
            width={1200}
            height={500}
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>

        <div className="w-1/2 mt-16">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">
            {product.description}
            <br></br>A very comfortable and economic product at a suitable price,
            available in different sizes and colors. Try it once and recommend it to others.
          </p>
          <div className="text-2xl font-semibold text-black mb-6">
            ${product.price}
            {product.priceWithoutDiscount && (
              <span className="text-gray-400 line-through text-lg ml-2">
                ${product.priceWithoutDiscount}
              </span>
            )}
          </div>
          <button
            onClick={() => {
              toast({
                description: "Your Product is added to the Cart.",
              });
            }}
            className="bg-teal-500 text-white px-6 py-2 rounded-lg flex items-center hover:bg-red-700 transition-colors"
          >
            <BsCartDash className="mr-2" />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
