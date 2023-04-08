import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundaries from "../errorBoundaries/ErrorBoundaries";

import decoration from '../../resources/img/vision.png';


class App extends Component {
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
            <div className="app">
                <ErrorBoundaries>
                    <AppHeader/>
                </ErrorBoundaries>
                <main>
                    {/* <ComicsList/> */}
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
                </main>
            </div>
        )
    }
}

export default App;