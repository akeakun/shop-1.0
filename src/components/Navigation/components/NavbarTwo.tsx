import { links } from "@/lib/demodata";
import axios from "axios";
import Link from "next/link";

interface Product {
  data: any[]; // You may need to define a more specific type based on the actual structure of your products.
}

interface FashionTag {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    link: string;
    special: boolean;
    hide: boolean,
    products: Product;
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

interface TagsData {
  data: FashionTag[];
  meta: Meta;
}


const NavbarTwo = async () => {
  const res = await axios.get("http://localhost:1337/api/tags?populate=*");
  const linksData: TagsData = res.data
  console.log(linksData);
  

  
  return (
    <div className=" overflow-hidden w-full h-full flex justify-center">
      <div className="h-full overflow-x-scroll no-scrollbar scroll-snap-type-x mandatory">
        <nav className=" flex items-center w-fit h-full space-x-2 px-2">
          {linksData.data.map((item, index) => (
            <>
              {!item.attributes.hide && (
                <>
                  {item.attributes.special ? (
                    <div className="" key={index}>
                      <Link href={`/products?tag=${item.attributes.link}`}>
                        <p className=" text-yellow-400 uppercase text-sm md:text-base whitespace-nowrap">
                          {item.attributes.name}
                        </p>
                      </Link>
                    </div>
                  ) : (
                    <div className="" key={index}>
                      <Link href={`/products?tag=${item.attributes.link}`}>
                        <p className=" uppercase text-sm md:text-base whitespace-nowrap">
                          {item.attributes.name}
                        </p>
                      </Link>
                    </div>
                  )}
                  {index < linksData.data.length - 1 && (
                    <span className="h-2/5 w-[3px] rounded-full bg-white"></span>
                  )}
                </>
              )}
            </>
          ))}
        </nav>
      </div>
    </div>
  );
};
export default NavbarTwo;
