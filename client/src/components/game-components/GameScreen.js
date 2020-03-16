import React from 'react';
import { useParams } from 'react-router-dom';
import gamedb from '../../mocks/gameslist';

const GameScreen = () => {
	const { id } = useParams();
	const game = gamedb.find(el => el.id == id);
	return (
		<div>
			<div className="game-screen__header">
				<h1>{game.name}</h1>
			</div>
			hello from GameScreen
		</div>
	)
};

export default GameScreen;