import Navigation from "@/components/Navigation";
import Canvas from "./components/canvas/Canvas";
import Featured from "./components/featured/Featured";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import { MoveRight } from "lucide-react";

const Page = () => {
  return (
    <>
      <Navigation />
      <section className="w-full flex flex-col flex-1 items-center ">
        <div className="page-style-container h-fit">
          <Canvas />
          <Featured />
          <section className="mt-2 p-2 flex justify-center">
            <Link
              href={"/categories"}
              className="flex justify-center items-center space-x-2 w-full max-w-lg bg-button text-buttonText p-2"
            >
              <p>More categories</p>
              <MoveRight />
            </Link>
          </section>
        </div>
      </section>

      <Footer />
    </>
  );
};
export default Page;
