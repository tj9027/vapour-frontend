import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import gamedb from '../../mocks/gameslist';
import '../../styles/game-styles/gamescreen.css';

const GameScreen = () => {
  const currentUser = useSelector(({loginReducer}) => loginReducer.user);
  const { id } = useParams();
  const game = gamedb.find(el => el.id == id);
  const frameRef = useRef(null);
  console.log(frameRef)
  const frameWidth = game.id == 2 ? '500' : '1500'; //a hack to deal with Asteroids being tiny
  const frameHeight = game.id == 5 ? '1000' : '700'; 
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
        height={frameHeight}
        src={game.url + '?a=' + currentUser._id + '&b=' + currentUser.password}
      ></iframe>
    </div>
  );
};

export default GameScreen;
