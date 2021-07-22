import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import TweetDetail from "../routes/TweetDetail";
import Navigation from "./Navigation";


const AppRouter = ({ refreshUser, isLoggedIn , userObj}) => {
    return (
      <Router>
        {/* 💡 Navigation이 존재하려면 isLoggedIn이 true여야 함 */}
        {isLoggedIn && <Navigation userObj={userObj} /> } 
        <Switch>
          {isLoggedIn ? (
            <>
              <Route exact path="/">
                <Home userObj={ userObj } />
              </Route>
              <Route exact path="/profile">
                <Profile userObj={ userObj } refreshUser={ refreshUser } />
              </Route>
              <Route exact path="/tweet/:id">
                <TweetDetail  />
              </Route>
 
            </>
          ) : (
            <>
            <Route exact path="/">
              <Auth />
            </Route>
    
             </>
          )}
        </Switch>
      </Router>
    );
  };
  export default AppRouter;