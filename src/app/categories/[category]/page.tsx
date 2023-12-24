import BreadCrumb from "@/components/BreadCrumb/BreadCrumb"
import Footer from "@/components/Footer/Footer"
import Navigation from "@/components/Navigation"
import FilterProducts from "@/components/Product/FilteredProducts/FilterProducts"

type PageTypes = {
    params: {
        category: string
    }
}

const Page = ({params}: PageTypes) => {
    
  return (
    <>
    <Navigation/>
    <BreadCrumb/>
    <FilterProducts data={params.category}/>
    <Footer/>
    </>
  )
}
export default Page