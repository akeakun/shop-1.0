import FeaturedProducts from "./components/FeaturedProducts";

const Featured = () => {
  return (
    <div className=" mt-14">
      <header className="text-center h-fit w-full bg-secNav text-buttonText p-2 md:p-4 relative">
        <h2 className="text-xl md:text-2xl font-bold leading-8 uppercase">
          Featured Products
        </h2>
        <p className="text-sm md:text-base">
          Products currently on trending and top selling
        </p>
        {/* <section className="absolute top-0 left-0 h-full w-full flex justify-between">
          <div className="bg-[#faedcd10] h-full w-1/5 header-poly-element-left-second"></div>
          <div className="bg-[#faedcd10] h-full w-1/5 header-poly-element-left-second"></div>
          <div className="bg-[#faedcd10] h-full w-1/5 header-poly-element-right-second"></div>
          <div className="bg-[#faedcd10] h-full w-1/5 header-poly-element-right-second"></div>
        </section> */}
      </header>
      <section className="w-full flex flex-wrap">
        <FeaturedProducts />
      </section>
    </div>
  );
};
export default Featured;
