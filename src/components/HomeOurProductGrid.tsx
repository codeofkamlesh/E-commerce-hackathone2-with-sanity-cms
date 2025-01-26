"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

// Define the Product interface
interface Product {
  _id: string;
  description: string;
  price: number;
  priceWithoutDiscount?: number;
  imageUrl: string;
  badge?: string;
  inventory: number;
  tags: string[];
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sectionTitle, setSectionTitle] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await client.fetch(
        `*[_type == "products"]{
          title,
          price,
          priceWithoutDiscount,
          badge,
          "imageUrl": image.asset->url,
          description,
          inventory,
          tags
        }`
      );

      setSectionTitle(data.title || "Our Products");
      // Apply the slice method here
      setProducts(data?.slice(0, 8) || []); // Show only the first 8 products
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId: string) => {
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-left mb-12 text-black">
          {sectionTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative aspect-square overflow-hidden">
                {/* Update Image Component */}
                <Image
                  src={product.imageUrl}
                  alt={product.description}
                  width={400}  // Set a fixed width
                  height={400} // Set a fixed height to ensure equal size
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {product.badge && (
                  <Badge
                    variant={
                      product.badge === "New" ? "default" : "destructive"
                    }
                    className="absolute top-4 left-4 px-3 py-1 text-sm font-semibold"
                  >
                    {product.badge}
                  </Badge>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-black font-bold text-lg mb-2">
                  {product.description}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-black font-bold text-xl">
                      ${product.price}
                    </span>
                    {product.priceWithoutDiscount && (
                      <span className="text-gray-400 line-through">
                        ${product.priceWithoutDiscount}
                      </span>
                    )}
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleAddToCart(product._id)}
                    className="bg-transparent hover:bg-blue-500 text-black px-4 py-2 rounded transition-all"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Add to cart</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
