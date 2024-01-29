import Header from "@/components/Header/Header";
import FeaturedProducts from "./components/FeaturedProducts";

const Featured = () => {
  return (
    <div className=" mt-14">
      <Header
      classes=""
        head="Featured Products"
        paragraph="Products currently on trending and top selling"
      />
      <section className="w-full flex flex-wrap">
        <FeaturedProducts />
      </section>
    </div>
  );
};
export default Featured;
