"use client";
import { clothingCategories } from "@/lib/demodata";
import { Boxes, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Categories = () => {
  const categories = clothingCategories;

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  return (
    <li className="">
      <button
        className="items-center rounded-lg mb-2 pr-4 flex justify-between h-10 hover:bg-gray-300 w-full"
        onClick={() => setCategoriesOpen(!categoriesOpen)}
      >
        <div className="space-x-4 px-4 flex">
          <Boxes />
          <p>Categories</p>
        </div>
        {categoriesOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      <div
        className={`pl-10 overflow-hidden ${categoriesOpen ? " h-fit" : "h-0"}`}
      >
        {categories.map((item, index) => (
          <Link
            href={`/categories/${item}`}
            key={index}
            className=" cursor-pointer items-center rounded-lg flex p-4 h-10 hover:bg-gray-300 w-full"
          >
            {item}
          </Link>
        ))}
      </div>
    </li>
  );
};
export default Categories;
