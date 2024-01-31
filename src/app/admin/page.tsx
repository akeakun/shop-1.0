import Header from "@/components/Header/Header";
import AdminPanel from "./components/AdminPanel";

type PageTypes = {
    params: { checkout_id: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };

const page = ({searchParams}: PageTypes) => {
  return (
    <>
      <Header classes="my-0" head="Admin Panel" paragraph="" />
      <AdminPanel searchParams={searchParams}/>
    </>
  );
};

export default page;
