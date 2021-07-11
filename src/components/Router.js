import React, { useState } from 'react';
import { HashRouter as Router,Route,Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';


const AppRouter = () => {
    const [isLoggedIn,setIsLoggedIn]=useState(true);
    return(
        <Router>
            <Switch>
                {isLoggedIn ? (
                // 💡 fragment: 많은 요소들을 렌더하고 싶을 때 쓰임
                <>
                <Route exact path="/">
                    <Home/>
                </Route >
                </>
                ):(
                <Route exact path="/">
                    <Auth/>
                </Route>
                )}
            </Switch>
        </Router>
    );
}
export default AppRouter;