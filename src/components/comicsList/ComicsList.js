import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Component} from 'react';

import ServiceMarvel from '../../services/ServiceMarvel';
import Spiner from '../spiner/Spiner';
import Error from '../error/Error';

import './comicsList.css';
import { Link } from 'react-router-dom';


class ComicsList extends Component{
    constructor(props) {
        super(props)
        this.state = {
            comics: [],
            startOffset: 8,
            offset: null,
            load: false,
            error: false,
            buttonOff: false
        }
    }

    serviceMarvel = new ServiceMarvel();

    getAllComics = (offset) => {
        this.loadServ(offset)
        .then(res => this.loadOk(res))
        .catch(this.loadError);
    }

    loadServ = (offset) => {
        this.setState({
            load: true,
            error: false
        })
        return this.serviceMarvel.getAllComics(offset);
    }

    loadOk = (res) => {
        this.setState({
            load: false,
            error: false,
            comics: [...this.state.comics, ...res.data.results],
            buttonOff: (res.data.results.length < 8) ? true : false
        })
    }

    loadError = () => {
        this.setState({
            load: false,
            error: true
        })
    }

    componentDidMount() {
        this.setState({
            offset: this.state.startOffset
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.offset !== this.state.offset) {
            this.getAllComics(this.state.offset);
        }
    }

    onNextComics = () => {
        this.setState({
            offset: this.state.offset + 8
        })
    }

    render() {
        const {load, error} = this.state;

        const spiner = (load) ? <Spiner/> : null;
        const errorMes = (error) ? <Error/> : null;
        const content = <Items 
                            load={this.state.load}
                            comics={this.state.comics} 
                            onNextComics={this.onNextComics}
                            buttonOff={this.state.buttonOff}
                        />
        return (
            <div className="comics__list">
                {content}
                {spiner}
                {errorMes}
            </div>
        )
    }
}

const Items = (props) => {
    const {comics, onNextComics, buttonOff, load} = props;
    return (
        <>
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {
                        comics.map((el, i) => {
                            return (
                                <CSSTransition key={i} timeout={500} classNames="comics__item">
                                    <li 
                                        key={i}
                                        className="comics__item"
                                    >
                                        <Link to={`/comics/${el.id}`}>
                                            <img src={el.thumbnail.path + `.` + el.thumbnail.extension} alt="ultimate war" className="comics__item-img"/>
                                            <div className="comics__item-name">{el.title}</div>
                                            <div className="comics__item-price">{el.prices[0].price}$</div>
                                        </Link>
                                    </li>
                                </CSSTransition>
                            )
                        })
                    }
                </TransitionGroup>
            </ul>
            <button 
                style={(buttonOff || load) ? {"display": "none"} : {"display": "block"}}
                onClick={onNextComics}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </>
    )
}

export default ComicsList;