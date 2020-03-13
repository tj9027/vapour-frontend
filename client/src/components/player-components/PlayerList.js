import React from 'react';
import playerList from '../../mocks/playerlist';
import '../../styles/player-styles/playerlist.css';
import PlayerCard from './PlayerCard';

const PlayerList = () => {
	const randomNumber = () => Math.floor(Math.random() * 10000);
	const playerListToComponent = playerList.map(player => <PlayerCard player={player} key={randomNumber()} />);
	return (
		<div className="player-list__container">
			hello from PlayerList
			{playerListToComponent}
		</div>
	)
};

export default PlayerList;