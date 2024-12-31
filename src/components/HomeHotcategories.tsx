import { client } from "@/sanity/lib/client"; // Import Sanity client
import Image from "next/image";

export default async function ProductCategories() {
  // GROQ Query to fetch data from Sanity
  const query = `*[_type == "HomeSection3"][0] {
    Title_HomeSection3,
    images[] {
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

  const data = await client.fetch(query); // Fetch data from Sanity

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold mb-12 text-black">
          {data?.Title_HomeSection3 || "Product Categories"}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured Product */}
          {data?.images?.length > 0 && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg group">
              <Image
                src={data.images[0].asset.url || "/placeholder.png"} // Use the first image as featured
                alt="Featured Product"
                width={data.images[0].asset.metadata.dimensions.width}
                height={data.images[0].asset.metadata.dimensions.height}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
            </div>
          )}

          {/* Grid of smaller products */}
          <div className="grid grid-cols-2 gap-6">
            {data?.images?.slice(1).map(
              (
                image: {
                  asset: {
                    _id: string;
                    url: string;
                    metadata: {
                      dimensions: { width: number; height: number };
                    };
                  };
                },
                index: number
              ) => (
                <div
                  key={image.asset._id}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg group"
                >
                  <Image
                    src={image.asset.url || "/placeholder.png"} // Use a placeholder image if missing
                    alt={`Product Image ${index + 2}`}
                    width={image.asset.metadata.dimensions.width}
                    height={image.asset.metadata.dimensions.height}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}