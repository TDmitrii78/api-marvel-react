import {Component} from 'react';

import ServiceMarvel from "../../services/ServiceMarvel";
import Spiner from '../spiner/Spiner';
import Error from '../error/Error';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.css';


class CharInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: {
                comics: []
            },
            load: false,
            error: false,
            id: null
        }
    }

    serviceMarvel = new ServiceMarvel();

    load = (id) => {
        this.setState({
            load: true,
            error: false,
            id: id
        })
        return this.serviceMarvel.getRequestCharacter(id);
    }

    loadOk = (res) => {
        this.setState({
            character: res,
            load: false,
            error: false
        });
    }

    loadError = (res) => {
        this.setState({
            load: false,
            error: true
        })
    }

    getCharacter = (id) => {
        this.load(id)
        .then(res => this.loadOk(res))
        .catch(res => this.loadError(res));
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.getCharacter(this.props.id);
        }
    }

    render() {
        const {load, error, character, id} = this.state;

        const skeleton = (id) ? null : <Skeleton/>;
        const errorMes = (error) ? <Error/> : null;
        const spiner = (load) ? <Spiner/> : null;
        const content = (!error && !load && id) ? <Content character={character}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {spiner}
                {errorMes}
                {content}
            </div>
        )
    }
}

const Content = (props) => {
    const {name, thumbnail, homepage, Wiki, description, comics} = props.character;

    let styleImg = {"objectFit": "cover"};
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        styleImg = {"objectFit": "unset"};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="character" style={styleImg}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={Wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">

                {(description !== "") ? description: "Not information"}

            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">

                {(comics.length) ? null : 'Not comics.'}
                {
                    comics.map((el, i) => {
                        if (i < 9) {
                            return <li className="char__comics-item" key={i}>{el.name}</li>
                        }
                        return null
                    })
                }

            </ul>
        </>

    )
}

export default CharInfo;