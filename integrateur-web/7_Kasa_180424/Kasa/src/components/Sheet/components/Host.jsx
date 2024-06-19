// import { Link } from 'react-router-dom';
import PropTypes from "prop-types"

function Host({ name, picture }) {
  return (
    <>
      <div className="host">
        <h2 className="host__name">{name}</h2>
        <img className="host__img" src={picture} />
      </div>
    </>
  )
}

Host.propTypes = {
    name: PropTypes.string,
    picture: PropTypes.string,
}

export default Host
