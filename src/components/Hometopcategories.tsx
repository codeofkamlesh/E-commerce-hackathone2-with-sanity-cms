import { client } from "@/sanity/lib/client"; // Import the Sanity client
import Image from "next/image";
import Link from "next/link";

// Interface for Category data
interface Category {
  title: string;
  image?: { asset?: { url?: string } };
  products: number;
}

export default async function HomeSection2() {
  // GROQ Query to fetch all categories data
  const query = `*[_type == "categories"] {
    title,
    image {
      asset -> {
        url
      }
    },
    products
  }`;

  let categories: Category[] | null = null;

  try {
    categories = await client.fetch(query); // Fetch data from Sanity
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // Slice to get products 5 to 8
  const selectedCategories = categories?.slice(5, 8); // JavaScript arrays are 0-indexed

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-left mb-12 text-black">
          Top Categories
        </h2>

        {/* Categories Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCategories?.length ? (
            selectedCategories.map((category, index) => (
              <Link
                key={index}
                href="#"
                className="group relative overflow-hidden rounded-lg aspect-[4/3] transition-all duration-300 ease-in-out"
              >
                {/* Image Section */}
                <Image
                  src={category.image?.asset?.url || "/default-image.png"} // Fallback if image is not found
                  alt={category.title || "No title available"}
                  layout="fill"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Description Section */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                  <h3 className="text-xl font-semibold text-white">
                    {category.title || "No Title"}
                  </h3>
                  <p className="text-sm text-gray-200">
                    Available Quantity:{" "}
                    {category.products?.toLocaleString() || "N/A"}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p>No categories available</p>
          )}
        </div>
      </div>
    </section>
  );
}
