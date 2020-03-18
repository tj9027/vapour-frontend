import React from 'react';
import '../../../styles/player-styles/playerlist.css';
import PlayerCard from './PlayerCard';

const PlayerList = ( { user, players, handleShowChat }) => {

	const playerListToComponent = players.map(player => {
		if (player._id !== user._id) return (
			<PlayerCard
				player={player}
				key={player._id}
				handleShowChat={handleShowChat}
			/>
		)
	});

	return (
		<div className="player-list__container">
			<div className="player-list__user-container">
				<div className="toHaveShadow"></div>
				<h3 className={user.status ? "button" : "disabled"}>{user.name}</h3>

				{/* <select
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
				</select> */}
			</div>
			<div className="player-list__list-container">
				{playerListToComponent}
			</div>
		</div>
	)
};

export default PlayerList;