import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BadgePercent,
  Headphones,
  Home,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import Logo from "../Logo/Logo";
import Link from "next/link";
import Categories from "./components/Categories";
import Tags from "./components/Tags";
import ContactUs from "./components/ContactUs";
import Account from "./components/Account";

const MobileHamburg = () => {
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
          <ul className="p-4 flex flex-col gap-2 overflow-y-scroll no-scrollbar">
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
                href={"/featured"}
                className="space-x-4 px-4 items-center rounded-lg flex h-10 hover:bg-gray-300 w-full"
              >
                <Sparkles />
                <p>Featured</p>
              </Link>
            </li>
            <li className="">
              <Link
                href={"flash-sale"}
                className="space-x-4 px-4 items-center rounded-lg flex h-10 hover:bg-gray-300 w-full"
              >
                <BadgePercent />
                <p>Flash Sale</p>
              </Link>
            </li>
            <Categories />
            <Tags />
          </ul>
          <div className="p-4">
            <ContactUs />
            <Account />
          </div>
        </nav>
        </section>
      </SheetContent>
    </Sheet>
  );
};
export default MobileHamburg;
