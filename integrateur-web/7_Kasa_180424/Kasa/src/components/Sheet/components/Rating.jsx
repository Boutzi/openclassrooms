import PropTypes from "prop-types"
import { useMemo } from "react"
import inactiveStar from "../../../assets/icons/star-inactive.svg"
import activeStar from "../../../assets/icons/star-active.svg"

function Rating({ stars }) {
  const starRating = useMemo(() => Math.min(Math.max(stars, 1), 5), [stars])
  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => (
        <img
          key={index}
          src={index < starRating ? activeStar : inactiveStar}
          alt={`${index < starRating ? "red" : "grey"} star`}
        />
      ))}
    </div>
  )
}

Rating.propTypes = {
  stars: PropTypes.string.isRequired,
}

export default Rating
