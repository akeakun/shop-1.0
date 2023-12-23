import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

const Canvas = () => {
  return (
    <div className="w-full space-x-1.5 md:grid md:grid-cols-3 md:grid-rows-2 p-2">
      <div className=" md:row-span-2 md:col-span-2">
        <AspectRatio
          asChild
          ratio={16 / 9}
          className=" md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-2"
        >
          <Image src="/Banner_copy.jpg" alt="Image" fill className="rounded-md object-cover" />
        </AspectRatio>
      </div>
      <div className=" hidden md:space-y-1.5 md:flex md:flex-col md:col-span-1 md:row-span-2">
        <AspectRatio
          ratio={16 / 9}
          className=" w-full md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-1"
        >
          <Image src="/Banner_copy.jpg" alt="Image" fill className="rounded-md object-cover" />
        </AspectRatio>
        <AspectRatio
          ratio={16 / 9}
          className=" w-full md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-2"
        >
          <Image src="/Banner_copy.jpg" alt="Image" fill className="rounded-md object-cover" />
        </AspectRatio>
      </div>
    </div>
  );
};
export default Canvas;
