import MainImageSection from "./MainImageSection";
import ProductDescription from "./ProductDescription";
import SimilarProducts from "./SimilarProducts";

type ProductPageTypes = {
  product: any
};

const ProductPage = ({product}: ProductPageTypes ) => {
  console.log(product);
  
  return (
    <div>
      <section className="flex flex-col md:flex-row md:justify-center">
        <MainImageSection images={product.images} />
        <ProductDescription product={product} />
      </section>
      <section>
        <SimilarProducts/>
      </section>
      <section>

      </section>
    </div>
  );
};
export default ProductPage;
