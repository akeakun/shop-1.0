"use server";

import { randomBytes } from "crypto";
import { redirect } from "next/navigation";

type CartItems = {
  products: [];
  total: number;
};

export const CheckoutHandler = async (cartItems: CartItems) => {

  try {
    
  } catch (error: any) {
    redirect("/");
  }
};
