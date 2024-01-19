import Link from "next/link";
import MainImageSection from "./MainImageSection";
import ProductDescription from "./ProductDescription";
import SimilarProducts from "./SimilarProducts";
import { MoveRight } from "lucide-react";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import MayAlsoLike from "./MayAlsoLike";
import Header from "@/components/Header/Header";
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

type ProductTypes = {
  product: ProductResponse;
};

const ProductPage = ({ product }: ProductTypes) => {
  return (
    <div>
      <section className="flex flex-col md:flex-row md:justify-center">
        <MainImageSection
          images={product.data[0].attributes.images}
          dp={product.data[0].attributes.dp}
        />
        <ProductDescription product={product.data[0]} />
      </section>
      <section>
        <Header
          head={"Similar Products"}
          paragraph={"Products with similar category"}
        />
        <SimilarProducts
          category={product.data[0].attributes.category.data.attributes.name}
        />
      </section>
      {/* something else products */}
      <section>
        <Header
          head={"Shop More Styles"}
          paragraph={"Elevate your everyday style"}
        />
        <MayAlsoLike tags={product.data[0].attributes.tags} />
      </section>
      <section className="mt-4 p-2 flex justify-center">
        <Link
          href={"/categories"}
          className="flex justify-center items-center space-x-2 w-full max-w-lg bg-button text-buttonText p-2"
        >
          <p>More categories</p>
          <MoveRight />
        </Link>
      </section>
    </div>
  );
};
export default ProductPage;
