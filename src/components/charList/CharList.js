import { Component } from 'react';

import PropTypes from 'prop-types';

import Spiner from '../spiner/Spiner';
import Error from '../error/Error';
import ServiceMarvel from '../../services/ServiceMarvel';

import './charList.css';


class CharList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            load: false,
            error: false,
            startOffset: 210,
            offset: 0,
            buttonOff: false,
        }
    }

    serviceMarvel = new ServiceMarvel();

    load = (offset) => {
        this.setState({
            load: true,
            error: false
        })
        return this.serviceMarvel.getRequestAllCharacter(offset);
    }

    loadOk = (res) => {
        let ended = false;
        if (res.data.results.length < 9) {
            ended = true;
        }
        this.setState(() => ({
            data: [...this.state.data, ...res.data.results],
            load: false,
            error: false,
            buttonOff: ended
        }))
    }

    loadError = (res) => {
        this.setState({
            load: false,
            error: true
        })
    }

    onNextCharacter = () => {       
        this.setState({
            offset: this.state.offset + 9,
        })
    }

    getCharacter = (offset) => {
        this.load(offset)
        .then(res => this.loadOk(res))
        .catch(() => this.loadError())
    }

    componentDidMount() {
        this.setState({
            offset: this.state.startOffset
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.offset !== this.state.offset) {
            localStorage.setItem("offset", this.state.offset);
        }
        if (prevState.data !== this.state.data) {
            localStorage.setItem("data", JSON.stringify(this.state.data));
        }
        if (prevState.offset !== this.state.offset) {
            this.getCharacter(this.state.offset)
        }
    }

    render() {
        const {data, error, load, buttonOff} = this.state;
        const spiner = (load) ? <Spiner/> : null;
        const errorMes = (error) ? <Error/> : null;
        const content = true ? <Content 
                                    load={load}
                                    data={data} 
                                    onNextCharacter={this.onNextCharacter}
                                    onClickCharacter={(id) => this.props.onClickCharacter(id)}
                                    buttonOff={buttonOff}
                                /> : null;
        return (
            <div className="char__list">
                {content}
                {spiner}
                {errorMes}
            </div>
        )
    }
}

class Content extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectId: null
        }
    }

    onClickCharacter = (id) => {
        this.setState({
            selectId: id
        })
        this.props.onClickCharacter(id);
    }

    render() {
        const {data, onNextCharacter, load, buttonOff} = this.props;
        const {selectId} = this.state;
        const character = data.map(el => {

            const characterImg = el.thumbnail.path + '.' + el.thumbnail.extension;

            let className = "char__item";
            if (selectId === el.id) {
                className += ` char__item_selected`;
            }

            let imgStyle = {"objectFit": "cover"};  
            if (characterImg === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = {"objectFit": "unset"};
            }
   
            return (
                <li
                    key={el.id} 
                    className={className}
                    tabIndex={"0"}
                    onClick={() => this.onClickCharacter(el.id)}
                    onKeyDown={event => (event.key === 'Enter') ? this.onClickCharacter(el.id) : null}
                >
                    <img src={characterImg} 
                        style={imgStyle}
                        alt="character foto"/>
                    <div className="char__name">{el.name}</div>
                </li>
            )
        });

        return (
            <>
                <ul className="char__grid">
                    {character}
                </ul>
                <button style={((load || buttonOff) ? {"display" : "none"} : {"display": "block"})}
                    onClick={onNextCharacter}
                    className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </>
        )
    }
}

CharList.propType = {
    onClickCharacter: PropTypes.func
}

Content.propType = {
    data: PropTypes.array,
    onClickCharacter: PropTypes.func,
    onNextCharacter: PropTypes.func,
    buttonOff: PropTypes.bool
}

export default CharList;