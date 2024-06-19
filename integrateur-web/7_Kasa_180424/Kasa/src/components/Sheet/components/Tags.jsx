// import { Link } from 'react-router-dom';
import PropTypes from "prop-types"

function Tags({ tags }) {
  return (
    <div>
      <ul className="tags">
        {tags.map((tag, index) => (
          <li className="tags__item" key={index}>{tag}</li>
        ))}
      </ul>
    </div>
  )
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Tags
