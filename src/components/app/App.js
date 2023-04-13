import { Suspense } from "react";
import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
const ErrorBoundaries = lazy(() => import("../errorBoundaries/ErrorBoundaries"));
const MainPage = lazy(() => import('../page/MainPage'));
const ComicsPage = lazy(() => import("../page/ComicsPage"));
const SingleComicPage = lazy(() => import("../page/SingleComicPage"));
const Page404 = lazy(() => import("../page/404"));

const App = () => {

    return (
        <Router>
            <div className="app">
                <ErrorBoundaries>
                    <AppHeader/>
                </ErrorBoundaries>
                <main>
                    <Suspense fallback={<span>Loading...</span>}>
                        <Routes> 
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path='/comics/:comicsId' element={<SingleComicPage/>}/>
                            <Route path="*"  element={<Page404/>}/>
                        </Routes> 
                    </Suspense>
                </main>
            </div>
        </Router> 
    )
}

export default App;