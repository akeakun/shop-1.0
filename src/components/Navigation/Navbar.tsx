import NavbarOne from "./components/NavbarOne";
import NavbarTwo from "./components/NavbarTwo";

const Navbar = () => {
  return (
    <nav className="w-full h-fit sticky top-0 left-0 z-[49]">
      <section className=" w-full h-14 md:h-14 flex justify-center bg-mainNav text-buttonText">
        <div className="page-style-container h-full">
          <NavbarOne />
        </div>
      </section>
      <section className=" w-full h-10 md:h-12 flex justify-center bg-secNav text-buttonText">
        <div className="page-style-container w-full h-full">
          <NavbarTwo />
        </div>
      </section>
    </nav>
  );
};
export default Navbar;
