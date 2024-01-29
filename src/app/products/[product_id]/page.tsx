import Navigation from "@/components/Navigation";
import { prodData } from "@/lib/temp/demodata";
import { notFound, permanentRedirect } from "next/navigation";
import ProductPage from "./components/ProductPage";
import ShareProduct from "./components/ShareProduct";
import Footer from "@/components/Footer/Footer";
import { BlocksContent } from "@strapi/blocks-react-renderer";

type PageTypes = {
  params: { category: string; product_id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
// interface DescriptionText {
//   type: "paragraph" | "list";
//   children: DescriptionTextItem[];
// }

// interface DescriptionTextItem {
//   type: "text" | "list-item";
//   text: string;
//   format?: "unordered" | "ordered";
//   bold?: boolean;
//   italic?: boolean;
//   underline?: boolean;
//   strikethrough?: boolean;
// }

interface ProductAttributes {
  createdAt: string; // timestamp format
  description: BlocksContent;
  name: string;
  sku: string;
  price: number;
  uid: string;
  discount: number;
  dp: {
    data: {
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
    };
  };
  images: {
    data: {
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
    }[];
  };
  category: {
    data: {
      id: number;
      attributes: {
        name: string;
        link: string;
      };
    };
  };
  tags: {
    data: {
      id: number;
      attributes: {
        name: string;
        link: string;
      };
    }[];
  };
  sfs: {
    id: number;
    __component: string;
    size: string;
    stock: number;
  }[];
}

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  url: string;
}

interface ProductData {
  id: number;
  attributes: ProductAttributes;
}

interface ProductResponse {
  data: ProductData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}


const Page = async ({ params, searchParams }: PageTypes) => {
  const product_id = params.product_id;
  const sanitizedId = product_id.replace(/[^a-zA-Z0-9-]/g, "");
  const res = await fetch(
    `http://localhost:1337/api/products?filters[uid][$eq]=${sanitizedId}&populate[dp][fields][0]=url&populate[dp][fields][1]=width&populate[dp][fields][2]=height&populate[dp][fields][3]=formats&populate[images][fields][0]=url&populate[images][fields][1]=width&populate[images][fields][2]=height&populate[images][fields][3]=formats&populate[category][fields][0]=name&populate[category][fields][1]=link&populate[tags][fields][0]=name&populate[tags][fields][1]=link&populate[sfs][fields][0]=size&populate[sfs][fields][1]=stock&fields[0]=createdAt&fields[1]=description&fields[2]=name&fields[3]=sku&fields[4]=price&fields[5]=uid&fields[6]=discount&pagination[pageSize]=1&pagination[page]=1`
  );
  const prodData: ProductResponse = await res.json();
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
        <Footer />
      </>
    );
  }
};
export default Page;
