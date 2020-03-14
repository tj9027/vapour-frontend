import React, { useState } from 'react';
import './styles/App.css';
import Main from './components/main-components/Main';
import Navigation from './components/main-components/Navigation';
import Footer from './components/main-components/Footer';
import { Switch, Route, Router } from 'react-router-dom';
import SocialMain from './components/chat-players-components/SocialMain';

function App() {

  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/social">
            <SocialMain />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
