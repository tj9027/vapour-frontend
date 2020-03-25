import React, { useEffect, useState } from "react";
import "./styles/App.css";
import { useSelector, useDispatch } from "react-redux";
import Main from "./components/main-components/Main";
import Navigation from "./components/main-components/Navigation";
import Footer from "./components/main-components/Footer";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import SocialMain from "./components/chat-players-components/SocialMain";
import GameScreen from "./components/game-components/GameScreen";
import Profile from "./components/profile-components/Profile";
import { firstSocketLogin } from "./redux/actions/socket-actions";

import Forum from "./components/chat-players-components/chat-components/Forum";

function App({ socket }) {
  const currentUser = useSelector(({ loginReducer }) => loginReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser._id.length) {
      dispatch(firstSocketLogin(currentUser._id, socket));
    }
    console.log("just rendered app");
  }, [currentUser._id, dispatch]);

  if (currentUser._id.length !== 0) {
    return (
      <Router>
        <div className="App">
          <Navigation currentUser={currentUser} socket={socket} />
          <Switch>
            <Route exact path="/app" component={Main} />
            <Route
              exact
              path="/messages"
              component={() => (
                <SocialMain currentUser={currentUser} socket={socket} />
              )}
            />
            <Route exact path="/game/:id">
              <GameScreen />
            </Route>
            <Route
              exact
              path="/forum"
              component={() => (
                <Forum currentUser={currentUser} socket={socket} />
              )}
            />
            <Route exact path="/profile" component={Profile} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  } else return null;
}

export default App;
