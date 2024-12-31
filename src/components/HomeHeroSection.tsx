import type { NextPage } from "next";
import Image from "next/image";
import { client } from "@/sanity/lib/client";


export default async function Home() {
  // GROQ Query to fetch data
  const query = `*[_type == "herosec"][0] {
    welcomeText,
    mainTitle,
    "imageUrl": image.asset->url
  }`;

  const sanityData = await client.fetch(query);

  return (
    <div className="w-full min-h-screen relative text-center overflow-hidden bg-[#f0f2f3] rounded-b-[24px] md:rounded-b-[48px] px-4 py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
          <div className="text-[#f05c52] text-sm md:text-base tracking-[0.12em] uppercase mb-2 md:mb-4 mx-auto lg:mx-0">
          {sanityData?.welcomeText || "no text found"}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#272343] font-bold capitalize leading-tight mb-4 md:mb-6">
            <span className="block">{sanityData?.mainTitle || "No Title Found"}</span>
          </h1>
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#029fae] text-white text-base md:text-lg font-semibold transition-colors hover:bg-[#027e8b] mx-auto lg:mx-0">
            <span>Shop Now</span>
            <Image
              className="w-5 h-5 md:w-6 md:h-6"
              width={24}
              height={24}
              alt=""
              src="/Rightarrow.png"
            />
          </button>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        {sanityData?.imageUrl && (
          <Image
            className="w-3/4 md:w-2/3 lg:w-full max-w-md xl:max-w-lg object-cover"
            src={sanityData.imageUrl}
            width={434}
            height={584}
            alt="Hero Chair Image"
          />
        )}
        </div>
      </div>
    </div>
  );
};


