import Footer from "@/components/Footer/Footer";
import Navigation from "@/components/Navigation";
import DraggableMenuBar from "./compoents/Draggable";
import { notFound, redirect } from "next/navigation";
import CardProductModel from "@/components/Product/CardProductModel";
import SideBar from "./compoents/SideBar";
type PageTypes = {
  params: { product_id: string };
  searchParams: { [key: string]: string | undefined };
};

interface DPAttributes {
  url: string;
  width: number;
  height: number;
}

interface DataAttributes {
  createdAt: string;
  name: string;
  price: number;
  uid: string;
  discount: number;
  sku: string;
  dp: {
    data: {
      id: number;
      attributes: DPAttributes;
    };
  };
}

interface Datum {
  id: number;
  attributes: DataAttributes;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface Meta {
  pagination: Pagination;
}

interface ApiResponse {
  data: Datum[];
  meta: Meta;
}

const Page = async ({ params, searchParams }: PageTypes) => {
  const category = searchParams.category || "";
  const tag = searchParams.tag || "";
  const sanitizedCategory = category.replace(/[^a-zA-Z0-9-]/g, "");
  const sanitizedTag = tag.replace(/[^a-zA-Z0-9-]/g, "");
  let queryString = `http://localhost:1337/api/products?populate[dp][fields][0]=url&populate[dp][fields][1]=width&populate[dp][fields][2]=height&populate[dp][fields][3]=formats&fields[0]=createdAt&fields[1]=name&fields[2]=price&fields[3]=uid&fields[4]=discount&fields[5]=sku`;

  if (category !== "") {
    queryString += `&filters[category][link]=${sanitizedCategory}`;
  }

  if (tag !== "") {
    queryString += `&filters[tags][link]=${sanitizedTag}`;
  }

  const res = await fetch(queryString);
  const prodData: ApiResponse = await res.json();
  console.log(prodData);

  // const products = prodData.filter((item) => {
  //   return item.category === category;
  // });

  return (
    <>
      <Navigation />
      <section className="w-full flex flex-col flex-1 items-center">
        <div className="page-style-container flex relative">
          {/* <DraggableMenuBar/> */}
          <SideBar />
          <div className="flex flex-wrap w-full md:w-4/5">
            {prodData.data.length > 0 ? (
              prodData.data.map((item, index) => (
                <div className="w-1/2 p-1 md:w-1/3 lg:w-1/4" key={index}>
                  <CardProductModel product={item} />
                </div>
              ))
            ) : (
              <div>No products found. se more categories</div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default Page;
