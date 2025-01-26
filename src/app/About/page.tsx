"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import { FaTruck } from "react-icons/fa";
// import { FaCheck } from "react-icons/fa";
// import { IoFileTrayOutline } from "react-icons/io5";
// import { BiSolidLeaf } from "react-icons/bi";
import { client } from "@/sanity/lib/client"; // Adjust the path as necessary

interface BrandFeature {
  icon: {
    asset: {
      url: string;
    };
  };
  title: string;
  description: string;
}

interface PopularProduct {
  image: {
    asset: {
      url: string;
    };
  };
  name: string;
  price: string;
}

interface AboutUs {
  aboutUsSection: {
    title: string;
    description: string;
    image: {
      asset: {
        url: string;
      };
    };
  };
  brandFeatures: BrandFeature[];
  popularProducts: PopularProduct[];
}

const About = () => {
  const [aboutUsData, setAboutUsData] = useState<AboutUs | null>(null);

  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "aboutUs"][0]{
            aboutUsSection {
              title,
              description,
              image {
                asset->{
                  url
                }
              }
            },
            brandFeatures[] {
              icon {
                asset->{
                  url
                }
              },
              title,
              description
            },
            popularProducts[] {
              image {
                asset->{
                  url
                },
              },
              name,
              price
            }
          }`
        );
        setAboutUsData(data);
      } catch (error) {
        console.error("Error fetching About Us data:", error);
      }
    };

    fetchAboutUsData();
  }, []);

  if (!aboutUsData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* About Us Section */}
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center bg-white mt-16 md:mt-32 px-4">
        <div className="w-full md:w-[650px] h-auto md:h-[478px] bg-[#007580] p-6 flex flex-col justify-start items-start text-left text-white">
          <h1 className="text-[24px] md:text-[32px] font-bold pl-4 md:pl-6 pt-8 md:pt-12">
            {aboutUsData.aboutUsSection.title}
          </h1>
          <p className="text-[16px] md:text-[18px] font-normal pt-4 pl-4 md:pl-6 pb-12 md:pb-40">
            {aboutUsData.aboutUsSection.description}
          </p>
          <div className="pl-4 md:pl-6">
            <button className="bg-[#2e6a6d] text-white px-6 md:px-8 py-3 md:py-4 text-[14px] md:text-[16px] font-normal">
              View collection
            </button>
          </div>
        </div>
        <div className="w-full md:w-[619px] h-auto md:h-[478px] mt-6 md:mt-0 md:ml-6 overflow-hidden">
          <Image
            src={aboutUsData.aboutUsSection.image.asset.url}
            alt="Comforty Image"
            width={619}
            height={478}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Brand Features Section */}
      <div className="max-w-screen-xl mx-auto mt-32 px-6">
        <h2 className="text-[32px] font-semibold text-center mb-12">
          What makes our Brand Different
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutUsData.brandFeatures.map((feature, index) => (
            <div key={index} className="bg-[#F9F9F9] p-6 text-center">
              <h3 className="text-[20px] font-normal text-[#007580] flex items-center justify-center pt-5">
                <Image
                  src={feature.icon.asset.url}
                  alt={feature.title}
                  width={40}
                  height={40}
                  className="mb-2"
                />
                {feature.title}
              </h3>
              <p className="text-[16px] font-normal text-[#007580] mt-4">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Products Section */}
      <div className="max-w-screen-xl mx-auto mt-32 px-6">
        <h2 className="text-[32px] font-semibold text-left mb-12">
          Our Popular Products
        </h2>
        <div className="flex flex-col sm:flex-row lg:flex-row justify-between gap-8  ">
          {aboutUsData.popularProducts.map((product, index) => (
            <div key={index} className="text-center">
              <Image
                src={product.image.asset.url}
                alt={product.name}
                width={590}
                height={375}
                className="object-cover mx-auto aspect-square overflow-hidden"
              />
              <div className="flex justify-between">
                <p className="pt-2 text-[20px] font-normal text-left ">
                  {product.name}
                </p>
                <p className="pt-2 text-[18px] font-normal mb-32 text-left ">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;
