"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadCrumb = () => {
  const pathName = usePathname();
  const asPathWithoutQuery = pathName.split("/").filter((v) => v.length > 0);

  const tempCrumbList = asPathWithoutQuery.map((subPath, index) => {
    const href = "/" + asPathWithoutQuery.slice(0, index + 1).join("/");
    const title = subPath;
    if (index === asPathWithoutQuery.length - 1) {
      return { title };
    }
    return { href, title };
  });

  const crumbList = [{ href: "/", title: "Home" }, ...tempCrumbList];

  console.log(pathName);

  console.log(asPathWithoutQuery);

  return (
    <section className="w-full flex flex-col flex-1 items-center ">
      <div className="page-style-container px-4 py-2">
        <div className="text-sm breadcrumbs">
          <ul>
            {crumbList.map((item, index) => (
              <>
                {item.title && item.href ? (
                  <li key={index}>
                    <Link href={`${item.href}`}>{item.title}</Link>
                  </li>
                ) : (
                  <li key={index}>{item.title}</li>
                )}
              </>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default BreadCrumb;
