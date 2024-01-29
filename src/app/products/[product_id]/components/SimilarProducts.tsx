import "react-multi-carousel/lib/styles.css";
import { CarouselComp, CustomLeftArrow, CustomRightArrow } from "./utils/CarouselClient";
import { prodData } from "@/lib/temp/demodata";
import CardProductModel from "@/components/Product/CardProductModel";
import axios from "axios";

interface DPAttributes {
  url: string;
  width: number;
  height: number;
}

interface DataAttributes {
  createdAt: string;
  name: string;
  price: number;
  uid: string;
  discount: number;
  dp: {
    data: {
      id: number;
      attributes: DPAttributes;
    };
  };
}

interface Datum {
  id: number;
  attributes: DataAttributes;
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
  data: Datum[];
  meta: Meta;
}

interface SimilarProducts {
  category: string;
}
const SimilarProducts = async ({category}: SimilarProducts) => {

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      partialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      partialVisibilityGutter: 20,
    },
  };

  const res = await axios.get(`http://localhost:1337/api/products?populate[dp][fields][0]=url&populate[dp][fields][1]=width&populate[dp][fields][2]=height&fields[0]=createdAt&fields[1]=name&fields[2]=price&fields[3]=uid&fields[4]=discount&filters[category][name]=${category}&pagination[pageSize]=20&pagination[page]=1`)
  const productData: ApiResponse = res.data

  return (
    <CarouselComp
      ssr={true}
      swipeable={true}
      draggable={false}
      responsive={responsive}
      keyBoardControl={true}
      transitionDuration={500}
      removeArrowOnDeviceType={["mobile"]}
      partialVisible={true}
      customRightArrow={<CustomRightArrow />}
      customLeftArrow={<CustomLeftArrow/>}
      // containerClass="carousel-container"
    >
      {productData.data.map((item, index) => (
        <div key={index} className="mx-1">
          <CardProductModel product={item} />
        </div>
      ))}
    </CarouselComp>
  );
};
export default SimilarProducts;
