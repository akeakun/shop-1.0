import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";

type CardProductModelTypes = {
  product: any;
};

const CardProductModel = ({ product }: CardProductModelTypes) => {
  return (
    <Card className="w-full bg-cardBg rounded-md ">
      <CardHeader className="p-0 block">
        <section className="relative">
          <div className="w-full">
            <AspectRatio ratio={8 / 8}>
              <Image
                src={`/products/${product.main_display_image}`}
                fill
                alt="Image"
                className="rounded-md object-cover"
              />
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
      <CardContent className="p-2 pb-0">
        <Link href={`/categories/${product.category}/${product.uid}`}>
          <p className="line-clamp-2 text-sm md:text-base tracking-wider">
            {product.title}
          </p>
        </Link>
        <p className=" text-red-400 text-md">{1700}৳</p>
      </CardContent>
      <CardFooter className="px-2 pb-1 flex flex-col">
        <p className="text-xs md:text-sm py-1">Sizes available:</p>
        <div className="flex space-x-1">
          {product.stock.map((item: any, index: any) => (
            <>
              <p className="text-sm md:text-base md:p-1 px-0.5 border border-gray-400 border-dashed">
                {item.name}
              </p>
            </>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};
export default CardProductModel;
