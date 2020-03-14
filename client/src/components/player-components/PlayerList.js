import React from 'react';
import playerList from '../../mocks/playerlist';
import '../../styles/player-styles/playerlist.css';
import PlayerCard from './PlayerCard';

const PlayerList = ({ handlePlayerNChat }) => {
	const randomNumber = () => Math.floor(Math.random() * 10000);
	const playerListToComponent = playerList.map(player => {
		return (
			<PlayerCard
				player={player}
				key={randomNumber()}
				onClick={e => { e.preventDefault(); handlePlayerNChat(player.id) }}
			/>
		)
	});
	return (
		<div className="player-list__container">
			hello from PlayerList
			{playerListToComponent}
		</div>
	)
};

export default PlayerList;