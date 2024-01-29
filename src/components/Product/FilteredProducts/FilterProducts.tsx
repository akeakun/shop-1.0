import { prodData } from "@/lib/temp/demodata"

type FilterProductsTypes = {
data: string
}
const FilterProducts = ({data}: FilterProductsTypes) => {
    const products = prodData.filter((item)=>{
        return item.category === data
    })
    console.log(products);
    
  return (
    <div>FilterProducts</div>
  )
}
export default FilterProducts