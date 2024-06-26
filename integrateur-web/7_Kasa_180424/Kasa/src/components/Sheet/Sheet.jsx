// import { Link } from 'react-router-dom';
import PropTypes from "prop-types"
import Title from "./components/Title"
import Host from "./components/Host"
import Tags from "./components/Tags"
import Rating from "./components/Rating"
import { Collapse } from "../Collapse/Collapse"

function Sheet({
  title,
  location,
  name,
  picture,
  tags,
  rating,
  description,
  equipments,
}) {
  return (
    <>
      <div className="sheet">
        <div className="sheet__top">
          <Title title={title} location={location} />
          <Tags tags={tags} />
        </div>
        <div className="sheet__middle">
          <Host name={name} picture={picture} />
          <Rating stars={rating} />
        </div>
        <div className="sheet__bottom">
          <div className="sheet-collapse">
            <Collapse
              key="Description"
              label="Description"
              content={description}
            />
            <Collapse
              key="Équipements"
              label="Équipements"
              contentList={equipments}
            />
          </div>
        </div>
      </div>
    </>
  )
}

Sheet.propTypes = {
  title: PropTypes.string,
  location: PropTypes.string,
  name: PropTypes.string,
  picture: PropTypes.string,
  description: PropTypes.string,
  equipments: PropTypes.array,
  tags: PropTypes.array,
  rating: PropTypes.string
}

export default Sheet
