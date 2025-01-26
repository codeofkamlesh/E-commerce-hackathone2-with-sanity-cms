"use client";

import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { LuCircleAlert } from "react-icons/lu";
import * as React from "react";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSearch = () => {
    if (selectedCategory) {
      // Redirect to the product page with the selected category
      window.location.href = `/Productmenu?category=${selectedCategory}`;
    } else {
      // Show an alert if no category is selected
      alert("Please select a category!");
    }
  };

  return (
    <nav className="relative bg-white w-full h-auto flex flex-col items-start text-left text-xs text-white font-inter overflow-x-hidden">
      {/* Top Header */}
      <div className="w-full bg-[#3b3466] flex items-center justify-between p-2 md:p-[14px_10%] box-border">
        <div className="flex items-center justify-between w-full flex-wrap">
          <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-start mb-2 md:mb-0">
            <Image
              className="w-[16px] h-[16px] overflow-hidden flex-shrink-0"
              width={16}
              height={16}
              alt=""
              src="/check1.png"
            />
            <div className="relative leading-[110%] capitalize text-center md:text-left">
              Free shipping on all orders over $50
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6 text-center justify-center w-full md:w-auto">
            <div className="flex items-center gap-1">
              <div className="relative leading-[130%]">Eng</div>
              <Image
                className="w-[7px] h-[3.5px]"
                width={7}
                height={4}
                alt="Language dropdown"
                src="/Group.png"
              />
            </div>
            <div className="relative leading-[130%]">
              <Link href="/FAQ">FAQs</Link>
            </div>
            <div className="flex items-start gap-1">
              <LuCircleAlert className="w-[16px] h-[16px]" />
              <div className="relative leading-[130%]">Need Help</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="w-full bg-[#f0f2f3] flex items-center justify-between p-4 md:p-[20px_10%] box-border text-2xl text-[#272343]">
        <div className="flex items-center gap-2 bg-cover">
          <Image
            className="w-[40px] h-[40px] overflow-hidden flex-shrink-0"
            width={40}
            height={40}
            alt=""
            src="/Logo Icon.jpg"
          />
          <div className="relative leading-[120%] font-medium">
            <Link href="/">Comforty</Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-2">
          <Select onValueChange={(value) => setSelectedCategory(value)}>
            <SelectTrigger className="w-[200px] bg-white hover:bg-[#3b3466] hover:!text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="!w-[300px] !text-white bg-[#3b3466] hover:!text-white">
                  Select Category
                </SelectLabel>
                <SelectItem value="All" className="hover:!bg-teal-600 hover:!text-white">
                  All
                </SelectItem>
                <SelectItem
                  value="lounge Chair"
                  className="hover:!bg-teal-600 hover:!text-white"
                >
                  Lounge and Relaxation Chairs
                </SelectItem>
                <SelectItem
                  value="Dining Chair"
                  className="hover:!bg-teal-600 hover:!text-white"
                >
                  Dining Chairs
                </SelectItem>
                <SelectItem
                  value="office Chair"
                  className="hover:!bg-teal-600 hover:!text-white"
                >
                  Office Chairs
                </SelectItem>
                <SelectItem
                  value="outdoor Chair"
                  className="hover:!bg-teal-600 hover:!text-white"
                >
                  Outdoor Chairs
                </SelectItem>
                <SelectItem
                  value="kids Chair"
                  className="hover:!bg-teal-600 hover:!text-white"
                >
                  Kids Chairs
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            onClick={handleSearch}
            className="bg-teal-600 hover:bg-[#ce4649] hover:text-white"
          >
            Search
          </Button>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="bg-white rounded-xl p-[11px_16px] flex items-center gap-3 text-black">
            <Link href="/Cart">
              <FaCartShopping className="w-6 h-6" />
            </Link>
            <div className="relative leading-[130%] hidden md:block">
              <Link href="/Cart">Cart</Link>
            </div>
            <div className="relative w-[20px] h-[20px] text-xs font-dm-sans text-white">
              <div className="absolute top-0 left-0 rounded-full bg-[#007580] w-[20px] h-[20px]" />
              <div className="absolute top-[5px] left-[7px] leading-[100%] capitalize font-medium">
                <Link href="/Cart">2</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="w-full shadow-[0_1px_0px_#e1e3e5] bg-white h-auto md:h-[74px] flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-[14px_10%] box-border text-xs text-[#636270]">
        <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#272343] md:hidden"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <div
          className={`flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full md:w-auto ${
            isMenuOpen ? "block" : "hidden md:flex"
          }`}
        >
          <div className="relative leading-[110%] hover:text-[#ce4649] hover:underline capitalize font-semibold text-[15px]">
            <Link href="/">Home</Link>
          </div>
          <div className="relative leading-[110%] hover:text-[#ce4649] hover:underline capitalize font-semibold text-[15px]">
            <Link href="/Productmenu">Products</Link>
          </div>
          <div className="relative leading-[110%] hover:text-[#ce4649] hover:underline capitalize font-semibold text-[15px]">
            <Link href="/Singlepageproduct">Pages</Link>
          </div>
          <div className="relative leading-[110%] hover:text-[#ce4649] hover:underline capitalize font-semibold text-[15px]">
            <Link href="/About">About</Link>
          </div>

        </div>
        <div className="hidden md:flex items-start gap-2">
        <Link href="/ContactUs">
          <Button className="bg-teal-600 hover:bg-[#ce4649] hover:text-white">
            Contact Us
          </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
