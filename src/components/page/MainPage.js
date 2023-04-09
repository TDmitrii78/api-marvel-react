import { Component } from "react";
import ErrorBoundaries from "../errorBoundaries/ErrorBoundaries";
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

import decoration from '../../resources/img/vision.png';


class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null
        }
    }

    onClickCharacter = (id) => {
        this.setState({id: id});
    }

    render() {
        const {id} = this.state;
        return (
            <>
                <ErrorBoundaries>
                    <RandomChar/>
                </ErrorBoundaries>
                <div className="char__content">
                <ErrorBoundaries>
                    <CharList onClickCharacter={(id) => this.onClickCharacter(id)}/>
                </ErrorBoundaries>
                <ErrorBoundaries>
                    <CharInfo id={id}/>
                </ErrorBoundaries>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </>
        )
    }
}

export default MainPage;