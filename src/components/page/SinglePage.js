import { Component } from "react";
import { useParams } from "react-router-dom";

import PropTypes from 'prop-types';

import SingleCharacterPage from "./SingleCharacter";
import SingleComicPage from "./SingleComicPage";
import Spiner from "../spiner/Spiner";
import Error from "../error/Error";
import ServiceMarvel from "../../services/ServiceMarvel";

const SinglePage = (props) => {
    const { comicsId, characterName } = useParams();
    const {page} = props;

    return (
        <>
            <Page page={page} comicsId={comicsId} characterName={characterName} />
        </>
    )
}

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            char: null,
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
        this.loadServ();
        this.serviceMarvel.getComics(id)
            .then(res => {
                this.setState({
                    comics: res.data.results[0]
                });
                this.loadOk();
            })
            .catch(() => this.loadError);
    }

    getCharacter = (name) => {
        this.loadServ();
        this.serviceMarvel.getCharacterFromName(name)
            .then(res => {
                this.setState({
                    char: res.data.results[0]
                });
                this.loadOk();
            })
            .catch(() => this.loadError);
    }

    componentDidMount() {
        switch (this.props.page) {
            case 'comics': 
                this.getCommics(this.props.comicsId);
                break;
            case 'character':
                this.getCharacter(this.props.characterName);
                break;
        }
    }

    render() {
        const {load, error, comics, char} = this.state;
        const spiner = (load) ? <Spiner/> : null;
        const errorMes = (error) ? <Error/> : null;
        const content1 = (load || error || !comics) ? null : <SingleComicPage comics={comics}/>;
        const content2 = (load || error || !char) ? null : <SingleCharacterPage char={char}/>;
        return (
            <div className="single-comic">
            {content1}
            {content2}
            {spiner}
            {errorMes}
        </div>
        )
    }
}

SinglePage.propTypes = {
    page: PropTypes.string
}

Page.propTypes = {
    page: PropTypes.string,
    comicsId: PropTypes.string,
    characterName: PropTypes.string
}

export default SinglePage;