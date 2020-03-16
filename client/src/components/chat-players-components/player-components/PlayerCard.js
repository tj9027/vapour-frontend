import React from 'react';
import '../../../styles/player-styles/playercard.css';
import chatIcon from '../../../assets/icons/chat-icon.png';
import phoneIcon from '../../../assets/icons/phone-icon.png';

const PlayerCard = ({ player, handleShowChat }) => {
	const status = () => player.status ? "online" : "offline";
	const statusButton = () => player.status ? "button-enabled" : "button-disabled";
	return (
		<div
			className={`player-card__container ${status()}`}
		>
			<h4 className="player-card__player-name">{player.username}</h4>
			<div
				className={`player-card__button ${statusButton()}`}
				onClick={e => { e.preventDefault(); player.status > 0 && handleShowChat(player); }}
			>
				<img
					className="player-card__icon"
					src={chatIcon}
				/>
			</div>
			<div
				className={`player-card__button button-disabled`}>
				<img
					className="player-card__icon"
					src={phoneIcon}
				/>
			</div>
		</div >
	)
};

export default PlayerCard;