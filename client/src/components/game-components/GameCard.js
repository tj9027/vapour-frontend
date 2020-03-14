import React from 'react';
import '../../styles/game-styles/gamecard.css';

const GameCard = ({ game }) => {
	return (
		<div className="game-card__container">
			<img src={game.image} alt={game.name} />
			<h4>{game.name}</h4>
			<p>{game.description}</p>
		</div>
	)
};

export default GameCard;