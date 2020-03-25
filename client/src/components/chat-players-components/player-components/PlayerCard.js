import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/player-styles/playercard.css';
import chatIcon from '../../../assets/icons/chat-icon.png';
import phoneIcon from '../../../assets/icons/phone-icon.png';
import { handleCreateCall, handlePickup, handleReject, handleLeave } from '../../rtc-components/RtcMain';
import { useSelector, useDispatch } from 'react-redux';


const PlayerCard = ({ player, handleShowChat, handleShowCall, calling, setCalling }) => {
  
  const currentUser = useSelector(state => state.currentUser);
  const sessionUser = useSelector(state => state.session.user);
  const status = () => (player.status ? 'online' : 'offline');
  const [connected, setConnected] = useState(false);
  const [contacted, setContacted] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);
  // short-cut to refactoring whole front-end
  // window.setIncomingCall = setIncomingCall

  window.setIncomingCall[player._id] = {setIncomingCall}; 

  const statusButton = () =>
    player.status ? 'button-enabled' : 'button-disabled';

    console.log('incomingCall', incomingCall)
    console.log('player object', player)

  return (
    <div className={`player-card__container ${status()}`}>
      <div className="player-card__player-name-container">
        <h4 className="player-card__player-name">{player.name}</h4>
      </div>
      <div className="player-card__buttons-container"> <Link
        className={`player-card__button ${statusButton()}`}
        onClick={e => {
          e.preventDefault();
          player.status > 0 && handleShowChat(player);
        }}
        to={`/messages/?name=${player.name}`}
      >
        <img className="player-card__icon" src={chatIcon} alt="player-thumbnail"></img>
      </Link>

        {/* here below are the call buttons */}

{/* CREATES A CALL REQUEST */}
        <div
          className={`player-card__button call`}
          onClick={e => {
            e.preventDefault();
            setCalling(true);
            handleShowCall(player);
            // handleCreateCall starts webcam & RTCConnection for user1
            handleCreateCall(player, currentUser)
          }}
        >
          <img className="player-card__icon" src={phoneIcon} alt="player-thumbnail" />
        </div>

{/* REMOVES CALL BUTTON, ADDS PICKUP/REJECT, ON INCOMING CALL */}
        { incomingCall &&
          <div
            className="player-card__call-buttons"
            >
            <div
              //should accept connection
              onClick={e => {
                e.preventDefault();
                setConnected(true);
                // handle
                handlePickup(player, currentUser)
                setCalling(true)
              }}
              className={`player-card__button pickup`}>
              pickup
        </div>
            <div
              //should close connection
              onClick={e => {
                e.preventDefault();
                setCalling(false);
                setConnected(false);
                handleReject()
              }}
              className={'player-card__button reject'}>
              reject
            </div>
          </div>
        }
        {connected &&
          <div
            //should close connection
            onClick={e => {
              e.preventDefault();
              setConnected(false);
              setCalling(false);
              handleLeave()
            }}
            className={'player-card__button end'}>
            end call
          </div>
        }
      </div>
    </div>
  );
};

export default PlayerCard;
