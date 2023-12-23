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
    <Card className="w-full bg-mainBg rounded-sm shadow-transparent border-none">
      <CardHeader className="p-0 block">
        <section className="relative">
          <div className="w-full">
            <AspectRatio ratio={8 / 8}>
              <Link href={`/categories/${product.category}/${product.uid}`} className="block h-full w-full">
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
      <CardContent className="p-2 pb-0">
        <Link href={`/categories/${product.category}/${product.uid}`}>
          <p className="line-clamp-2 text-xs text-center hover:underline md:text-base tracking-wider">
            {product.title}
          </p>
        </Link>
        <p className=" text-md p-2 pt-0 font-light text-center">TK {1700}</p>
      </CardContent>

    </Card>
  );
};
export default CardProductModel;
