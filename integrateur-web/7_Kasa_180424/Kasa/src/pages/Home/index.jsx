import Banner from "../../components/Banner"
import Gallery from "../../components/Gallery/Gallery"
import background from "../../assets/images/banner-full.jpg"

function Home() {
  return (
    <>
      <main className="main-content">
        <Banner picture={background} title="Chez vous, partout et ailleurs"/>
        <Gallery />
      </main>
    </>
  )
}

export default Home
