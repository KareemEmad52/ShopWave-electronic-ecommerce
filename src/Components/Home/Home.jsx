import { CarouselDefault } from "./CarouselDefault"
import FeaturedCategory from "./FeaturedCategory"
import FeaturedProducts from "./FeaturedProducts"

function Home() {
  return (
    <>
      <CarouselDefault />
      <FeaturedCategory />
      <FeaturedProducts />
    </>
  )
}

export default Home