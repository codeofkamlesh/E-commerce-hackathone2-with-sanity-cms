import { client } from "@/sanity/lib/client"; // Import Sanity client
import Image from "next/image";
import Link from "next/link";

// Define a type for the category
interface Category {
  title: string;
  image: {
    asset: {
      _id: string;
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
}

export default async function ProductCategories() {
  // GROQ Query to fetch data from the categories schema
  const query = `*[_type == "categories"] {
    title,
    image {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    }
  }`;

  const data: Category[] = await client.fetch(query); // Fetch data from Sanity

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold mb-12 text-black">
          Hot Categories
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured Category */}
          {data?.slice(0, 1).map((category) => (
            <div
              key={category.image.asset._id}
              className="relative aspect-[4/3] overflow-hidden rounded-lg group"
            >
               <Link href="/Productmenu">
              <Image
                src={category.image.asset.url || "/placeholder.png"} // Use the first image as featured
                alt={category.title || "Featured Category"}
                width={category.image.asset.metadata.dimensions.width}
                height={category.image.asset.metadata.dimensions.height}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
              </Link>
            </div>
          ))}

          {/* Grid of smaller categories */}
          <div className="grid grid-cols-2 gap-6">
            {data?.slice(1, 5).map((category, index) => (
              <div
                key={category.image.asset._id}
                className="relative aspect-[4/3] overflow-hidden rounded-lg group"
              >
                 <Link href="/Productmenu">
                <Image
                  src={category.image.asset.url || "/placeholder.png"} // Use a placeholder image if missing
                  alt={category.title || `Category Image ${index + 1}`}
                  width={category.image.asset.metadata.dimensions.width}
                  height={category.image.asset.metadata.dimensions.height}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
