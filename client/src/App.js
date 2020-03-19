import React from 'react';
import './styles/App.css';
import Main from './components/main-components/Main';
import Navigation from './components/main-components/Navigation';
import Footer from './components/main-components/Footer';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import SocialMain from './components/chat-players-components/SocialMain';
import GameScreen from './components/game-components/GameScreen';

function App() {

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
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
