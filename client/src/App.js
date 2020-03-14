import React, { useState } from 'react';
import './styles/App.css';
import Main from './components/main-components/Main';
import Navigation from './components/main-components/Navigation';
import Footer from './components/main-components/Footer';


function App() {
  const [playerNChat, setPlayerNChat] = useState();
  const [showPlayerNChat, setShowPlayerNChat] = useState(false);

  const handleShowPlayersNChat = () => {
    setShowPlayerNChat(true);
  };
  const handlePlayersNChat = (id) => {
    console.log('clicked')
    setPlayerNChat(id);
  };

  return (
    <div className="App">
      <Navigation />
      <Main playerNChat={playerNChat} handlePlayersNChat={handlePlayersNChat} showPlayerNChat={showPlayerNChat} />
      <Footer showPlayersNChat={handleShowPlayersNChat} />
    </div>
  );
}

export default App;
