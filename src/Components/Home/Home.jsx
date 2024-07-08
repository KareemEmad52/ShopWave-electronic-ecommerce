import { CarouselDefault } from "./CarouselDefault"
import FeaturedCategory from "./FeaturedCategory"
import FeaturedProducts from "./FeaturedProducts"
import NewsLatter from "./NewsLatter"

function Home() {
  return (
    <>
    <div className="custom-container">
      <CarouselDefault />
      <FeaturedCategory />
      <FeaturedProducts />
    </div>
      <div className="mt-7">
        <NewsLatter/>
      </div>
    </>
  )
}

export default Home