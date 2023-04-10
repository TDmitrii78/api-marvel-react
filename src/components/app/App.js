import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import ErrorBoundaries from "../errorBoundaries/ErrorBoundaries";
import MainPage from '../page/MainPage';
import ComicsPage from "../page/ComicsPage";
import SingleComicPage from "../page/SingleComicPage";

const App = () => {

    return (
        <Router>
            <div className="app">
                <ErrorBoundaries>
                    <AppHeader/>
                </ErrorBoundaries>
                <main>
                    <Routes> 
                      <Route path="/" element={<MainPage/>}/>
                      <Route path="/comics" element={<ComicsPage/>}/>
                      <Route path='/comics/:comicsId' element={<SingleComicPage/>}/>
                    </Routes> 
                </main>
            </div>
        </Router> 
    )
}

export default App;