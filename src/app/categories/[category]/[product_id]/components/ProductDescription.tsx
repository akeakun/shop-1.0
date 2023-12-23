"use client";
import { useState } from "react";
import AddToCart from "./AddToCart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type ProductDescriptionTypes = {
  product: any;
};

const ProductDescription = ({ product }: ProductDescriptionTypes) => {
  const [currentSize, setCurrentSize] = useState(product.stock[0]);
  const setSize = (x: { name: string; stock: number }) => {
    setCurrentSize((prevState: any) => {
      return x;
    });
  };
  return (
    <section className="p-4">
      {/* product details */}
      <div>
        <h3 className="font-semibold text-lg py-1">Awesome T-shirt for men above the age of 18</h3>
        <p><span className="text-red-500">1700</span>৳</p>
        <p className="py-2 text-sm">
          SKU:&nbsp;<span className="font-semibold">#{product.sku}</span>
        </p>
      </div>
      <div className="flex gap-2 my-2">
        <div className="badge badge-neutral">Stock status:</div>
        {/* <div className="badge badge-secondary badge-outline">
                out of stock
            </div> */}
        <div className="badge  badge-outline">in stock</div>
      </div>
      <div className="flex items-center py-2 my-2">
        <p>Size:</p>
        {product.stock.map((item: any, index: any) => (
          <div
            key={index}
            className={`mx-2 px-2 rounded-sm border border-gray-800 cursor-pointer ${
              item.name === currentSize.name && "bg-secNav text-buttonText"
            }`}
            onClick={() => {
              setSize(item);
            }}
          >
            <p className="text-lg">{item.name}</p>
          </div>
        ))}
      </div>
      <AddToCart product={product} size={currentSize} />
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-medium">
            Description
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <Separator className="bg-black" />
        <Link
          href={"#reviews"}
          className="h-14 flex items-center justify-between hover:underline font-medium"
        >
          <p>Reviews</p>
          <ChevronRight size={18} />
        </Link>
        <Separator className="bg-black" />

        <AccordionItem value="item-2">
          <AccordionTrigger className="font-medium">
            Size Chart
          </AccordionTrigger>
          <AccordionContent>
          <AspectRatio ratio={8 / 8}>
          <Image width={200} height={200} src="/assets/Size_Charts.jpg" alt="Image" className="rounded-md object-cover w-full" />
        </AspectRatio>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="w-full h-auto">
        
      </div>
    </section>
  );
};
export default ProductDescription;
