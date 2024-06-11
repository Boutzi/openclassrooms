import Thumb from "./Thumb"
import { useState, useEffect } from "react"
import { getAccomodationGallery } from "../../Services/accomodationServices";

function Gallery() {
  const [data, setData] = useState([])

  async function initGallery() {
    setData(await getAccomodationGallery());
  } 

  useEffect(() => {
    initGallery();
  }, [])
  return (
    <>
      <ul className="gallery">
        {data &&
          data.length > 0 &&
          data.map((item) => <Thumb key={item.id} id={item.id} title={item.title} cover={item.cover}/>)}
      </ul>
    </>
  )
}

export default Gallery
