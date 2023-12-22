import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  MapPinned,
  Phone,
  Twitter,
} from "lucide-react";
import Logo from "../Navigation/components/NavbarOneComponents/Logo/Logo";

const Footer = () => {
  return (
    <footer className="w-full h-fit">
      <section className="w-full h-fit bg-mainNav flex justify-center text-gray-300">
        <div className="page-style-container h-fit">
          <div className="h-full w-full flex flex-col lg:flex-row">
            <div className="p-4 md:flex-1">
              <Logo />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
              <div className="w-fit p-4 lg:row-span-1">
                <h1 className="uppercase py-2">services</h1>
                <div className="text-sm md:text-base text-gray-500">
                  <div>
                    <Link href={""}>
                      <p className="hover:underline hover:text-gray-400 font-semibold">
                        How To Order
                      </p>
                    </Link>
                  </div>
                  <div>
                    <Link href={""}>
                      <p className="hover:underline hover:text-gray-400 font-semibold">
                        Return & Exchange
                      </p>
                    </Link>
                  </div>
                  <div>
                    <Link href={""}>
                      <p className="hover:underline hover:text-gray-400 font-semibold">
                        Shipping & Delivery
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-fit p-4 lg:col-start-1 lg:row-start-1 lg:row-span-2">
                <h1 className="uppercase py-2">Outlet</h1>
                <p>Donia, Dhaka, 1236, bangladesh</p>
              </div>
              <div className="flex flex-col items-start p-4 lg:col-start-3 lg:row-span-2 lg:col-span-1 lg:row-start-1">
                <h1 className="uppercase py-2">Get in touch</h1>
                <div className="flex flex-col space-y-1">
                  <div>
                    <Link href={""}>
                      <p className="hover:underline text-sm md:text-base text-gray-500 hover:text-gray-400 font-semibold">
                        Contact us
                      </p>
                    </Link>
                  </div>
                  <div>
                    <p>or</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className=" w-[215px] border border-gray-100 p-2 rounded-md hover:border-special hover:text-special">
                      <Link href={""}>
                        <div className="flex items-center space-x-2">
                          <div>
                            <Mail />
                          </div>
                          <span className="h-8 w-[2px] bg-white block"></span>
                          <div>
                            <p className="text-xs text-gray-500">Mail at</p>
                            <p className="text-white text-sm">
                              neonagebd@gmail.com
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className=" w-[215px] border border-gray-100 p-2 rounded-md hover:border-special hover:text-special">
                      <Link href={""}>
                        <div className="flex items-center space-x-2">
                          <div>
                            <Phone />
                          </div>
                          <span className="h-8 w-[2px] bg-white block"></span>
                          <div>
                            <p className="text-xs text-gray-500">Call us</p>
                            <p className="text-white text-sm">0123456789</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className=" w-[215px] border border-gray-100 p-2 rounded-md hover:border-special hover:text-special hover:text-special">
                      <Link href={""}>
                        <div className="flex items-center space-x-2">
                          <div>
                            <MapPinned />
                          </div>
                          <span className="h-8 w-[2px] bg-white block"></span>
                          <div>
                            <p className="text-xs text-gray-500">
                              Find our store
                            </p>
                            <p className="text-white text-sm">Store Locator</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-start-2 lg:row-start-2 p-4">
              <h1 className="uppercase py-2">Follow our socials</h1>
                <div className="flex space-x-2">
                <Link href={""} className="hover:text-special">
                  <Facebook />
                </Link>
                <Link href={""} className="hover:text-special">
                  <Instagram />
                </Link>
                <Link href={""} className="hover:text-special">
                  <Twitter />
                </Link>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-500 sm:mx-auto lg:my-4" />
          <div className="flex flex-col items-center justify-center p-6 pt-0">
            <div>
              <ol className="flex gap-2">
                <li>
                  <Link
                    href={""}
                    className="text-xs text-gray-500 hover:underline hover:text-gray-400"
                  >
                    Privacy & Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href={""}
                    className="text-xs text-gray-500 hover:underline hover:text-gray-400"
                  >
                    Terms of use
                  </Link>
                </li>
              </ol>
            </div>
            <span className="text-sm text-gray-500 text-center">
              © 2023{" "}
              <a href="https://neonagebd.com/" className="hover:underline">
                NeonAge™
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </section>
    </footer>
  );
};
export default Footer;
