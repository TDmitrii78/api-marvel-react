import { Component } from 'react';
import { useParams, Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import ServiceMarvel from '../../services/ServiceMarvel';
import Spiner from '../spiner/Spiner';
import Error from '../error/Error';

import './singleComicPage.css';


class SingleComic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            comics: null,
            load: false,
            error: false,
            buttonOf: false
        }
    }

    serviceMarvel = new ServiceMarvel();

    loadServ = (id) => {
        this.setState({
            load: true,
            error: false
            })
            return this.serviceMarvel.getComics(id);
    }

    loadOk = () => {
        this.setState({
            load: false,
            error: false,
        })
    }

    loadError = () => {
        this.setState({
            load: false,
            error: true
        })
    }

    getCommics = (id) => {
        this.loadServ(id)
        .then(res => {
            this.setState({
                comics: res.data.results[0]
            });
            this.loadOk();
        })
        .catch(() => this.loadError);
    }
    

    componentDidMount() {
        this.setState({id: this.props.comicsId})
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.id !== this.state.id) {
            this.getCommics(this.state.id);
        }
    }

    render() {
        const {load, error, comics} = this.state;
        const spiner = (load) ? <Spiner/> : null;
        const errorMes = (error) ? <Error/> : null;
        const content = (!load && !error && comics) ? <Content comics={comics}/> : null;

        return (
            <div className="single-comic">
                {content}
                {spiner}
                {errorMes}
            </div>
        )
    }
}

const Content = (props) => {
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
            <Link to='/comics/' className="single-comic__back">Back to all</Link>
        </>
    )
}

const SingleComicPage = () => {
    
    const {comicsId} = useParams();
    return (
        <>
            <SingleComic comicsId={comicsId}/>
        </>
    )
}

Content.propTypes = {
    comics: PropTypes.object
}

export default SingleComicPage;