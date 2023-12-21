"use client";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";

type MainImageSectionTypes = {
  images: any;
}

const MainImageSection = ({images}: MainImageSectionTypes) => {
    
      const [currentImage, setCurrentImage] = useState(0);
    
      const setImage = (e: number) => {
        console.log(e);
        setCurrentImage((prevState) => {
          return e;
        });
      };
  return (
    <section className="flex flex-col items-center">
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
          <div className="w-11/12 grid gap-4 grid-cols-4 p-6">
            {images.map((item, index) => (
              <div className={`${index === currentImage && "scale-125"} cursor-pointer hover:scale-105 transition-all duration-150 ease-in-out`} key={index} onClick={(e) => setImage(index)}>
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