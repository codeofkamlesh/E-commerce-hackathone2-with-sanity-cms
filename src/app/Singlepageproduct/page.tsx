"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsCartDash } from "react-icons/bs";
import { client } from "@/sanity/lib/client"; // Adjust this path to your sanity client configuration
import { useToast } from "@/hooks/use-toast"; // Ensure correct import for the shadcn toaster
import Link from "next/link";

// Product Interface
interface Product {
  name: string;
  price: string;
  description: string;
  image: {
    asset: {
      url: string;
    };
  };
}

// Featured Product Interface
interface FeaturedProductItem {
  name: string;
  price: string;
  description: string; // Added description field
  image: {
    asset: {
      url: string;
    };
  };
  altText: string;
}

const ProductCarousel: React.FC = () => {
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null); // Currently displayed product
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProductItem[]>([]);
  const { toast } = useToast(); // Initialize the toast function here

  // Fetch product data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedData = await client.fetch(
          `*[_type == "Singleproductpage"][0]{
            featuredProduct {
              name,
              price,
              description,
              image {
                asset->{
                  url
                }
              }
            },
            featuredProducts[] {
              name,
              price,
              description, // Ensure description is fetched here
              image {
                asset->{
                  url
                }
              },
              altText
            }
          }`
        );

        setFeaturedProduct(fetchedData.featuredProduct); // Set the initial featured product
        setFeaturedProducts(fetchedData.featuredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle product click
  const handleProductClick = (product: FeaturedProductItem) => {
    setFeaturedProduct(product); // Set the clicked product as the featured product
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top of the page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Product Section */}
      {featuredProduct && (
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-16">
          <div className="w-full lg:w-1/2">
            <Image
              src={featuredProduct.image.asset.url}
              alt={featuredProduct.name}
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {featuredProduct.name}
            </h1>
            <div className="inline-block rounded-full text-sm text-white bg-teal-600 px-4 py-1">
              ${featuredProduct.price}.00 USD
            </div>
            {/* Display Product Description */}
            <p className="text-gray-600">A Very comfortable and economic product on a suitable price , available in different sizes and different colors , try once and suggest everyone .</p>
            <button
              onClick={() => {
                toast({
                  description: "Your Product is added to the Cart.",
                });
              }}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-teal-700 transition-colors"
            >
              <BsCartDash className="mr-2" />
              Add To Cart
            </button>
          </div>
        </div>
      )}

      {/* Featured Products Section */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 uppercase">
            Featured Products
          </h2>
          <Link href="/Productmenu">
          <button className="text-lg font-bold text-gray-900 border-b-2 border-gray-900 mr-[10px] hover:text-teal-600 hover:border-teal-600 transition-colors">
            View all
          </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {featuredProducts.map((product, index) => (
            <div
              key={index}
              className="flex flex-col cursor-pointer"
              onClick={() => handleProductClick(product)} // Handle product click
            >
              <div className="relative w-[250px] h-[250px] mb-2 overflow-hidden">
                <Image
                  className="rounded-md object-cover"
                  width={300}
                  height={300}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={product.altText || product.name}
                  src={product.image.asset.url}
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm capitalize">{product.name}</p>
                <b className="text-sm text-black">${product.price}</b>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
