"use client";

import AdminHeaders from "./components/AdminHeaders";
import Categories from "./components/Categories/Categories";
import Orders from "./components/Orders/Orders";
import Products from "./components/Products/Products";
import StaticImages from "./components/StaticImages/StaticImages";
import Tags from "./components/Tags/Tags";

type PageTypes = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const AdminPanel = ({ searchParams }: PageTypes) => {
  const currentPage = searchParams.page;
  return (
    <>
      <AdminHeaders searchParams={searchParams} />
      {currentPage === "Orders" && <Orders />}
      {currentPage === "Products" && <Products />}
      {currentPage === "Categories" && <Categories />}
      {currentPage === "Tags" && <Tags />}
      {currentPage === "Static-Images" && <StaticImages />}
    </>
  );
};

export default AdminPanel;
