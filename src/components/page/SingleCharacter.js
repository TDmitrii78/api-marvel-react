import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import './singleComicPage.css';

const SingleCharacterPage = (props) => {
    const {thumbnail, name, description} = props.char;

    return (
        <>
          <img src={thumbnail.path + '.' + thumbnail.extension} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description ? description : 'Not information.'}</p>
            </div>
            <Link to={-1} className="single-comic__back">Back to all</Link>
        </>
    )
}

SingleCharacterPage.propTypes = {
    char: PropTypes.object
}

export default SingleCharacterPage;