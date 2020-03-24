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
  const [loggedInUsers, setLoggedInUsers] = useState([]);

  useEffect(() => {
    console.log(loggedInUsers);
    if (currentUser._id.length !== 0) {
      dispatch(
        firstSocketLogin(currentUser._id, socket, users =>
          setLoggedInUsers([...users])
        )
      );
    }
    socket.on("updateUsers", data => console.log(data));
  }, [currentUser._id, dispatch, socket]);

  if (currentUser._id.length !== 0) {
    return (
      <Router>
        <div className="App">
          <Navigation currentUser={currentUser} socket={socket} />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route
              exact
              path="/messages"
              component={() => (
                <SocialMain
                  loggedInUsers={loggedInUsers}
                  currentUser={currentUser}
                  socket={socket}
                />
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
