import { BadgePercent, Home, Sparkles } from "lucide-react";
import Link from "next/link";

const DesktopNavbar = () => {
  return (
    <nav className="hidden lg:flex space-x-4 px-10">
      <Link
        href={"/home"}
        className="text-lg font-medium after:contents-[''] after:h-[3px] after:w-0 after:absolute after:-bottom-1 after:left-0 after:bg-[#5b89ec] after:rounded-full hover:after:w-full after:transition-all after:duration-300 relative flex items-center space-x-1"
      >
        <Home size={20} />
        <span>Home</span>
      </Link>
      <Link
        href={"/featured"}
        className="text-lg font-medium after:contents-[''] after:h-[3px] after:w-0 after:absolute after:-bottom-1 after:left-0 after:bg-[#5b89ec] after:rounded-full hover:after:w-full after:transition-all after:duration-300 relative flex items-center space-x-1"
      >
        <Sparkles size={20} />
        <span>Featured</span>
      </Link>
      <Link
        href={"/flash-sale"}
        className="text-lg font-medium after:contents-[''] after:h-[3px] after:w-0 after:absolute after:-bottom-1 after:left-0 after:bg-[#5b89ec] after:rounded-full hover:after:w-full after:transition-all after:duration-300 relative flex items-center space-x-1"
      >
        <BadgePercent size={20} />
        <span>Flash sale</span>
      </Link>
      <Link
        href={"/contact-us"}
        className="text-lg font-medium after:contents-[''] after:h-[3px] after:w-0 after:absolute after:-bottom-1 after:left-0 after:bg-[#5b89ec] after:rounded-full hover:after:w-full after:transition-all after:duration-300 relative flex items-center space-x-1"
      >
        <span>Contact Us</span>
      </Link>
    </nav>
  );
};
export default DesktopNavbar;
