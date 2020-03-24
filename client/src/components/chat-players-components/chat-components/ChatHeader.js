import React from "react";
import "../../../styles/chat-styles/chatheader.css";

const ChatHeader = ({ secondUser, displayStatus }) => {
  const status = () => {
    switch (+secondUser.status) {
      case 0:
        return "offline";
      case 1:
        return "online";
      case 2:
        return "away";
      default:
        return "offline";
    }
  };
  return (
    <div className="chat-header__container">
      <p>{secondUser.name}</p>
      {displayStatus && (
        <p className="chat-header__status">
          <span className={`chat-header__status-icon ${status()}`}></span>
        </p>
      )}
    </div>
  );
};

export default ChatHeader;
