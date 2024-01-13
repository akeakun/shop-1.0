import Footer from "@/components/Footer/Footer";
import Navigation from "@/components/Navigation";
import DraggableMenuBar from "./compoents/Draggable";
import { notFound, redirect } from "next/navigation";
import { prodData } from "@/lib/demodata";
import CardProductModel from "@/components/Product/CardProductModel";
import SideBar from "./compoents/SideBar";
type PageTypes = {
  params: { category: string; product_id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const Page = ({ params, searchParams }: PageTypes) => {
  const category = searchParams.category;
  const products = prodData.filter((item) => {
    return item.category === category;
  });
  if (!category) {
    redirect("/");
  }

  return (
    <>
      <Navigation />
      <section className="w-full flex flex-col flex-1 items-center">
        <div className="page-style-container flex relative">
          {/* <DraggableMenuBar/> */}
          <SideBar />
          <div className="flex flex-wrap w-full md:w-4/5">
            {products.map((item, index) => (
              <div className="w-1/2 p-1 md:w-1/3 lg:w-1/4">
                <CardProductModel product={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default Page;
