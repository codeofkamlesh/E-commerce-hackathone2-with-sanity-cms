"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

// Define the types according to your schema
interface InstagramImage {
  asset: {
    url: string;
  };
}

interface NewsletterAndInstagramContent {
  instagramImages: InstagramImage[];
  newsletterHeading: string;
  newsletterPlaceholder: string;
  submitButtonText: string;
}

export default function NewsletterInstagram() {
  const [content, setContent] = useState<NewsletterAndInstagramContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      // Sanity query to fetch data, including image URLs
      const sanityData = await client.fetch(
        `*[_type == "ProductSec2"][0] {
          instagramImages[] {
            asset->{url}
          },
          newsletterHeading,
          newsletterPlaceholder,
          submitButtonText
        }`
      );


      // Sanity might return undefined or null, so ensure the data is structured properly
      if (sanityData) {
        setContent(sanityData);
      }
    };

    fetchContent();
  }, []);

  // Loading state
  if (!content) return <div>Loading...</div>;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black">{content.newsletterHeading}</h2>
          <div className="flex justify-center mt-4">
            <input
              className="border-b-2 outline-none w-1/3 p-2"
              placeholder={content.newsletterPlaceholder}
            />
            <button className="ml-4 px-4 py-2 bg-black text-white rounded-md transition-all hover:bg-gray-800">
              {content.submitButtonText}
            </button>
          </div>
        </div>

        {/* Instagram Images Section */}
        <div className="text-center text-xl font-semibold mt-12">
          Follow Products and Discounts on Instagram
        </div>
        <div className="flex justify-center gap-4 mt-4">
          {/* Ensure `instagramImages` is not empty */}
          {content.instagramImages && content.instagramImages.length > 0 ? (
            content.instagramImages.map((image, index) => (
              <img
                key={index}
                className="rounded-md w-24 h-24 object-cover"
                src={image.asset.url} // Ensure the URL is accessed correctly
                alt={`Instagram ${index + 1}`}
              />
            ))
          ) : (
            <div>No Instagram images available.</div>
          )}
        </div>
      </div>
    </section>
  );
}
