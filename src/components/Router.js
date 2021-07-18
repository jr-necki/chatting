import React, { useState } from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";


const AppRouter = ({ isLoggedIn }) => {
    return (
      <Router>
        {/* 💡 Navigation이 존재하려면 isLoggedIn이 true여야 함 */}
        {isLoggedIn && <Navigation/> } 
        <Switch>
          {isLoggedIn ? (
            <>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/profile">
                <Profile />
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