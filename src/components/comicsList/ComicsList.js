import { Component} from 'react';

import ServiceMarvel from '../../services/ServiceMarvel';

import './comicsList.css';


class ComicsList extends Component{
    constructor(props) {
        super(props)
        this.state = {
            comics: [],
            startOffset: 30,
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
        .catch(this.loadError());
    }

    loadServ = (offset) => {
        this.setState({
            load: true,
            error: false
        })
        return this.serviceMarvel.getAllComics(offset)
    }

    loadOk = (res) => {
        this.setState({
            load: false,
            error: false,
            comics: [...this.state.comics, ...res.data.results]
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
        console.log("render");
        const content = <Items comics={this.state.comics} onNextComics={this.onNextComics}/>
        return (
            <div className="comics__list">
                {content}
            </div>
        )
    }
}

const Items = (props) => {
    const {comics, onNextComics} = props;
    return (
        <>
            <ul className="comics__grid">
                {
                    comics.map((el, i) => {
                        return (
                            <li 
                                key={i}
                                className="comics__item"
                            >
                                <a href="#">
                                    <img src={el.thumbnail.path + `.` + el.thumbnail.extension} alt="ultimate war" className="comics__item-img"/>
                                    <div className="comics__item-name">{el.title}</div>
                                    <div className="comics__item-price">{el.prices[0].price}$</div>
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
            <button 
                onClick={onNextComics}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </>
    )
}

export default ComicsList;