import NavbarOne from "./components/NavbarOne";
import NavbarTwo from "./components/NavbarTwo";

const Navbar = () => {
  return (
    <nav className="w-full h-fit sticky">
      <section className=" w-full h-12 md:h-14 flex justify-center bg-mainNav text-buttonText">
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
