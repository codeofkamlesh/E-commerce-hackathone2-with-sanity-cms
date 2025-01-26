import { client } from "@/sanity/lib/client"; // Import the Sanity client to fetch data
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image"; // Import the Sanity image helper for generating image URLs

// Define the TypeScript interface for a category
interface Category {
  title: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  products: number;
}

export default async function FeaturedCategories() {
  // GROQ Query to fetch the Categories data
  const query = `*[_type == "categories"] {
    title,
    image,
    products
  }`;

  let data: Category[] | null = null;

  try {
    data = await client.fetch(query); // Fetch data from Sanity
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // Use slice to get specific categories (e.g., products 5 to 8)
  const selectedCategories = data?.slice(0, 4); // Adjust the indices as per your requirements

  return (
    <div className="flex flex-col items-center px-10">
      {/* Heading Section */}
      <div className="flex justify-between w-full px-12 items-center">
        <div className="text-2xl font-semibold capitalize">
          Featured Categories
        </div>
      </div>

      {/* Categories Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-32">
        {selectedCategories?.map((category, index) => (
          <div
            key={index}
            className="relative w-full h-auto bg-white rounded-lg shadow-lg p-4"
          >
            {/* Image Section */}
            <div className="w-full h-[312px] overflow-hidden rounded-md">
              <Image
                className="w-full h-full object-cover"
                width={312}
                height={312}
                alt={`Category Image ${index + 1}`}
                src={
                  category.image
                    ? urlFor(category.image).url()
                    : "/default-image.png"
                } // Use image URL from Sanity or fallback
              />
            </div>
            <div className="flex flex-col mt-4">
              <div className="text-lg font-medium capitalize text-[#557580]">
                {category.title || "No Title"}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Available Quantity: {category.products || 0}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
