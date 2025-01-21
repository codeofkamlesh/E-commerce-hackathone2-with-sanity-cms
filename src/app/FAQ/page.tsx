"use client";

import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { client } from "../../sanity/lib/client";
import * as Icons from "react-icons/fa6"; // Import all icons dynamically
import { IconType } from "react-icons"; // Import IconType

interface FAQItem {
  question: string;
  answer: string;
  icon?: string; // Icon name as string
}

const Faqs = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [faqData, setFaqData] = useState<FAQItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(
        `*[_type == "faq"][0] {
          title,
          description,
          faqItems[] {
            question,
            answer,
            icon
          }
        }`
      );

      setTitle(data?.title || "FAQs");
      setDescription(data?.description || "Frequently asked questions.");
      setFaqData(data?.faqItems || []);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto mt-16 text-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-[48px] text-[#333333] font-bold mb-4">{title}</h1>
      <p className="text-[16px] font-normal mb-8 text-[#4F4F4F]">
        {description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 mb-24">
        {faqData.map((faq, index) => (
          <FAQCard key={index} faq={faq} />
        ))}
      </div>
    </div>
  );
};

const FAQCard = ({ faq }: { faq: FAQItem }) => (
  <div className="bg-[#F7F7F7] p-6 w-full h-auto max-w-full rounded-lg mb-6 text-left">
    <h3 className="text-[18px] pt-4 font-bold flex justify-between">
      {faq.question}
      {faq.icon ? <DynamicIcon icon={faq.icon} /> : <FaPlus />}
    </h3>
    <p className="mt-4 text-[16px] font-bold text-[#4F4F4F]">{faq.answer}</p>
  </div>
);

interface DynamicIconProps {
  icon: string;
}

const DynamicIcon = ({ icon }: DynamicIconProps) => {
  const IconComponent = Icons[icon as keyof typeof Icons] as IconType; // Use keyof to ensure type safety
  if (!IconComponent) {
    return <FaPlus />; // Default icon if not found
  }
  return <IconComponent />;
};

export default Faqs;
