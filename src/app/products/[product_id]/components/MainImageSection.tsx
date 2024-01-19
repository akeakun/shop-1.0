"use client";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";
import { myImageLoader } from "@/lib/Hooks/client/ImageLoader";

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

interface ImageAttributes {
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
}

type MainImageSectionTypes = {
  dp: { data: ImageAttributes };
  images: { data: ImageAttributes[] };
};

const MainImageSection = ({ images, dp }: MainImageSectionTypes) => {
  const imageList = [dp.data, ...images.data];

  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);

  const setImage = (e: number) => {
    setCurrentImage((prevState) => {
      return e;
    });
  };

  return (
    <section className="flex flex-col items-center md:flex-1 max-w-xl">
      {/* image slider */}
      <div className=" w-11/12">
        <div className="w-full">
          <AspectRatio ratio={8 / 8}>
            <Image
              loader={myImageLoader}
              src={imageList[currentImage].attributes.url}
              alt="Image"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      </div>
      <div className="w-11/12 my-6 grid gap-4 lg:gap-10 grid-cols-4 px-8 lg:px-14">
        {imageList.map((item, index) => (
          <div
            className={`${
              index === currentImage && " scale-110"
            } cursor-pointer hover:scale-105 transition-all duration-150 ease-in-out`}
            key={index}
            onClick={(e) => setImage(index)}
          >
            <AspectRatio ratio={8 / 8}>
              <Image
                loader={myImageLoader}
                src={item.attributes.url}
                alt="Image"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
        ))}
      </div>
    </section>
  );
};
export default MainImageSection;
