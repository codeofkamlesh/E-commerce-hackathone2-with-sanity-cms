import { client } from "@/sanity/lib/client"; // Import the Sanity client to fetch data
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image"; // Import the Sanity image helper for generating image URLs

export default async function FeaturedProducts() {
  // GROQ Query to fetch the Featured Products section data
  const query = `*[_type == "HomeSection1"][0] {
    Title_HomeSection1,
    products[] {
      productDescription,
      oldPrice,
      newPrice,
      image,
      badge
    }
  }`;

  const data = await client.fetch(query); // Fetch data from Sanity

  return (
    <div className="flex flex-col items-center px-10">
      {/* Heading Section */}
      <div className="flex justify-between w-full px-12 items-center">
        <div className="text-2xl font-semibold capitalize">
          {data?.Title_HomeSection1 || "Featured Products"}
        </div>
      </div>

      {/* Products Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-32">
        {data?.products?.map((product: any, index: number) => (
          <div
            key={index}
            className="relative w-full h-auto bg-white rounded-lg shadow-lg p-4"
          >
            {/* Image Section */}
            <Image
              className="rounded-md"
              width={312}
              height={312}
              alt={`Product Image ${index + 1}`}
              src={product.image ? urlFor(product.image).url() : "/default-image.png"} // Use image URL from Sanity or fallback
            />
            <div className="flex flex-col mt-4 cursor-pointer">
              <div className="text-lg font-medium capitalize text-[#557580]">
                {product.productDescription || "No Description"}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="text-xl font-bold text-gray-800">
                  ${product.newPrice || "0"}
                </div>
                {product.oldPrice && (
                  <div className="text-sm line-through text-gray-400">
                    ${product.oldPrice}
                  </div>
                )}
              </div>
            </div>
            <button
              className={`absolute bottom-4 right-4 flex items-center justify-center w-10 h-10
                ${index === 0 ? "bg-[#029fae] text-white" : "bg-gray-300 text-black"}
                rounded-sm shadow-md`}
              aria-label="Add to Cart"
            >
              <Image width={24} height={24} alt="Add to Cart" src="/addCart.png" />
            </button>

            {/* Show badge */}
            {product.badge && (
              <div
                className={`absolute top-6 left-6 px-3 py-1 text-white rounded-md text-sm
                ${product.badge === "New" ? "bg-green-500" : "bg-[#f5813f]"}`}
              >
                {product.badge}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
