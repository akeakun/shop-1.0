"use client";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";

type MainImageSectionTypes = {
  images: any;
}

const MainImageSection = ({images}: MainImageSectionTypes) => {
    
      const [currentImage, setCurrentImage] = useState(0);
      const [loading, setLoading] = useState(true)
    
      const setImage = (e: number) => {
        console.log(e);
        setCurrentImage((prevState) => {
          return e;
        });
      };

  return (
    <section className="flex flex-col items-center md:flex-1 max-w-3xl">
          {/* image slider */}
          <div className=" w-11/12">
            <div className="w-full">
              <AspectRatio ratio={8 / 8}>
                <Image
                  src={`/products/${images[currentImage]}`}
                  alt="Image"
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>
          </div>
          <div className="w-11/12 my-6 grid gap-4 lg:gap-10 grid-cols-4 px-8 lg:px-14">
            {images.map((item: any, index: any) => (
              <div className={`${index === currentImage && " scale-110"} cursor-pointer hover:scale-105 transition-all duration-150 ease-in-out`} key={index} onClick={(e) => setImage(index)}>
                <AspectRatio ratio={8 / 8}>
                  <Image
                    src={`/products/${item}`}
                    alt="Image"
                    fill
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
              </div>
            ))}
          </div>
        </section>
  )
}
export default MainImageSection