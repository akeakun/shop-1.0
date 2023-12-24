"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { clothingCategoriesWithImagesAndTitle } from "@/lib/demodata";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const CategoriesPage = () => {
  const categories = clothingCategoriesWithImagesAndTitle;
  return (
    <div className="h-fit w-full flex flex-wrap justify-center">
      {categories.map((item, index) => (
        <div key={index} className="w-1/2 p-1 md:w-1/3 lg:w-1/4">
          <Card className="w-full bg-mainBg rounded-sm shadow-transparent border-none">
            <CardHeader className="p-0 block">
              <section className="relative">
                <div className="w-full">
                  <AspectRatio ratio={8 / 8}>
                    <Link
                      href={`/categories/${item.name}`}
                      className="block h-full w-full"
                    >
                      <Image
                        src={`${item.imageLink}`}
                        fill
                        alt="Image"
                        className="rounded-md object-cover"
                      />
                    </Link>
                  </AspectRatio>
                </div>
              </section>
            </CardHeader>
            <CardContent className="p-2 pb-0">
              <Link href={`/categories/${item.name}`}>
                <p className="text-center text-lg p-2">
                  {item.title}
                </p>
              </Link>
            </CardContent>
            <CardFooter>
              <Link
                href={`/categories/${item.name}`}
                className="flex justify-center p-2 bg-button text-buttonText space-x-2 w-full"
              >
                {" "}
                <p>Browse collection</p> <MoveRight />
              </Link>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};
export default CategoriesPage;
