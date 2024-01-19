"use client";
import { Boxes, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type ItemAttributes = {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  link: string;
};

type Item = {
  id: number;
  attributes: ItemAttributes;
};

type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

type Meta = {
  pagination: Pagination;
};

type ApiResponse = {
  data: Item[];
  meta: Meta;
};

type CategoriesTypes = {
  categories: ApiResponse;
};

const Categories = ({ categories }: CategoriesTypes) => {
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
        {categories.data.map((item, index) => (
          <Link
            href={`/products?category=${item.attributes.link}`}
            key={index}
            className="cursor-pointer items-center rounded-lg flex p-2 h-10 hover:bg-gray-300 w-full"
          >
            {item.attributes.name}
          </Link>
        ))}
      </div>
    </li>
  );
};
export default Categories;
