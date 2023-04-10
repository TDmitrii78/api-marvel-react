import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import ErrorBoundaries from "../errorBoundaries/ErrorBoundaries";
import MainPage from '../page/MainPage';
import ComicsPage from "../page/ComicsPage";
import SingleComicPage from "../page/SingleComicPage";
import Page404 from "../page/404";

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
                      <Route path="*"  element={<Page404/>}/>
                    </Routes> 
                </main>
            </div>
        </Router> 
    )
}

export default App;