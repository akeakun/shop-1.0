"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/prismaDB";

interface Product {
  id: string;
  sku: string;
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

function extractProductDetails({ products }: ShoppingCart): {
  id: string;
  sku: string;
  quantity: number;
  size: string;
}[] {
  return products.map(({ id, sku, quantity, size }) => ({
    id,
    sku,
    quantity,
    size,
  }));
}

export const CheckoutGen = async (cartItems: ShoppingCart) => {
  const extractedDetails = extractProductDetails(cartItems);

  const expirationTime = new Date();
  expirationTime.setHours(expirationTime.getHours() + 12);

  const checkout = await db.checkout.create({
    data: {
      expirationTime: expirationTime,
      cartItems: {
        create: extractedDetails.map((detail) => ({
          size: detail.size,
          quantity: detail.quantity,
          sku: detail.sku,
        })),
      },
    },
  });
  redirect(`/checkout/${checkout.id}`);
};
