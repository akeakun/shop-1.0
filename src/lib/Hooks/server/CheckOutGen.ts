"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/prismaDB";

interface Product {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShoppingCart {
  products: Product[];
  total: number;
}

function extractProductDetails({
  products,
}: ShoppingCart): { id: string; quantity: number; size: string }[] {
  return products.map(({ id, quantity, size }) => ({ id, quantity, size }));
}

export const CheckoutGen = async (cartItems: ShoppingCart) => {
  const extractedDetails = extractProductDetails(cartItems);
  const expirationTime = new Date();
  expirationTime.setHours(expirationTime.getHours() + 12);

  const checkout = await db.checkout.create({
    data: {
      cartItems: JSON.stringify(extractedDetails),
      expirationTime: expirationTime,
    },
  });
  redirect(`/checkout/${checkout.id}`)
};
