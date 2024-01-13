import Navigation from "@/components/Navigation";
import { prodData } from "@/lib/demodata";
import { permanentRedirect } from "next/navigation";
import ProductPage from "./components/ProductPage";
import ShareProduct from "./components/ShareProduct";
import Footer from "@/components/Footer/Footer";

type PageTypes = {
  params: { category: string; product_id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async ({ params, searchParams }: PageTypes) => {
  const product_id = params.product_id;
  const sanitizedId = product_id.replace(/[^a-zA-Z0-9]/g, "");
  const product = prodData.filter((item) => item.uid === sanitizedId);

  if (product.length === 0) {
    return permanentRedirect("/");
  } else {
    return (
      <>
        <Navigation />
        <ShareProduct />
        <section className="w-full flex flex-col flex-1 items-center ">
          <div className="page-style-container">
            <ProductPage product={product[0]} />
          </div>
        </section>
        <Footer/>
      </>
    );
  }
};
export default Page;
