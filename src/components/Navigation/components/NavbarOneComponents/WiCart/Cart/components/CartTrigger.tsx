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
import { Minus, MoveRight, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
const CartTrigger = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);

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
                <ScrollArea className="h-full w-full space-y-1.5 rounded-md border p-0">
                  {cartItems.map((item, index) => (
                    <div className="flex h-[110px] w-full relative">
                      <Image
                        src={`/products/${item.image}`}
                        alt={item.name}
                        height={120}
                        width={120}
                        className="rounded-md w-auto object-cover"
                      />
                      <div className="flex-1 px-2">
                        <Link
                          className="text-sm font-semibold"
                          href={`/categories/${item.category}/${item.id}`}
                        >
                          {item.name}
                        </Link>
                        <p className="text-base">
                          <span className="text-sm">Size:&nbsp;</span>
                          {item.size}
                        </p>
                        <p className="text-base ">
                          <span className="text-sm">Price: </span>
                          {item.price}৳
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <button className="border border-gray-800 cursor-pointer" onClick={removeFromCart(item)}>
                          <Minus />
                        </button>
                        <span className="w-full text-center border-l border-r border-gray-800">{item.quantity}</span>
                        <button className="border border-gray-800 cursor-pointer" onClick={addToCart(item)}>
                          <Plus />
                        </button>
                      </div>
                    </div>
                  ))}
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
