import axios from "axios";
import {
  CarouselComp,
  CustomLeftArrow,
  CustomRightArrow,
} from "./utils/CarouselClient";
import CardProductModel from "@/components/Product/CardProductModel";

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

interface MayAlsoLikeProps {
  tags: {
    data: {
      id: number;
      attributes: {
        name: string;
        link: string;
      };
    }[];
  };
}

const MayAlsoLike = async ({ tags }: MayAlsoLikeProps) => {
  const query = tags.data.map((item, index) => {
    return `filters[tags][name][${index}]=${item.attributes.name}&`;
  });
  const queryString = query.join("");
  const res = await axios.get(
    `http://localhost:1337/api/products?populate[dp][fields][0]=url&populate[dp][fields][1]=width&populate[dp][fields][2]=height&populate[dp][fields][3]=formats&fields[0]=createdAt&fields[1]=name&fields[2]=price&fields[3]=uid&fields[4]=discount&${queryString}&pagination[pageSize]=20&pagination[page]=1`
  );
  const productsData: ApiResponse = res.data;
  console.log(productsData);
  

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
      customLeftArrow={<CustomLeftArrow />}
      // containerClass="carousel-container"
    >
      {productsData.data.map((item, index) => (
        <div key={index} className="mx-1">
          <CardProductModel product={item} />
        </div>
      ))}
    </CarouselComp>
  );
};

export default MayAlsoLike;
