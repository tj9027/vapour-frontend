import React from 'react';
import '../../styles/game-styles/gamecard.css';

const GameCard = ({ game }) => {
	return (
		<div className="game-card__container">
			<div className="game-card__image-container">
				<img className="game-card__image" src={game.image} alt={game.name} />
			</div>
			<div className="game-card__details-container">
				<h4 className="game-card__details-title">{game.name}</h4>
				<h6>How to Play:</h6>
				<p className="game-card__details-how-to">
					{game.description}
				</p>
			</div>
		</div>
	)
};

export default GameCard;