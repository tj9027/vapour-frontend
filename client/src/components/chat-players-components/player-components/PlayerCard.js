import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/player-styles/playercard.css";
import chatIcon from "../../../assets/icons/chat-icon.png";
import phoneIcon from "../../../assets/icons/phone-icon.png";
import {
  handleCreateCall,
  handlePickup,
  handleReject,
  handleLeave
} from "../../rtc-components/RtcMain";
import { useSelector } from "react-redux";
import placeHolderAvatar from "../../../assets/images/placeholder-avatar.svg";

const PlayerCard = ({
  player,
  handleShowChat,
  handleShowCall,
  calling,
  setCalling,
  secondUser
}) => {
  const currentUser = useSelector(({ loginReducer }) => loginReducer.user);
  const status = () => (player.status ? "online" : "offline");
  const [connected, setConnected] = useState(false);
  // const [contacted, setContacted] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);
  const [endCall, setEndCall] = useState(false);
  window.setIncomingCall[player._id] = { setIncomingCall };
  window.setEndCall[player._id] = { setEndCall };

  const statusButton = () =>
    player.status ? "button-enabled" : "button-disabled";
  return (
    <div className={`player-card__container ${status()}`}>
      <img
        className="player-card__avatar"
        src={player.avatar ? player.avatar : placeHolderAvatar}
        alt={player.name.charAt(0)}
      />
      <div className="player-card__player-name-container">
        <p className="player-card__player-name">{player.name}</p>
      </div>
      <div className="player-card__buttons-container">
        {" "}
        <Link
          className={`player-card__button ${statusButton()}`}
          onClick={e => {
            e.preventDefault();
            player.status > 0 && handleShowChat(player);
          }}
          to={`/messages/?name=${player.name}`}
        >
          <img
            className="player-card__icon"
            src={chatIcon}
            alt="player-thumbnail"
          ></img>
        </Link>
        <div
          className={`player-card__button call`}
          onClick={e => {
            e.preventDefault();
            setCalling(true);
            handleShowCall(player);
            handleCreateCall(player, currentUser);
          }}
        >
          <img
            className="player-card__icon"
            src={phoneIcon}
            alt="player-thumbnail"
          />
        </div>
        {incomingCall && !connected && player._id === secondUser._id && (
          <div className="player-card__call-buttons">
            <div
              //should accept connection
              onClick={e => {
                e.preventDefault();
                setConnected(true);
                handlePickup(player, currentUser);
                handleShowCall(player);
                setCalling(true);
              }}
              className={`player-card__button pickup`}
            >
              yes
            </div>
            <div
              //should close connection
              onClick={e => {
                e.preventDefault();
                setCalling(false);
                setConnected(false);
                handleReject();
              }}
              className={"player-card__button reject"}
            >
              no
            </div>
          </div>
        )}
        {calling && endCall && (
          <div
            //should close connection
            onClick={e => {
              e.preventDefault();
              setConnected(false);
              setIncomingCall(null);
              setCalling(false);
              handleLeave();
            }}
            className={"player-card__button end"}
          >
            end
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
