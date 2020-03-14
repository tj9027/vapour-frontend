import React from 'react';
import gamesList from '../../mocks/gameslist';
import GameCard from './GameCard';
import '../../styles/game-styles/listgames.css';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const ListGames = () => {
	const randomNumber = () => Math.floor(Math.random() * 10000);
	const gamesToComponent = gamesList.map(game => <div className="game-card__outer-container"><GameCard game={game} key={randomNumber()} /></div>);



	return (
		<div className="list-games__container">
			<div className="list-games__slider">
				<AwesomeSlider fillParent={true} mobileTouch={true}>
					{gamesToComponent}
				</AwesomeSlider>
			</div>
		</div>
	)
};

export default ListGames;