import Navigation from "@/components/Navigation";
import { prodData } from "@/lib/demodata";
import { notFound, permanentRedirect } from "next/navigation";
import ProductPage from "./components/ProductPage";
import ShareProduct from "./components/ShareProduct";
import Footer from "@/components/Footer/Footer";

type PageTypes = {
  params: { category: string; product_id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

interface ImageAttributes {
  id: number;
  attributes: {
    url: string;
    width: number;
    height: number;
    formats: {
      thumbnail: ImageFormat;
      small: ImageFormat;
    };
  };
}

interface Size {
  id: number;
  __component: string;
  size: string;
  stock: number;
}

interface Description {
  type: string;
  children: Array<{ type: string; text: string }>;
}

interface TShirt {
  id: number;
  attributes: {
    createdAt: string;
    description: Description[];
    name: string;
    sku: string;
    price: number;
    uid: string;
    discount: number;
    dp: { data: ImageAttributes };
    images: { data: ImageAttributes[] };
    category: { data: { id: number; attributes: { name: string; link: string } } };
    sfs: Size[];
  };
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
  data: TShirt[];
  meta: Meta;
}


const Page = async ({ params, searchParams }: PageTypes) => {
  const product_id = params.product_id;
  const sanitizedId = product_id.replace(/[^a-zA-Z0-9-]/g, "");
  const res = await fetch(
    `http://localhost:1337/api/products?filters[uid][$eq]=${sanitizedId}&populate[dp][fields][0]=url&populate[dp][fields][1]=width&populate[dp][fields][2]=height&populate[dp][fields][3]=formats&populate[images][fields][0]=url&populate[images][fields][1]=width&populate[images][fields][2]=height&populate[images][fields][3]=formats&populate[category][fields][0]=name&populate[category][fields][1]=link&populate[sfs][fields][0]=size&populate[sfs][fields][1]=stock&fields[0]=createdAt&fields[1]=description&fields[2]=name&fields[3]=sku&fields[4]=price&fields[5]=uid&fields[6]=discount`
  );
  const prodData: ApiResponse = await res.json();
  console.log(sanitizedId);
  
  console.log(prodData);
  if (prodData.data.length === 0) {
    return notFound();
  } else {
    return (
      <>
        <Navigation />
        <ShareProduct />
        <section className="w-full flex flex-col flex-1 items-center ">
          <div className="page-style-container">
            <ProductPage product={prodData} />
          </div>
        </section>
        <Footer/>
      </>
    );
  }
};
export default Page;
