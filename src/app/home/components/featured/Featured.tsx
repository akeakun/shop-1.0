import FeaturedProducts from "./components/FeaturedProducts"

const Featured = () => {
  return (
    <div className="p-4">
        <header className="text-center mb-4">
            <h2 className="text-xl font-semibold">Featured Products</h2>
            <p className="text-base font-medium">Products currently on trending and top selling</p>
        </header>
        <section className="flex flex-wrap justify-center gap-1">
            <FeaturedProducts/>
        </section>
    </div>
  )
}
export default Featured