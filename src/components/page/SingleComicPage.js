import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import './singleComicPage.css';

const SingleComicPage = (props) => {
    const {thumbnail, title, description, prices, pageCount, textObjects} = props.comics;

    return (
        <>
          <img src={thumbnail.path + '.' + thumbnail.extension} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description ? description : 'Not information.'}</p>
                <p className="single-comic__descr">{pageCount ? pageCount : 'not information'} pages</p>
                <p className="single-comic__descr">Language: {textObjects.length ? textObjects[0].language : 'not information'}</p>
                <div className="single-comic__price">{prices[0].price ? prices[0].price : `out of stock `}$</div>
            </div>
            <Link to={-1} className="single-comic__back">Back to all</Link>
        </>
    )
}

SingleComicPage.propTypes = {
    comics: PropTypes.object
}

export default SingleComicPage;