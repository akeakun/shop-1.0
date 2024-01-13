import Link from "next/link";
import MainImageSection from "./MainImageSection";
import ProductDescription from "./ProductDescription";
import SimilarProducts from "./SimilarProducts";
import { MoveRight } from "lucide-react";

type ProductPageTypes = {
  product: any;
};

const ProductPage = ({ product }: ProductPageTypes) => {
  return (
    <div>
      <section className="flex flex-col md:flex-row md:justify-center">
        <MainImageSection images={product.images} />
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
