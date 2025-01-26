"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { urlFor } from "@/sanity/lib/image";
// import {Product} from "../app/types/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

// Define interfaces for Sanity data
export interface SanityImage {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

export interface Category {
  _id: string;
  title: string;
  image: SanityImage;
}

interface Product {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount?: number;
  badge?: string;
  imageUrl: string; // Using imageUrl here instead of the image object
  description: string;
  category: {
    _id: string;
    title: string;
  };
  inventory: number;
  tags: string[];
  slug: {
    _type: "slug";
    current: string;
  } | null;  // Added null type for slug
}

export default function ProductGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sectionTitle, setSectionTitle] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      // Fetch categories
      const categoryData: Category[] = await client.fetch(
        `*[_type == "categories"]{
          _id,
          title,
          image
        }`
      );

      // Fetch products based on the updated GROQ query
      const productData = await client.fetch(
        `*[_type == "products"]{
          title,
          price,
          priceWithoutDiscount,
          badge,
          "imageUrl": image.asset->url,
          description,
          inventory,
          tags,
          slug
        }`
      );

      setCategories(categoryData);
      setSectionTitle("Our Products");
      setProducts(productData || []);
    };

    fetchData();
  }, []);

  const handleAddToCart = (productId: string) => {
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <div>
      {/* Carousel Section */}
      <Carousel className="w-full max-w-4xl mx-auto mb-12 h-[500] border-y-8 border-black">
        <CarouselContent>
          {categories.map((category) => (
            <CarouselItem key={category._id}>
              <div className="relative h-[400px] w-full max-w-4xl flex justify-center items-center ">
                <Image
                  src={urlFor(category.image).url()} // Using urlFor for category image
                  alt={category.title}
                  width={600}
                  height={500}
                  className="object-cover w-full max-w-4xl border-black border-8 rounded-full"
                />
                <div className="absolute bottom-4 left-[70px] bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg">
                  {category.title}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Categories and Products Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-left mb-12 text-black">
            {sectionTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Products */}
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Conditionally render the Link based on availability of slug */}
                {product.slug?.current ? (
                  <Link href={`/product/${product.slug.current}`}>
                    <div className="relative aspect-square overflow-hidden">
                      {/* Update Image Component */}
                      <Image
                        src={product.imageUrl}
                        alt={product.description}
                        width={400} // Set a fixed width
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
                  </Link>
                ) : (
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.description}
                      width={400}
                      height={400}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                )}

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
                        onClick={() => {
                          // Show toast notification

                          toast({
                            description: "Your Product is added to the Cart.",
                          });
                          // Call the handleAddToCart function
                          handleAddToCart(product._id);
                        }}
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
    </div>
  );
}
