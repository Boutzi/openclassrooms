import PropTypes from "prop-types"
import Carrousel from "../../components/Sheet/Carrousel"
import Sheet from "../../components/Sheet/Sheet"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getAccomodationDetails } from "../../Services/accomodationServices"

function Details() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  async function initDetails() {
    try {
      const details = await getAccomodationDetails(id)
      if (!details) {
        navigate("/error")
      } else {
        setData(details)
      }
    } catch {
      console.error("Données introuvables: ", error)
      navigate("/error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    initDetails()
  }, [id])

  if (loading) {
    return <p>Loading...</p>
  }

  if (!data) {
    return <p>Data not found</p>
  }

  return (
    <main className="main-content">
      <Carrousel pictures={data.pictures} />
      <Sheet
        title={data.title}
        location={data.location}
        name={data.host?.name}
        tags={data.tags}
        rating={data.rating}
        picture={data.host?.picture}
        description={data.description}
        equipments={data.equipments}
      />
    </main>
  )
}

Details.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
}

export default Details
