import DesktopNavbar from "./NavbarOneComponents/DesktopNavbar/DesktopNavbar";
import Logo from "./NavbarOneComponents/Logo/Logo";
import MobileHamburg from "./NavbarOneComponents/MobileHamburg/MobileHamburg";
import SearchBox from "./NavbarOneComponents/SearchBox/SearchBox";
import Cart from "./NavbarOneComponents/WiCart/Cart/Cart";

const NavbarOne = () => {
  return (
    <div className="w-full h-full px-4 py-2 flex justify-between items-center">
      <section className="lg:hidden">
      <MobileHamburg />
      </section>
      <section><Logo /></section>
      <DesktopNavbar />
      <section><Cart/></section>
    </div>
  );
};
export default NavbarOne;
