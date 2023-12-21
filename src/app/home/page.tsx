import Navigation from "@/components/Navigation";
import Canvas from "./components/canvas/Canvas";
import Featured from "./components/featured/Featured";

const Page = () => {
  return (
    <>
      <Navigation />
      <section className="w-full flex flex-col flex-1 items-center ">
        <div className="page-style-container">
          <Canvas />
          <Featured />
        </div>
      </section>
    </>
  );
};
export default Page;
