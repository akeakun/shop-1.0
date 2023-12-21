import MainImageSection from "./MainImageSection";
import ProductDescription from "./ProductDescription";

type ProductPageTypes = {
  product: any
};

const ProductPage = ({product}: ProductPageTypes ) => {
  console.log(product);
  
  return (
    <div>
      <div className=" md:flex-row">
        <MainImageSection images={product.images} />
        <ProductDescription product={product} />
      </div>
    </div>
  );
};
export default ProductPage;
