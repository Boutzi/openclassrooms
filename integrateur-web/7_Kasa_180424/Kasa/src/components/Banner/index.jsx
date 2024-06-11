import PropTypes from "prop-types"

function Banner({ picture, title }) {
  return (
    <div className="banner">
        <img className={`banner__img ${title ? "banner__img__title" : ""}`} src={picture} alt="Montagnes rocheuses en bord de mer" />
        <h1 className="banner__title">{title}</h1>
    </div>
  )
}

Banner.propTypes = {
  picture: PropTypes.string.isRequired,
  title: PropTypes.string
}

export default Banner
