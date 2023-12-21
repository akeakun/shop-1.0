import BreadCrumb from "@/components/BreadCrumb/BreadCrumb"
import Navigation from "@/components/Navigation"

const page = () => {
  return (
    <>
    <Navigation/>
    <BreadCrumb/>
    <section className="w-full flex flex-col flex-1 items-center ">
        <div className="page-style-container">Category page</div>
      </section>
    </>
  )
}
export default page