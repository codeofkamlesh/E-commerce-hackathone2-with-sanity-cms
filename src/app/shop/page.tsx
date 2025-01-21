"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa6";
import { client, urlFor } from "../../sanity/lib/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Define the structure of the image object
interface ImageType {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

// Define the structure of a chair item
interface ChairItem {
  title: string;
  price: number;
  image: ImageType;
}

const Shop = () => {
  const [carouselImages, setCarouselImages] = useState<ImageType[]>([]);
  const [stoolChairs, setStoolChairs] = useState<ChairItem[]>([]);
  const [comfortChairs, setComfortChairs] = useState<ChairItem[]>([]);
  const [sofaCollection, setSofaCollection] = useState<ChairItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch carousel images
      const carouselData = await client.fetch(`*[_type == "carousel"]{images}`);
      setCarouselImages(carouselData[0]?.images || []);

      // Fetch chairs data
      const chairsData = await client.fetch(
        `*[_type == "chairsCollection"]{type, items}`
      );

      // Filter data by type
      setStoolChairs(
        chairsData.find((item: { type: string; items: ChairItem[] }) => item.type === "stoolChairs")?.items || []
      );
      setComfortChairs(
        chairsData.find((item: { type: string; items: ChairItem[] }) => item.type === "comfortChairs")?.items || []
      );
      setSofaCollection(
        chairsData.find((item: { type: string; items: ChairItem[] }) => item.type === "sofaCollection")?.items || []
      );
    };

    fetchData();
  }, []);

  return (
    <div className="w-full px-4 py-8 bg-gray-100">
      {/* Header Section */}
      <h1 className="text-3xl md:text-5xl 2xl:text-6xl font-bold text-center mb-6 bg-orange-500 py-3">
        Chairs Collection Shop
      </h1>
      <h2 className="text-xl md:text-2xl 2xl:text-3xl font-semibold text-center text-gray-600 mb-4 underline">
        Office Chairs
      </h2>

      {/* Carousel Section */}
      <div className="relative">
        <Carousel className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-full mx-auto">
          <CarouselContent className="flex gap-4">
            {carouselImages.map((image, index) => (
              <CarouselItem key={index} className="flex justify-center">
                <Image
                  src={urlFor(image).url()}
                  alt={`Office Chair ${index + 1}`}
                  width={300}
                  height={300}
                  className="rounded-lg shadow-md"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white rounded-full p-2">
            &lt;
          </CarouselPrevious>
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white rounded-full p-2">
            &gt;
          </CarouselNext>
        </Carousel>
      </div>

      {/* Section: Stool Chairs */}
      <Section title="Stool Chairs" items={stoolChairs} />

      {/* Section: Comfort Chairs */}
      <Section title="Comfort Chairs" items={comfortChairs} />

      {/* Section: Sofa Collection */}
      <Section title="Sofa Collection" items={sofaCollection} />
    </div>
  );
};

// Component to render each chair section
const Section = ({ title, items }: { title: string; items: ChairItem[] }) => (
  <div className="flex flex-col mt-10 bg-white pb-10">
    <h2 className="text-xl md:text-2xl 2xl:text-3xl font-semibold text-center text-black mb-4 underline py-5">
      {title}
    </h2>
    <div className="flex flex-wrap justify-center gap-6 xl:gap-8 2xl:gap-10">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <Image
            src={urlFor(item.image).url()}
            alt={item.title}
            width={200}
            height={200}
            className="rounded-lg shadow-md"
          />
          <div className="flex justify-between w-full pt-2">
            <h4 className="font-bold text-lg">${item.price}</h4>
            <FaCartPlus className="text-2xl cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Shop;
