import PropTypes from "prop-types";
import { useState } from "react";

function Carrousel({ pictures }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPictures = pictures.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPictures);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalPictures - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carrousel">
      <img
        className="carrousel__img"
        src={pictures[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
      />
      {totalPictures != 1 ?
      <img
        className="carrousel__arrow left"
        src="/src/assets/icons/arrow-left.svg"
        alt="Carrousel Arrow left"
        onClick={handlePrev}
      /> : ""}
      {totalPictures != 1 ?
      <img
        className="carrousel__arrow right"
        src="/src/assets/icons/arrow-right.svg"
        alt="Carrousel Arrow right"
        onClick={handleNext}
      /> : ""}
      {totalPictures != 1 ?
      <p className="carrousel__counter">
        <span className="active-view">{currentIndex + 1}</span>/
        <span className="total-view">{totalPictures}</span>
      </p> : ""}
        
    </div>
  );
}

Carrousel.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Carrousel;
