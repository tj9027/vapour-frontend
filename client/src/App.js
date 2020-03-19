import React, { useEffect } from 'react';
import './styles/App.css';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from './redux/actions/current-user-actions';
import Main from './components/main-components/Main';
import Navigation from './components/main-components/Navigation';
import Footer from './components/main-components/Footer';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import SocialMain from './components/chat-players-components/SocialMain';
import GameScreen from './components/game-components/GameScreen';

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const currentUser = useSelector(state => state.currentUser);
  useEffect(() => {
    dispatch(getCurrentUser(sessionUser._id));
  }, [dispatch, sessionUser._id]);

  if (currentUser._id.length !== 0) {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route
              exact
              path="/messages"
              component={SocialMain}
            />
            <Route exact path="/game/:id">
              <GameScreen />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  } else return null;
}

export default App;
