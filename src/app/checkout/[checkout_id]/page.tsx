import Navigation from "@/components/Navigation";
import Checkout from "./components/Checkout";
import Footer from "@/components/Footer/Footer";
import dynamic, { noSSR } from "next/dynamic";
import { db } from "@/lib/prismaDB";
import { notFound, redirect } from "next/navigation";
import { isCuid } from "@paralleldrive/cuid2";
import { isUUID } from "validator";
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
type Item = {
  id: number;
    size: string;
    quantity: number;
    sku: string;
    checkoutId: string | null;
};

type Cart = Item[];
type PageTypes = {
  params: { checkout_id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = async ({ params }: PageTypes) => {
  const checkOutId = params.checkout_id;
  const isValidUid = isUUID(checkOutId);
  if (!isValidUid) {
    notFound();
  }
  const checkout = await db.checkout.findUnique({
    where: {
      id: checkOutId,
    },
    include: {
      cartItems: true,
    }
  });
  if (!checkout) {
    redirect("/");
  }
  const currentTime = new Date();
  if (checkout.expirationTime && currentTime > checkout.expirationTime) {
    await db.checkout.delete({
      where: {
        id: checkout.id,
      },
    });
    redirect("/");
  }
  const query = "http://localhost:1337/api/products";
  const dbCart: Cart = checkout.cartItems
  const products: Product[] = await Promise.all(
    dbCart.map(async (item) => {
      const response = await fetch(
        `${query}?filters[sku][$eq]=${item.sku}&populate[dp][fields][0]=url&fields[0]=name&fields[1]=price`
      );
      const product: ApiResponse = await response.json();
      console.log(product);
      
      product.data[0].attributes["size"] = item.size;
      product.data[0].attributes["quantity"] = item.quantity;
      return product.data[0].attributes;
    })
  );

  const total = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const cart: { products: Product[]; total: number } = { products, total };

  return (
    <>
      <Navigation />
      <section className="w-full flex flex-col flex-1 items-center ">
        <div className="page-style-container flex justify-center relative">
          <Checkout cart={cart} checkout_id={checkout.id} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;
