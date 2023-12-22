import "react-multi-carousel/lib/styles.css";
import { CarouselComp } from "./utils/CarouselClient";
import { prodData } from "@/lib/demodata";
import CardProductModel from "@/components/Product/CardProductModel";
const SimilarProducts = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      partialVisibilityGutter: 20
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      partialVisibilityGutter: 20
    },
  };
  const productData = prodData;
  return (
    <CarouselComp
      swipeable={true}
      draggable={false}
      responsive={responsive}
      keyBoardControl={true}
      transitionDuration={500}
      removeArrowOnDeviceType={["mobile"]}
      partialVisible={true}

      // containerClass="carousel-container"
    >
      {prodData.map((item, index) => (
        <div key={index} className="mx-1">
          <CardProductModel product={item} />
        </div>
      ))}
    </CarouselComp>
  );
};
export default SimilarProducts;
