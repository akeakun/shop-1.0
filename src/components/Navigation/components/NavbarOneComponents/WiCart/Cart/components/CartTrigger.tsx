"use client";
import { CartContext } from "@/lib/Hooks/client/Cart";
import { useContext } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Minus, MoveRight, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
const CartTrigger = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <Sheet>
      <SheetTrigger className="relative hover:bg-gray-800 rounded-full p-2">
        <div className="absolute top-0 right-0 p-1 badge badge-secondary">
          {cartItems.length}
        </div>
        <ShoppingBag />
      </SheetTrigger>
      <SheetContent className=" bg-mainBg p-4 w-11/12 flex flex-col md:max-w-[380px]">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold uppercase">
            Your Cart
          </SheetTitle>
          <Separator className="bg-secNav" />
          <div className="flex justify-center space-x-1">
            <p>Total items</p>{" "}
            <span className=" px-1.5 border border-red-600 rounded-full">
              {cartItems.length}
            </span>
          </div>
        </SheetHeader>
        <section className="flex-1 flex flex-col">
          {cartItems.length > 0 && (
            <>
              <div className=" w-full flex-1 my-2">
                <ScrollArea className="h-full w-full rounded-md border p-0">
                  <div className="space-y-1.5">
                  {cartItems.map((item: any, index: any) => (
                    <div className="flex h-[110px] w-full relative">
                      <Link href={`/categories/${item.category}/${item.id}`}><Image
                        src={`/products/${item.image}`}
                        alt={item.name}
                        height={120}
                        width={120}
                        className="rounded-md h-full w-auto object-cover"
                      /></Link>
                      
                      <div className="flex-1 px-2">
                        <Link
                          className="text-sm font-semibold hover:underline line-clamp-2 tracking-wider"
                          href={`/categories/${item.category}/${item.id}`}
                        >
                          {item.name}
                        </Link>
                        <p className="text-base">
                          <span className="text-sm">Size:&nbsp;</span>
                          {item.size}
                        </p>
                        <p className="text-base">
                          <span className="text-sm">Quantity:&nbsp;</span>
                          {item.quantity}
                        </p>
                        <p className="text-base ">
                          <span className="text-sm">Price: </span>
                          {item.price}৳
                        </p>
                      </div>
                      <button className=" bg-gray-300 rounded-md px-1 cursor-pointer" onClick={() => removeFromCart(item)}>
                      <Trash2 />
                      </button>
                    </div>
                  ))}
                  </div>
                </ScrollArea>
              </div>
              <Separator className="bg-secNav" />
              <div className="my-2">
                <div className="flex">
                  <span className="flex-1">Sub-Total:</span>
                  <span>{}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total:</span>
                  <span>{}</span>
                </div>
              </div>
              <button className="bg-button text-buttonText py-2 hover:bg-gray-900">Continue to Checkout</button>
            </>
          )}{" "}
          {cartItems.length === 0 && (
            <div className="my-10">
              <h4 className="text-base font-medium text-center py-4">
                Your cart is empty. Add something to cart and it will show up
                here
              </h4>
              <Link
                href={"/"}
                className=" bg-button px-4 py-2 flex justify-center items-center space-x-2 text-buttonText hover:scale-95 transition-all duration-150 ease-in"
              >
                <p>Continue Shopping</p> <MoveRight />
              </Link>
            </div>
          )}
        </section>
      </SheetContent>
    </Sheet>
  );
};
export default CartTrigger;
