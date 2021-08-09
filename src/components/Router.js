import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import TweetDetail from "../routes/TweetDetail";
import Lock from "../routes/Lock";
import Navigation from "./Navigation";
import './RouterStyle.scss'

const AppRouter = ({ refreshUser, isLoggedIn , userObj}) => {
    return (
      <Router>
        {/* 💡 Navigation이 존재하려면 isLoggedIn이 true여야 함 */}
        {isLoggedIn && <Navigation className="navigation" userObj={userObj} /> } 
        <Switch>
          {isLoggedIn ? (
            <>
              <Route exact path="/">
                <Home userObj={ userObj } />
              </Route>
              <Route exact path="/profile">
                <Profile userObj={ userObj } refreshUser={ refreshUser } />
              </Route>
              <Route path ="/tweet/:id" exact component ={TweetDetail}/>
              <Route path ="/lock" exact component ={Lock}/>
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