import React, { useEffect } from 'react';
import './styles/App.css';
import { useSelector, useDispatch } from 'react-redux';
import Main from './components/main-components/Main';
import Navigation from './components/main-components/Navigation';
import Footer from './components/main-components/Footer';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import SocialMain from './components/chat-players-components/SocialMain';
import GameScreen from './components/game-components/GameScreen';
import Forum from "./components/chat-players-components/chat-components/Forum";

function App() {
  const user = useSelector(state => state.user);


  if (user._id.length !== 0) {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/messages" component={SocialMain} />
            <Route exact path="/game/:id">
              <GameScreen />
            </Route>
            <Route exact path="/forum" component={Forum} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  } else return null;
}

export default App;
