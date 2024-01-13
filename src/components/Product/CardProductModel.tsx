import {
  Card,
  CardContent, CardHeader
} from "@/components/ui/card";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

type CardProductModelTypes = {
  product: any;
};

const CardProductModel = ({ product }: CardProductModelTypes) => {

  return (
    <Card className="w-full bg-mainBg mb-1 rounded-sm shadow-transparent outline-none hover:outline-2 hover:outline-gray-400">
      <CardHeader className="p-0 block">
        <section className="relative">
          <div className="w-full">
            <AspectRatio ratio={8 / 8}>
              <Link
                href={`/products/${product.category}/${product.uid}`}
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
            <div className="absolute top-1 right-1 bg-secNav px-1 rounded-full">
              <p className="text-xs text-buttonText md:text-sm">
                Sale -{product.discount_percentage}%
              </p>
            </div>
          )}
        </section>
      </CardHeader>
      <CardContent className="p-2 pb-0 flex flex-col gap-2">
        <Link href={`/products/${product.category}/${product.uid}`}>
          <h6 className="line-clamp-2 text-[12px] text-center hover:underline md:text-base tracking-wider">
            {product.title}
          </h6>
        </Link>
        {product.discount_percentage > 0 ? (
          <div className="flex flex-col gap-2">
            <p className="text-center text-xs md:text-sm">
              <span className="bg-secNav text-buttonText px-1 py-0.5">
                Save TK.{" "}
                {Math.round(
                  product.price -
                    product.price * (1 - product.discount_percentage / 100)
                )}
              </span>
            </p>
            <div className="flex gap-2 items-center justify-center">
              <span className="text-red-400 text-sm font-medium line-through">
                {Math.round(
                  product.price * (1 - product.discount_percentage / 100)
                )}
                ৳
              </span>
              <span className="font-medium">{product.price}৳</span>
            </div>
          </div>
        ) : (
          <span>{product.price}</span>
        )}
      </CardContent>
      <button className="bg-secNav text-buttonText flex w-full py-1 md:py-2 justify-center space-x-1 md:space-x-2">
        <p>Add to cart</p> <ShoppingBag size={22} />
      </button>
    </Card>
  );
};
export default CardProductModel;
