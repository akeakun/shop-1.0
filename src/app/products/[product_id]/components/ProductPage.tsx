import Link from "next/link";
import MainImageSection from "./MainImageSection";
import ProductDescription from "./ProductDescription";
import SimilarProducts from "./SimilarProducts";
import { MoveRight } from "lucide-react";

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

type ProductTypes = {
  product: ApiResponse
}

const ProductPage = ({ product }: ProductTypes) => {
  return (
    <div>
      <section className="flex flex-col md:flex-row md:justify-center">
        <MainImageSection images={product.data[0].attributes.dp.data.attributes.url} />
        <ProductDescription product={product} />
      </section>
      <section>
        <header className="text-center mb-4">
          <h2 className="text-xl font-semibold">Similar Products</h2>
          <p className="text-base font-medium">
            Products with similar category
          </p>
        </header>
        <SimilarProducts />
      </section>
      {/* something else products */}
      {/* <section>
      <header className="text-center mb-4">
          <h2 className="text-xl font-semibold">Similar Products</h2>
          <p className="text-base font-medium">
            Products with similar category
          </p>
        </header>
      </section> */}
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
