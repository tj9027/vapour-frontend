import React from 'react';
import '../../styles/player-styles/playercard.css';

const PlayerCard = ({ player }) => {
	const status = () => player.status ? "online" : "offline";
	return (
		<div className={`player-card__container ${status()}`}>
			<h4 className="player-card__player-name">{player.username}</h4>
			{player.status && <div className="player-card__chat-button">open chat</div>}
		</div>
	)
};

export default PlayerCard;