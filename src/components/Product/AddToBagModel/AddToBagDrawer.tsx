"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MoveRight, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { myImageLoader } from "@/lib/Hooks/client/ImageLoader";
import Link from "next/link";
import AddToCart from "@/app/products/[product_id]/components/AddToCart";
import { useMediaQuery } from "@/lib/Hooks/client/useMediaQuery";

// Sizes component type
interface Size {
  id: number;
  __component: string;
  size: string;
  stock: number;
}

// Product attributes type
interface ProductAttributes {
  price: number;
  sfs: Size[];
}

// Product type
interface Product {
  id: number;
  attributes: ProductAttributes;
}

// Pagination type
interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

// Meta type
interface Meta {
  pagination: Pagination;
}

// Response type
interface ApiResponse {
  data: Product[];
  meta: Meta;
}

interface AddToBagDrawerProps {
  dp: string;
  name: string;
  uid: string;
  sku: string;
  discount: number;
}

const AddToBagDrawer = ({ dp, name, sku, uid, discount }: AddToBagDrawerProps) => {
  const [open, setOpen] = useState(false);
  const [remoteData, setRemoteData] = useState<ApiResponse>();
  const [currentSize, setCurrentSize] = useState<Size>();
  async function fetchData() {
    const res = await axios.get(
      `http://localhost:1337/api/products?filters[uid][$eq]=${uid}&fields=price&populate=sfs`
    );
    setRemoteData((prevState) => {
      return res.data;
    });
    setCurrentSize((prevState) => {
      return res.data.data[0]?.attributes.sfs[0];
    });
  }
  useEffect(() => {
    fetchData();
  }, []);



  const isDesktop = useMediaQuery("(min-width: 470px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="bg-secNav hover:bg-gray-700 text-buttonText flex w-full py-1 md:py-2 justify-center space-x-1 md:space-x-2">
            <p>Add to Bag</p> <ShoppingBag size={22} />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogClose className="flex justify-end">
            <X size={26} />
          </DialogClose>
          <div className="relative">
          <AspectRatio ratio={8 / 8}>
            <Image
              loader={myImageLoader}
              src={dp}
              alt={""}
              fill
              className="rounded-md"
            />
          </AspectRatio>
          {discount > 0 && (
            <div className="absolute top-1 right-1 bg-secNav px-1 rounded-full">
              <p className="text-sm text-buttonText md:text-sm">
                Sale -{discount}%
              </p>
            </div>
          )}
        </div>
        
        <div>
          <Link
            href={`/products/${uid}`}
            className="font-semibold text-lg block pt-2 hover:underline"
          >
            {name}
          </Link>
          {discount > 0 ? (
            <div className="flex flex-col gap-2">
              <div className="py-1 space-x-2">
                <span className="text-red-400 text-sm font-medium line-through">
                  {remoteData?.data[0].attributes.price}৳
                </span>
                <span className="font-medium">
                  {Math.round(
                    // @ts-ignore
                    remoteData?.data[0].attributes.price * (1 - discount / 100)
                  )}
                  ৳
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="font-medium text-center py-1">
                {remoteData?.data[0].attributes.price}৳
              </span>
            </div>
          )}
        </div>
        <div className=" space-y-1">
          <p>Size</p>
          <div className="flex space-x-2">
            {remoteData?.data[0].attributes.sfs.map((item, index) => (
              <div
                key={index}
                className={`min-w-10 px-2 rounded-sm border border-gray-800 cursor-pointer ${
                  item.size === currentSize?.size ? "bg-secNav text-buttonText" : "bg-gray-200"
                }`}
                onClick={() => {
                  setCurrentSize((prevState: any) => {
                    return item;
                  });
                }}
              >
                <p className="text-lg text-center uppercase">{item.size}</p>
              </div>
            ))}
          </div>
        </div>
        <AddToCart
          id={uid}
          name={name}
          size={currentSize || { id: 0, __component: "", size: "", stock: 0 }}
          price={remoteData?.data[0].attributes.price || 0}
          discount={discount}
          sku={sku}
          dp={dp}
        />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="bg-secNav hover:bg-gray-700 text-buttonText flex w-full py-1 md:py-2 justify-center space-x-1 md:space-x-2">
          <p>Add to Bag</p> <ShoppingBag size={22} />
        </button>
      </DrawerTrigger>
      <DrawerContent className="px-5 ">
        <div className="relative">
          <AspectRatio ratio={8 / 8}>
            <Image
              loader={myImageLoader}
              src={dp}
              alt={""}
              fill
              className="rounded-md"
            />
          </AspectRatio>
          {discount > 0 && (
            <div className="absolute top-1 right-1 bg-secNav px-1 rounded-full">
              <p className="text-sm text-buttonText md:text-sm">
                Sale -{discount}%
              </p>
            </div>
          )}
        </div>

        <div>
          <Link
            href={`/products/${uid}`}
            className="font-semibold text-lg block pt-2 hover:underline"
          >
            {name}
          </Link>
          {discount > 0 ? (
            <div className="flex flex-col gap-2">
              <div className="py-1 space-x-2">
                <span className="text-red-400 text-sm font-medium line-through">
                  {remoteData?.data[0].attributes.price}৳
                </span>
                <span className="font-medium">
                  {Math.round(
                    // @ts-ignore
                    remoteData?.data[0].attributes.price * (1 - discount / 100)
                  )}
                  ৳
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="font-medium text-center py-1">
                {remoteData?.data[0].attributes.price}৳
              </span>
            </div>
          )}
        </div>
        <div className=" space-y-1">
          <p>Size</p>
          <div className="flex space-x-2">
            {remoteData?.data[0].attributes.sfs.map((item, index) => (
              <div
                key={index}
                className={`min-w-10 px-2 rounded-sm border border-gray-800 cursor-pointer ${
                  item.size === currentSize?.size ? "bg-secNav text-buttonText" : "bg-gray-200"
                }`}
                onClick={() => {
                  setCurrentSize((prevState: any) => {
                    return item;
                  });
                }}
              >
                <p className="text-lg text-center uppercase">{item.size}</p>
              </div>
            ))}
          </div>
        </div>
        <AddToCart
          id={uid}
          sku={sku}
          name={name}
          size={currentSize || { id: 0, __component: "", size: "", stock: 0 }}
          price={remoteData?.data[0].attributes.price || 0}
          discount={discount}
          dp={dp}
        />
        <Link href={`/products/${uid}`} className="h-10 border border-gray-500 flex justify-center items-center space-x-2"><span>See Details</span><MoveRight /></Link>
        <DrawerFooter className="pt-2 px-0">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddToBagDrawer;
