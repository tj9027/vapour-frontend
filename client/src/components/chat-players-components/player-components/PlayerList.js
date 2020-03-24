import React from "react";
import "../../../styles/player-styles/playerlist.css";
import PlayerCard from "./PlayerCard";
import placeHolderAvatar from "../../../assets/images/placeholder-avatar.svg";

const PlayerList = ({
  currentUser,
  players,
  handleShowCall,
  handleShowChat,
  calling,
  setCalling
}) => {
  console.log(players);
  const playerListToComponent = players.map(player => {
    if (player._id !== currentUser._id)
      return (
        <PlayerCard
          player={player}
          key={player._id}
          handleShowChat={handleShowChat}
          setCalling={setCalling}
          calling={calling}
          handleShowCall={handleShowCall}
        />
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
      <div className="player-list__list-container">{playerListToComponent}</div>
    </div>
  );
};

export default PlayerList;
