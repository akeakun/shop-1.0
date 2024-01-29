"use server";
import { Resend } from "resend";
import ResendEmailTemplate from "@/components/Email/ResendEmailTemplate";
import { db } from "@/lib/prismaDB";
import Email from "@/components/Email/ResendEmailTemplate";
import AppleReceiptEmail from "@/components/Email/ResendEmailTemplate";
import axios from "axios";
import { createId } from "@paralleldrive/cuid2";
interface DpData {
  id: number;
  attributes: {
    url: string;
  };
}

interface Attribute {
  name: string;
  price: number;
  dp: {
    data: DpData;
  };
  size: string;
  quantity: number;
}

interface ProductData {
  id: number;
  attributes: Attribute;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface MetaData {
  pagination: Pagination;
}

interface ApiResponse {
  data: ProductData[];
  meta: MetaData;
}

type Data = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  division: string;
  address: string;
  paymentMethod: "cod" | "online";
  district?: string | undefined;
};

type DBCartItem = {
  id: string;
  quantity: number;
  size: string;
};

type DBCart = DBCartItem[];
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
  size: string; // No longer optional as all objects have it
  quantity: number;
};
type Cart = { products: Product[]; total: number };

const resend = new Resend(process.env.RESEND_API_KEY);
export const CheckOutHandler = async (
  customerData: Data,
  CheckOutId: string
) => {
  const checkout = await db.checkout.findUnique({
    where: {
      id: CheckOutId,
    },
  });

  if (!checkout) {
    return new Error("Something went wrong. Please try again");
  }

  if (
    !customerData.address ||
    !customerData.district ||
    !customerData.division ||
    !customerData.emailAddress ||
    !customerData.firstName ||
    !customerData.lastName ||
    !customerData.paymentMethod ||
    !customerData.phoneNumber
  ) {
    return new Error("Something went wrong. Please refresh and try again");
  }

  const query = "http://localhost:1337/api/products";
  const dbCart: DBCart = JSON.parse(checkout.cartItems as string);

  const data = {
    data: {
      FirstName: customerData.firstName,
      LastName: customerData.lastName,
      EmailAddress: customerData.emailAddress,
      PhoneNumber: customerData.phoneNumber,
      Division: customerData.division,
      District: customerData.district,
      Address: customerData.address,
      PaymentMethod: customerData.paymentMethod,
      Products: checkout.cartItems,
      OrderID: createId(),
    },
  };
  console.log("comes here");
  try {
    const order = await axios.post("http://localhost:1337/api/orders", data, {
      headers: {
        Authorization:
          "Bearer af842c3f666ad26e023f8a058a7b1852d187f905b00121bd817f2229ac5f6d0c21d2cfbe48baee96e4e3d54729522813bae1228edbe21a481b5ed0b6a885c23584b2a5e11ef8b767ceed642c3264a2a89c9d656b66ba9610e7dc2c1d4c24949e38bca7c7baaddbf225130a055d5fc1921693aca2d11cf0a6d98a22c10df731f5",
        "Content-Type": "application/json",
      },
    });
    await db.checkout.delete({
      where: {
        id: checkout.id,
      },
    });
    console.log(order.data.data.attributes.OrderID);
    return order.data.data.attributes.OrderID;
  } catch (error: any) {
    throw new Error("something went wrong");
  }
};
