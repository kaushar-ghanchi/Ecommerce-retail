import BannerCarousel from '../components/BannerCarousel/BannerCarousel'
import InstagramReels from '../components/InstagramReels/InstagramReels'
import NewArrival from '../components/Product/NewArrival'
import ShopByCollection from '../components/ShopByCollection/ShopByCollection'

export default function HomePage() {
  return (
    <>
      <BannerCarousel />

      <ShopByCollection />

      <NewArrival />

      <InstagramReels />
    </>
  )
}
