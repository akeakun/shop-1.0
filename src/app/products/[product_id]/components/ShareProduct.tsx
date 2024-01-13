import { Facebook, Heart, Instagram, Share2 } from "lucide-react";

const ShareProduct = () => {
  return (
    <section className="w-full flex flex-col flex-1 items-center">
      <div className="page-style-container ">
        <div className=" flex items-center justify-between p-4 m-2 rounded-full h-10 bg-secNav">
          <div className="flex items-center">
            <Facebook color="white" className="rounded-full hover:bg-gray-700 mx-1 cursor-pointer p-1" size={26} />
            <Instagram color="white" className="rounded-full hover:bg-gray-700 mx-1 cursor-pointer p-1" size={26} />
            
          </div>
          <div className="flex items-center">
            <Share2 color="white" className="rounded-full hover:bg-gray-700 mx-1 cursor-pointer p-1" size={26} />
            <Heart color="white" className="rounded-full hover:bg-gray-700 mx-1 cursor-pointer p-1" size={26} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default ShareProduct;
