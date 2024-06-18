import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Thumb({id, title, cover}) {
    return (
        <>
        <Link className="thumb" to={`/details/${id}`}>
            <li >
                <h2 className="thumb__title">{title}</h2>
                <img className="thumb__img" src={cover} alt={`${title} cover`} />
            </li>
        </Link>
        </>
    );
}

Thumb.propTypes = {    
    id: PropTypes.string,
    title: PropTypes.string,
    cover: PropTypes.string,
};

export default Thumb;
