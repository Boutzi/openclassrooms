import PropTypes from "prop-types"
import { useState } from "react";

export function Collapse({ id, label, content, contentList }) {
  const [ isOpen, setIsOpen ] = useState(false);
  return (
    <>
      <article className="tab" key={id}>
        <div id={id} className="tab__label" onClick={() => setIsOpen(!isOpen)}>
          {label}
          <div id={id} className={`tab__label__arrow ${isOpen ? "open" : ""}`}>
            <img src="../src/assets/icons/collapse-arrow.svg" alt="arrow" />
          </div>
        </div>
        <div className={`tab__content ${isOpen ? 'open' : ''}`}>
        {contentList ? (
          <ul>
            {contentList.map((list) => (
              <li key={list}>{list}</li>
            ))}
          </ul>
        ) : (
          <p>{content}</p>
        )}
      </div>
      </article>
    </>
  )
}

Collapse.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    contentList: PropTypes.arrayOf(PropTypes.string),
  };