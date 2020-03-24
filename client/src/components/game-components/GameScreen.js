import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import gamedb from '../../mocks/gameslist';
import '../../styles/game-styles/gamescreen.css';

const GameScreen = () => {
			{/* <div className="game-screen__header">
  const currentUser = useSelector(({ user }) => user);
  const { id } = useParams();
  const game = gamedb.find(el => el.id == id);
  const frameRef = useRef(null);
  const frameWidth = game.id == 2 ? '500' : '1500'; //a hack to deal with Asteroids being tiny
  return (
    <div className="game-screen__container">
      {/* <div className="game-screen__header">
				<h1>{game ? game.name : 'let\'s play'}</h1>
			</div> */}
      <iframe
        ref={frameRef}
        allow="fullscreen"
        id="gameFrame"
        title="inline frame"
        width={frameWidth}
        height="700"
        src={game.url + '?a=' + currentUser._id + '&b=' + currentUser.password}>
      </iframe>
    </div>
  )
};

export default GameScreen;