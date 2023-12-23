import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import Footer from "@/components/Footer/Footer";
import Navigation from "@/components/Navigation";

const page = () => {
  return (
    <>
      <Navigation />
      <BreadCrumb />
      <section className="w-full flex flex-col flex-1 items-center ">
        <div className="page-style-container h-full">Category page</div>
      </section>
      <Footer/>
    </>
  );
};
export default page;
