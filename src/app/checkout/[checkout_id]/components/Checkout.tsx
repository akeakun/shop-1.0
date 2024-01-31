"use client";
import { CartContext } from "@/lib/Hooks/client/Cart";
import { useMediaQuery } from "@/lib/Hooks/client/useMediaQuery";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import CheckoutInput from "./CheckoutInput";
import { useRouter } from "next/navigation";
type Product = {
  name: string;
  price: number;
  dp: {
    data: {
      id: number;
      attributes: {
        url: string;
      };
    };
  };
  size: string;
  quantity: number;
};
interface CheckoutProps {
  cart: { products: Product[]; total: number };
  checkout_id: string;
}
const Checkout = ({ cart, checkout_id }: CheckoutProps) => {
  
  // console.log(cart);

  // const { cartItems } = useContext(CartContext);
  // const router = useRouter()
  // if (cartItems.products.length === 0) {
  //   router.replace("/")
  // }
  // const [isDesktop, setIsDesktop] = useState(false);
  // const desktopView = useMediaQuery("(min-width: 470px)");

  // useEffect(() => {
  //   setIsDesktop((prevState) => {
  //     return desktopView ? true : false;
  //   });
  // }, [desktopView]);

  // if (isDesktop) {
  return (
    <div className="my-6">
      <CheckoutInput cart={cart} checkout_id={checkout_id} />
    </div>
  );
  // }
  // return <div className="my-10">checkout page</div>;
};

export default Checkout;
