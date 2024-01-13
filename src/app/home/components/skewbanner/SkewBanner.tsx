import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
const SkewBanner = () => {
  return (
    <section className="mt-14">
      <AspectRatio ratio={16 / 8} className="relative">
        <div className="second-canvas-first-element absolute left-0 top-0 h-full w-full">
          <Image
            src={"/products/1.jpg"}
            fill
            alt={""}
            // className="object-cover"
          />
        </div>
        <div className="second-canvas-second-element absolute right-0 top-0 h-full w-full">
          <Image
            src={"/products/2.jpg"}
            fill
            alt={""}
          />
        </div>
      </AspectRatio>
    </section>
  );
};
export default SkewBanner;
