"use client"
import { clothingTags } from "@/lib/demodata";
import { ChevronDown, ChevronUp, Tags } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
const TagsComp = () => {
  const [tagsOpen, setTagsOpen] = useState(false);
  const tags = clothingTags;
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
        {tags.map((item, index) => (
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
export default TagsComp;
