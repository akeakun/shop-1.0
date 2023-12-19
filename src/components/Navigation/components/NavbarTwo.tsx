import { links } from "@/lib/demodata";
import Link from "next/link";

const NavbarTwo = () => {
  const linksData = links;
  return (
    <div className=" overflow-hidden w-full h-full flex justify-center">
      <div className="h-full overflow-x-scroll no-scrollbar scroll-snap-type-x mandatory">
        <nav className=" flex items-center w-fit h-full space-x-2 px-2">
          {linksData.map((link: any, index) => (
            <>
              {!link.hide && (
                <>
                  {link.specialcategory ? (
                    <div className="" key={index}>
                      <Link href={`/categories/${link.link}`}>
                        <p className=" text-yellow-400 uppercase text-sm md:text-base whitespace-nowrap">
                          {link.name}
                        </p>
                      </Link>
                    </div>
                  ) : (
                    <div className="" key={index}>
                      <Link href={`/categories/${link.link}`}>
                        <p className=" uppercase text-sm md:text-base whitespace-nowrap">
                          {link.name}
                        </p>
                      </Link>
                    </div>
                  )}
                  {index < links.length - 1 && (
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
