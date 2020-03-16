import React from 'react';
import playerList from '../../../mocks/playerlist';
import '../../../styles/player-styles/playerlist.css';
import PlayerCard from './PlayerCard';

const PlayerList = ({ user, handleShowChat, setUser }) => {
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

				<select
					className="player-list__status-selector"
					value={user.status}
					onChange={e => {
						e.preventDefault();
						setUser(Object.assign({ ...user }, { status: e.target.value }));
					}
					}>
					<option value='1'>online</option>
					<option value='2'>away</option>
					<option value='0'>offline</option>
				</select>
			</div>
			<div className="player-list__list-container">
				{playerListToComponent}
			</div>
		</div>
	)
};

export default PlayerList;