import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import gamedb from '../../mocks/gameslist';
import '../../styles/game-styles/gamescreen.css';

const GameScreen = () => {
	const { id } = useParams();
	const game = gamedb.find(el => el.id == id);
	const frameRef = useRef(null);

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
    					width="1500"
    					height="700"
   						src={game.url}>
</iframe>
		</div>
	)
};

export default GameScreen;