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
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import BlocksRendererComp from "./utils/BlocksRenderer";
import { BlocksContent } from "@strapi/blocks-react-renderer";
// interface DescriptionText {
//   type: "paragraph" | "list";
//   children: DescriptionTextItem[];
// }

// interface DescriptionTextItem {
//   type: "text" | "list-item";
//   text: string;
//   format?: "unordered" | "ordered";
//   bold?: boolean;
//   italic?: boolean;
//   underline?: boolean;
//   strikethrough?: boolean;
// }

interface ProductAttributes {
  createdAt: string; // timestamp format
  description: BlocksContent;
  name: string;
  sku: string;
  price: number;
  uid: string;
  discount: number;
  dp: {
    data: {
      id: number;
      attributes: {
        url: string;
        width: number;
        height: number;
        formats: {
          thumbnail: ImageFormat;
          small: ImageFormat;
        };
      };
    };
  };
  images: {
    data: {
      id: number;
      attributes: {
        url: string;
        width: number;
        height: number;
        formats: {
          thumbnail: ImageFormat;
          small: ImageFormat;
        };
      };
    }[];
  };
  category: {
    data: {
      id: number;
      attributes: {
        name: string;
        link: string;
      };
    };
  };
  tags: {
    data: {
      id: number;
      attributes: {
        name: string;
        link: string;
      };
    }[];
  };
  sfs: {
    id: number;
    __component: string;
    size: string;
    stock: number;
  }[];
}

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  url: string;
}

interface ProductData {
  id: number;
  attributes: ProductAttributes;
}

interface ProductDescriptionProps {
  product: ProductData;
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
  const [currentSize, setCurrentSize] = useState(product.attributes.sfs[0]);
  const setSize = (x: any) => {
    setCurrentSize((prevState: any) => {
      return x;
    });
  };
  const options = {
    replace(domNode: any) {
      if (domNode.name === "ul") {
        return (
          <ul
            style={{
              listStyleType: "disc",
              marginLeft: "20px",
            }}
          >
            {domNode.children[0].data}
          </ul>
        );
      }
    },
  };

  return (
    <section className="p-4 md:w-2/6">
      {/* product details */}
      <div>
        <h3 className="font-semibold text-lg py-1">
          {product.attributes.name}
        </h3>
        {product.attributes.discount > 0 ? (
          <div className=" space-x-2 py-1">
            <span className="text-red-400 text-sm font-medium line-through">
              <span className="font-medium">{product.attributes.price}৳</span>
            </span>
            <span>
              {Math.round(
                product.attributes.price *
                  (1 - product.attributes.discount / 100)
              )}
              ৳
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <span className="font-medium">
              {product.attributes.price}৳
            </span>
          </div>
        )}
        <p className="py-2 text-sm">
          SKU:&nbsp;
          <span className="font-semibold">#{product.attributes.sku}</span>
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
        {product.attributes.sfs.map((item, index) => (
          <div
            key={index}
            className={` min-w-8 mx-2 px-2 rounded-sm border border-gray-800 cursor-pointer ${
              item.size === currentSize.size
                ? "bg-secNav text-buttonText"
                : "bg-gray-300"
            }`}
            onClick={() => {
              setSize(item);
            }}
          >
            <p className="text-lg text-center uppercase">{item.size}</p>
          </div>
        ))}
      </div>
      <AddToCart
        dp={product.attributes.dp.data.attributes.url}
        id={product.attributes.uid}
        name={product.attributes.name}
        price={product.attributes.price}
        discount={product.attributes.discount}
        size={currentSize}
      />
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-medium">
            Description
          </AccordionTrigger>
          <AccordionContent>
            <BlocksRendererComp content={product.attributes.description} />
          </AccordionContent>
        </AccordionItem>
        {/* <Separator className="bg-black" />
        <Link
          href={"#reviews"}
          className="h-14 flex items-center justify-between hover:underline font-medium"
        >
          <p>Reviews</p>
          <ChevronRight size={18} />
        </Link> */}
        <Separator className="bg-black" />

        <AccordionItem value="item-2">
          <AccordionTrigger className="font-medium">
            Size Chart
          </AccordionTrigger>
          <AccordionContent>
            <AspectRatio ratio={8 / 8}>
              <Image
                width={200}
                height={200}
                src="/assets/Size_Charts.jpg"
                alt="Image"
                className="rounded-md object-cover w-full"
              />
            </AspectRatio>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="w-full h-auto"></div>
    </section>
  );
};
export default ProductDescription;
