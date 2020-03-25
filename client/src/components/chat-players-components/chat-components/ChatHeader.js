import React from "react";
import "../../../styles/chat-styles/chatheader.css";

const ChatHeader = ({ secondUser, displayStatus, setChatting, justify }) => {
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
    <div className="chat-header__container" style={{ justifyContent: justify }}>
      <div className="chat-header__details-container">
        <span>{secondUser.name}</span>
        {displayStatus && (
          <p className="chat-header__status">
            <span className={`chat-header__status-icon ${status()}`}></span>
          </p>
        )}
      </div>
      {displayStatus && (
        <button
          className="button chat-header__close-button"
          onClick={e => {
            e.preventDefault();
            setChatting(false);
          }}
        >
          X
        </button>
      )}
    </div>
  );
};

export default ChatHeader;
