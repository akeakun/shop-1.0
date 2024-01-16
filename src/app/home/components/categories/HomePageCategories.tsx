import { AspectRatio } from "@/components/ui/aspect-ratio";
import { myImageLoader } from "@/lib/Hooks/client/ImageLoader";
import { clothingCategoriesWithImagesAndTitle } from "@/lib/demodata";
import Image from "next/image";
import Link from "next/link";

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  url: string;
}

interface ImageAttributes {
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    small: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
}

interface ImageData {
  id: number;
  attributes: ImageAttributes;
}

interface Image {
  data: ImageData[];
}

interface CategoryItemAttributes {
  Category: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Link: string;
  Image: Image;
}

interface CategoryItem {
  id: number;
  attributes: CategoryItemAttributes;
}

interface CategoryPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface CategoryMeta {
  pagination: CategoryPagination;
}

interface CategoryApiResponse {
  data: CategoryItem[];
  meta: CategoryMeta;
}

const HomePageCategories = async () => {
  const cat = await fetch(
    "http://localhost:1337/api/categories?populate=Image"
  );
  const categoriesData: Promise<CategoryApiResponse> = cat.json();
  const categories: CategoryApiResponse = await categoriesData;
  return (
    <div className="mt-14">
      <header className="text-center bg-secNav text-buttonText py-2 md:py-4">
        <h2 className="text-xl md:text-2xl font-bold leading-8 uppercase">
          Collections
        </h2>
        <p className="text-sm md:text-base">
          Browse from our list of categories
        </p>
      </header>
      <section className="flex flex-wrap">
        {categories.data.map((item, index) => (
          <Link
            key={index}
            className="w-1/2 p-2 h-fit md:w-1/3 lg:w-1/4 relative"
            href={`/products?category=${item.attributes.Link}`}
          >
            <AspectRatio ratio={8 / 8}>
              <Image
                loader={myImageLoader}
                src={`${item.attributes.Image.data[0].attributes.url}`}
                quality={75}
                alt={""}
                fill
              />
            </AspectRatio>
            <div className="bg-secNav text-buttonText text-center clip-path-category-polygon h-8 md:h-10 w-4/5 absolute top-3/4 transform -translate-y-1/2 right-0 p-1">
              <h3 className="inline-block text-xs md:text-sm align-middle font-semibold">
                {item.attributes.Category}
              </h3>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};
export default HomePageCategories;
