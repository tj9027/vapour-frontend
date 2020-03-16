import React from 'react';
import '../../styles/game-styles/gamecard.css';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
	return (
		<div className="game-card__container">
			<div className="game-card__image-container">
				<img className="game-card__image" src={game.image} alt={game.name} />
			</div>
			<div className="game-card__details-container">
				<h2 className="game-card__details-title">{game.name}</h2>
				<h4>How to Play:</h4>
				<p className="game-card__details-how-to">
					{game.description}
				</p>
				<Link
					to={`/game/${game.id}`}
					className="button game-card__button">
					<span>
						Play
					</span>
				</Link>
			</div>
		</div>
	)
};

export default GameCard;