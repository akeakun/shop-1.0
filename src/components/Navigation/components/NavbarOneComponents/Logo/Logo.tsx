import Link from "next/link";

const Logo = () => {
  return (
    <Link className="text-xl md:text-2xl font-extrabold uppercase text-gray-300" href={"/"}>
      Ne<span className="text-yellow-500">o</span>n
      <span className="text-blue-500 font-extrabold">Age</span>
    </Link>
  );
};
export default Logo;
