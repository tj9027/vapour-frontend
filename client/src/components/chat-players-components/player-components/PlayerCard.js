import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/player-styles/playercard.css';
import chatIcon from '../../../assets/icons/chat-icon.png';
import phoneIcon from '../../../assets/icons/phone-icon.png';

const PlayerCard = ({ player, handleShowChat }) => {
  const status = () => (player.status ? 'online' : 'offline');
  const statusButton = () =>
    player.status ? 'button-enabled' : 'button-disabled';
  return (
    <div className={`player-card__container ${status()}`}>
      <h4 className="player-card__player-name">{player.name}</h4>
      <Link
        className={`player-card__button ${statusButton()}`}
        onClick={e => {
		  console.log('you clicked!');
		  console.log(player.name)
        //   e.preventDefault();
          player.status > 0 && handleShowChat(player);
        }}
        to={`/messages/?name=${player.name}`}
      >
        <img className="player-card__icon" src={chatIcon} alt="player-thumbnail"></img>
      </Link>

      <div className={`player-card__button button-disabled`}>
        <img className="player-card__icon" src={phoneIcon} alt="player-thumbnail"/>
      </div>
    </div>
  );
};

export default PlayerCard;
