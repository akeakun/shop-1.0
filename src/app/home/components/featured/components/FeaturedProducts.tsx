import CardProductModel from "@/components/Product/CardProductModel";
import { prodData } from "@/lib/demodata";

const FeaturedProducts = () => {
  // demo data with polo
  const poloShirts = prodData.filter((item) => {
    return item.tags.includes("polo");
  });
  return (
    <>
      {poloShirts.map((item, index) => (
        <div key={index} className="w-1/2 p-1 md:w-1/3 lg:w-1/4">
          <CardProductModel product={item} />
        </div>
      ))}
    </>
  );
};
export default FeaturedProducts;
