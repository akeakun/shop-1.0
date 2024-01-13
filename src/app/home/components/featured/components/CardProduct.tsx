"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
type CardProductTypes = {
  product: any;
};
const CardProduct = ({ product }: CardProductTypes) => {
  return (
    <Card className="w-full bg-mainBg mb-1 rounded-sm shadow-transparent outline-none hover:outline-2 hover:outline-gray-400 relative">
      <CardHeader className="p-0 block">
        <section className="relative">
          <div className="w-full">
            <AspectRatio ratio={8 / 8}>
              <Link
                href={`/products/${product.uid}`}
                className="block h-full w-full"
              >
                <Image
                  src={`/products/${product.main_display_image}`}
                  fill
                  alt="Image"
                  className="rounded-md object-cover"
                />
              </Link>
            </AspectRatio>
          </div>
          {product.discount_percentage > 0 && (
            <div className="absolute top-1 left-1 bg-secNav px-1 rounded-full">
              <p className="text-xs text-buttonText md:text-sm">
                Sale -{product.discount_percentage}%
              </p>
            </div>
          )}
        </section>
      </CardHeader>
      <CardContent className="p-0 w-full h-fit flex justify-center absolute bottom-0 right-0 transform">
        {/* <Link href={`/products/${product.category}/${product.uid}`}>
          <h6 className="line-clamp-2 text-[12px] text-center hover:underline md:text-base tracking-wider">
            {product.title}
          </h6>
        </Link> */}
        {product.discount_percentage > 0 ? (
          //   <div className="flex flex-col gap-2">
          //     <p className="text-center text-xs md:text-sm">
          //       <span className="bg-secNav text-buttonText px-1 py-0.5">
          //         Save TK.{" "}
          //         {Math.round(
          //           product.price -
          //             product.price * (1 - product.discount_percentage / 100)
          //         )}
          //       </span>
          //     </p>
          <div className="w-fit h-fit space-x-2 bg-white rounded-tl-sm rounded-tr-sm px-1">
            <span className="text-red-400 text-xs md:text-sm font-medium line-through">
              {Math.round(
                product.price * (1 - product.discount_percentage / 100)
              )}
              ৳
            </span>
            <span className="font-medium text-xs md:text-sm">{product.price}৳</span>
          </div>
        ) : (
          //   </div>
          <span>{product.price}</span>
        )}
      </CardContent>
    </Card>
  );
};
export default CardProduct;
