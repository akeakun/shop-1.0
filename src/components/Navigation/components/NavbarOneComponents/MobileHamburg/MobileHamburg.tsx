import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BadgePercent, Home, Menu, Sparkles, X } from "lucide-react";
import Logo from "../Logo/Logo";
import Link from "next/link";
import Categories from "./components/Categories";
import Tags from "./components/Tags";
import ContactUs from "./components/ContactUs";
import Account from "./components/Account";

interface CategoryItemAttributes {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  link: string;
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

interface TagsItemAttributes {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  link: string;
}

interface TagsItem {
  id: number;
  attributes: TagsItemAttributes;
}

interface TagsPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface TagsMeta {
  pagination: TagsPagination;
}

interface TagsApiResponse {
  data: TagsItem[];
  meta: TagsMeta;
}

const MobileHamburg = async () => {
  try {
    const [cat, tag] = await Promise.all([
      fetch("http://localhost:1337/api/categories"),
      fetch("http://localhost:1337/api/tags"),
    ]);
    const categoriesData: Promise<CategoryApiResponse> = cat.json();
    const tagsData: Promise<TagsApiResponse> = tag.json();
    const tags: TagsApiResponse = await tagsData;
    const categories: CategoryApiResponse = await categoriesData;
    // console.log(categories);
    return (
      <Sheet>
        <SheetTrigger className=" rounded-full hover:bg-gray-800 p-4">
          <Menu />
        </SheetTrigger>
        <SheetContent
          asChild
          className=" bg-mainBg p-0 sm:max-w-[320px] flex flex-col"
          side={"left"}
        >
          <section>
            <div className="h-12 bg-mainNav relative">
              <div className="flex justify-center items-center h-full">
                <Logo />
              </div>
              <SheetClose className="text-buttonText absolute right-4 top-3">
                <X />
              </SheetClose>
            </div>
            <nav className="h-full flex-1 flex flex-col justify-between overflow-hidden">
              <ul className=" flex flex-col gap-2 overflow-y-scroll no-scrollbar">
                <li className="">
                  <Link
                    href={"/home"}
                    className="space-x-4 px-4 items-center rounded-lg flex h-10 hover:bg-gray-300 w-full"
                  >
                    <Home />
                    <p>Home</p>
                  </Link>
                </li>
                <li className="">
                  <Link
                    href={"/products?tag=featured"}
                    className="space-x-4 px-4 items-center rounded-lg flex h-10 hover:bg-gray-300 w-full"
                  >
                    <Sparkles />
                    <p>Featured</p>
                  </Link>
                </li>
                <li className="">
                  <Link
                    href={"/products?tag=flash-sale"}
                    className="space-x-4 px-4 items-center rounded-lg flex h-10 hover:bg-gray-300 w-full"
                  >
                    <BadgePercent />
                    <p>Flash Sale</p>
                  </Link>
                </li>
                <Categories categories={categories} />
                {/* <Tags tags={tags} /> */}
              </ul>
              <div className="">
                <ContactUs />
                <Account />
              </div>
            </nav>
          </section>
        </SheetContent>
      </Sheet>
    );
  } catch (error: any) {
    return (
      <>
        <h4>Someting went wrong! PLease refresh the page and try again</h4>
      </>
    );
  }
};
export default MobileHamburg;
