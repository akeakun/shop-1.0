"use client";
import { ChevronDown, ChevronUp, Tags } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
interface ItemAttributes {
  TagsName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Link: string;
}

interface Item {
  id: number;
  attributes: ItemAttributes;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface Meta {
  pagination: Pagination;
}

interface ApiResponse {
  data: Item[];
  meta: Meta;
}

type TagsTypes = {
  tags: ApiResponse;
};
const TagsComp = ({tags}: TagsTypes) => {
  const [tagsOpen, setTagsOpen] = useState(false);
  return (
    <li className="">
      <button
        className="items-center rounded-lg mb-2 pr-4 flex justify-between h-10 hover:bg-gray-300 w-full"
        onClick={() => setTagsOpen(!tagsOpen)}
      >
        <div className="space-x-4 px-4 flex">
          <Tags />
          <p>Tags</p>
        </div>
        {tagsOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      <div className={`pl-10 overflow-hidden ${tagsOpen ? " h-fit" : "h-0"}`}>
        {tags.data.map((item, index) => (
          <Link
            href={`/products/tags/${item.attributes.Link}`}
            key={index}
            className=" cursor-pointer items-center rounded-lg flex p-4 h-10 hover:bg-gray-300 w-full"
          >
            {item.attributes.TagsName}
          </Link>
        ))}
      </div>
    </li>
  );
};
export default TagsComp;
