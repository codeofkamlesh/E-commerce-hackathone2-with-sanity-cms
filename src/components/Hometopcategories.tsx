import { client } from "@/sanity/lib/client"; // Import the Sanity client
import Image from "next/image";
import Link from "next/link";

interface Product {
  productDescription: string;
  productQuantity: number;
  image?: { asset?: { url?: string } };
  href?: string;
}

interface SectionData {
  Title_HomeSection2: string;
  products: Product[];
}

export default async function HomeSection2() {
  // GROQ Query to fetch data based on the schema
  const query = `*[_type == "HomeSection2"][0] {
    Title_HomeSection2,
    products[] {
      productDescription,
      productQuantity,
      image {
        asset -> {
          url
        }
      },
      href
    }
  }`;

  let sectionData: SectionData | null = null;

  try {
    sectionData = await client.fetch(query); // Fetch data from Sanity
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-left mb-12 text-black">
          {sectionData?.Title_HomeSection2 || "No Title Found"}
        </h2>

        {/* Products Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectionData?.products?.length ? (
            sectionData.products.map((product, index) => (
              <Link
                key={index}
                href={product.href || "#"}
                className="group relative overflow-hidden rounded-lg aspect-[4/3] transition-all duration-300 ease-in-out"
              >
                {/* Image Section */}
                <Image
                  src={product.image?.asset?.url || "/default-image.png"} // Fallback if image is not found
                  alt={product.productDescription || "No description available"}
                  layout="fill"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Description Section */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                  <h3 className="text-xl font-semibold text-white">
                    {product.productDescription || "No Description"}
                  </h3>
                  <p className="text-sm text-gray-200">
                    Available Quantity:{" "}
                    {product.productQuantity?.toLocaleString() || "N/A"}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </section>
  );
}
