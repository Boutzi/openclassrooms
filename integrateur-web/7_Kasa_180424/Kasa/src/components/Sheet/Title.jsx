// import { Link } from 'react-router-dom';
import PropTypes from "prop-types"

function Title({ title, location }) {
  return (
    <>
      <div className="title">
        <h1 className="title__main">{title}</h1>
        <p className="title__subtitle">{location}</p>
      </div>
    </>
  )
}

Title.propTypes = {
  title: PropTypes.string,
  location: PropTypes.string,
}

export default Title
