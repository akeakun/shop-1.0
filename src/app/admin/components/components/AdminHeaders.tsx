import { useRouter } from "next/navigation";
type PageTypes = {
    searchParams: { [key: string]: string | string[] | undefined };
  };
const AdminHeaders = ({ searchParams }: PageTypes) => {
    const currentPage = searchParams.page;
    const router = useRouter();
    const handleRouteChange = (page: string) => {
      router.push(`/admin?page=${page}`);
    };
  return (
    <div className=" overflow-hidden w-full h-full flex justify-center">
      <div className="h-full overflow-x-scroll overflow-y-hidden no-scrollbar scroll-snap-type-x mandatory">
        <nav className=" flex items-center w-fit h-full px-2">
          {/* <nav className="flex justify-center space-x-4 w-full"> */}
          <section
            className={`cursor-pointer ${
              currentPage === "Orders" && " bg-gray-300"
            } relative inline-block whitespace-nowrap min-w-[80px]`}
          >
            <button className="h-full w-full py-4 px-2" onClick={() => handleRouteChange("Orders")}>Orders</button>
          </section>
          <section
            className={`cursor-pointer ${
              currentPage === "Products" && " bg-gray-300"
            } relative inline-block whitespace-nowrap min-w-[80px]`}
          >
            <button className="h-full w-full py-4 px-2" onClick={() => handleRouteChange("Products")}>
              Products
            </button>
          </section>
          <section
            className={`cursor-pointer ${
              currentPage === "Categories" && " bg-gray-300"
            } relative inline-block whitespace-nowrap min-w-[80px]`}
          >
            <button className="h-full w-full py-4 px-2" onClick={() => handleRouteChange("Categories")}>
              Categories
            </button>
          </section>
          <section
            className={`cursor-pointer ${
              currentPage === "Tags" && " bg-gray-300"
            } relative inline-block whitespace-nowrap min-w-[80px]`}
          >
            <button className="h-full w-full py-4 px-2" onClick={() => handleRouteChange("Tags")}>Tags</button>
          </section>
          <section
            className={`cursor-pointer ${
              currentPage === "Static-Images" && " bg-gray-300"
            } relative inline-block whitespace-nowrap min-w-[80px]`}
          >
            <button className="h-full w-full py-4 px-2" onClick={() => handleRouteChange("Static-Images")}>
              Static Images
            </button>
          </section>
          {/* </nav> */}
        </nav>
      </div>
    </div>
  )
}

export default AdminHeaders