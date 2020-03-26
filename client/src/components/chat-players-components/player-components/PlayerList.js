import React from "react";
import "../../../styles/player-styles/playerlist.css";
import PlayerCard from "./PlayerCard";
import placeHolderAvatar from "../../../assets/images/placeholder-avatar.svg";

const PlayerList = ({
  secondUser,
  currentUser,
  players,
  handleShowCall,
  handleShowChat,
  handleLeave,
  calling,
  setCalling
}) => {
  window.setIncomingCall = {};
  window.setEndCall = {};

  const playerListToComponent = players.map(player => {
    return (
      player._id !== currentUser._id && (
        <PlayerCard
          player={player}
          key={player._id}
          handleShowChat={handleShowChat}
          setCalling={setCalling}
          calling={calling}
          handleShowCall={handleShowCall}
        />
      )
    );
  });

  return (
    <div className="player-list__container">
      <div className="player-list__user-container">
        <div className="toHaveShadow"></div>
        <img
          className="player-list__avatar"
          src={currentUser.avatar ? currentUser.avatar : placeHolderAvatar}
          alt={currentUser.name.charAt(0)}
        />
        <h3 className={currentUser.status ? "button" : "disabled"}>
          {currentUser.name}
        </h3>

        {/* <select
          className="player-list__status-selector"
          value={currentUser.status}
          onChange={e => {
            e.preventDefault();
            setCurrentUser(
              Object.assign({ ...currentUser }, { status: e.target.value })
            );
            console.log(currentUser);
          }}
        >
          <option value={1}>online</option>
          <option value={2}>away</option>
          <option value={0}>offline</option>
        </select> */}
      </div>
      <div className="player-list__list-container">{playerListToComponent}</div>
    </div>
  );
};

export default PlayerList;
