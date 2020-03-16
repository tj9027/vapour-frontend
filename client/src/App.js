import React, { useState } from 'react';
import './styles/App.css';
import Main from './components/main-components/Main';
import Navigation from './components/main-components/Navigation';
import Footer from './components/main-components/Footer';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import SocialMain from './components/chat-players-components/SocialMain';
import players from './mocks/playerlist';

function App() {
  const [user, setUser] = useState(players[0]);

  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/social">
            <SocialMain user={user} setUser={setUser} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
