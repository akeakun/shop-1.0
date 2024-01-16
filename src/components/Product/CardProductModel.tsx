import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import { myImageLoader } from "@/lib/Hooks/client/ImageLoader";
import AddToBagDrawer from "./AddToBagModel/AddToBagDrawer";

interface DPAttributes {
  url: string;
  width: number;
  height: number;
}

interface DataAttributes {
  createdAt: string;
  name: string;
  price: number;
  uid: string;
  discount: number;
  dp: {
    data: {
      id: number;
      attributes: DPAttributes;
    };
  };
}

interface Datum {
  id: number;
  attributes: DataAttributes;
}

type CardProductModelTypes = {
  product: Datum;
};

const CardProductModel = ({ product }: CardProductModelTypes) => {
  return (
    <Card className="w-full bg-mainBg mb-1 rounded-sm shadow-transparent outline-none hover:outline-2 hover:outline-gray-300">
      <CardHeader className="p-0 block">
        <section className="relative">
          <div className="w-full">
            <AspectRatio ratio={8 / 8}>
              <Link
                href={`/products/${product.attributes.uid}`}
                className="block h-full w-full"
              >
                <Image
                  loader={myImageLoader}
                  src={`${product.attributes.dp.data.attributes.url}`}
                  quality={75}
                  alt={""}
                  fill
                  className="rounded-md object-cover"
                />
              </Link>
            </AspectRatio>
          </div>
          {product.attributes.discount > 0 && (
            <div className="absolute top-1 right-1 bg-secNav px-1 rounded-full">
              <p className="text-xs text-buttonText md:text-sm">
                Sale -{product.attributes.discount}%
              </p>
            </div>
          )}
        </section>
      </CardHeader>
      <CardContent className="p-2 pb-0 flex flex-col gap-2">
        <Link href={`/products/${product.attributes.uid}`}>
          <h6 className="line-clamp-2 text-[12px] text-center hover:underline md:text-base tracking-wider">
            {product.attributes.name}
          </h6>
        </Link>
        {product.attributes.discount > 0 ? (
          <div className="flex flex-col gap-2">
            <p className="text-center text-xs md:text-sm">
              <span className="bg-secNav text-buttonText px-1 py-0.5">
                Save TK.{" "}
                {Math.round(
                  product.attributes.price -
                    product.attributes.price *
                      (1 - product.attributes.discount / 100)
                )}
              </span>
            </p>
            <div className="flex gap-2 items-center justify-center py-1">
              <span className="text-red-400 text-sm font-medium line-through">
                {Math.round(
                  product.attributes.price *
                    (1 - product.attributes.discount / 100)
                )}
                ৳
              </span>
              <span className="font-medium">{product.attributes.price}৳</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-center text-xs md:text-sm opacity-0">
              <span className="bg-secNav text-buttonText px-1 py-0.5">
                Save TK 0
              </span>
            </p>
            <span className="font-medium text-center py-1">
              {product.attributes.price}৳
            </span>
          </div>
        )}
      </CardContent>
      <AddToBagDrawer />
    </Card>
  );
};
export default CardProductModel;
