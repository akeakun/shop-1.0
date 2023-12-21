import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import { productsSizes } from "@/lib/demodata";

const CardProductModel = () => {
  const sizes = productsSizes;

  return (
    <Card className="w-[170px] bg-cardBg rounded-md">
        <CardHeader className="p-0 block">
          <section className="relative">
            <div className="w-full">
              <AspectRatio ratio={8 / 8}>
                <Image
                  src="/WaterMark-Image.jpg"
                  fill
                  alt="Image"
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>
            <div className="absolute top-0 right-0 bg-secNav px-1 rounded-full">
              <p className="text-xs text-buttonText md:text-sm">Sale -10%</p>
            </div>
          </section>
        </CardHeader>
        <CardContent className="p-2 pb-0">
          <Link href={`/categories/lgernjg/u2v3w4x5y6`}>
            <p className="line-clamp-2 text-sm md:text-lg tracking-wider">
              name
            </p>
          </Link>
          <p className=" text-red-400 text-md">{1700}৳</p>
        </CardContent>
        <CardFooter className="px-2 pb-1 flex flex-col">
          <p className="text-xs py-1">Sizes available:</p>
          <div className="flex space-x-1">
            {sizes.map((size, index) => (
              <>
                <p className="text-sm px-0.5 border border-gray-400 border-dashed">
                  {size.name}
                </p>
              </>
            ))}
          </div>
        </CardFooter>
      </Card>
  )
}
export default CardProductModel