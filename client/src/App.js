import React from 'react';
import './styles/App.css';
import Main from './components/main-components/Main';
import Navigation from './components/main-components/Navigation';
import Footer from './components/main-components/Footer';
function App() {
  return (
    <div className="App">
      <Navigation />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
