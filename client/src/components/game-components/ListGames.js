import React from 'react';
import gamesList from '../../mocks/gameslist';
import GameCard from './GameCard';
import '../../styles/game-styles/listgames.css';

const ListGames = () => {
	const randomNumber = () => Math.floor(Math.random() * 10000);
	const gamesToComponent = gamesList.map(game => <GameCard game={game} key={randomNumber()} />);

	return (
		<div className="list-games__container">
			{gamesToComponent}
		</div>
	)
};

export default ListGames;