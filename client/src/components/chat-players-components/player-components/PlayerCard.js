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
          e.preventDefault();
          player.status > 0 && handleShowChat(player);
        }}
        to={`/messages/?name=${player.name}`}
      >
        <img className="player-card__icon" src={chatIcon} alt="player-thumbnail"></img>
      </Link>

      <div className={`player-card__button button-disabled`}>
<<<<<<< HEAD
        {/* /////////////////////////////////////////////////////////////////////////////////// */}
        {/* flow: 
        caller clicks on call button by a recipient player's name --> sends them an 'offer'
        recipient receives a pop-up somewhere on their screen (somewhere less intrusive? e.g. top-right?) with '${name} is calling you: accept or decline'
        on clicking 'accept', recipient sends caller an 'answer'
        on receiving the answer, rtc connection is made --> window appears (next to chat window?) with caller & recipients camera streams
        --> caller's camera/voice is initiated && recipient's camera/voice is initiated */}
        {/* this is where rtc client logic goes */}
        <img className="player-card__icon" src={phoneIcon} />
=======
        <img className="player-card__icon" src={phoneIcon} alt="player-thumbnail"/>
>>>>>>> 7207ccf674c2996ae94a4c7faa6e5b90e9ae00c1
      </div>
    </div>
  );
};

export default PlayerCard;
