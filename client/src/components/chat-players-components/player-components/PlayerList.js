import React from 'react';
import playerList from '../../../mocks/playerlist';
import '../../../styles/player-styles/playerlist.css';
import PlayerCard from './PlayerCard';

const PlayerList = ({ user, handleShowChat }) => {
	const randomNumber = () => Math.floor(Math.random() * 10000);
	const playerListToComponent = playerList.map(player => {
		if (player.id !== user.id) return (
			<PlayerCard
				player={player}
				key={randomNumber()}
				handleShowChat={handleShowChat}
			/>
		)
	});
	return (
		<div className="player-list__container">
			<div className="player-list__user-container">
				<div className="toHaveShadow"></div>
				<h3 className={user.status ? "button" : "disabled"}>{user.username}</h3>
				<p>{user.status ? "online" : "offline"}</p>
			</div>
			<div className="player-list__list-container">
				{playerListToComponent}
			</div>
		</div>
	)
};

export default PlayerList;