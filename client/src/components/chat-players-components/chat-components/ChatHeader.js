import React from "react";
import "../../../styles/chat-styles/chatheader.css";

const ChatHeader = ({ secondUser, displayStatus, setChatting }) => {
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
      <div className="chat-header__details-container">
        <span>{secondUser.name}</span>
        {displayStatus && (
          <p className="chat-header__status">
            <span className={`chat-header__status-icon ${status()}`}></span>
          </p>
        )}
      </div>
      <button
        className="button chat-header__close-button"
        onClick={e => {
          e.preventDefault();
          setChatting(false);
        }}
      >
        Close
      </button>
    </div>
  );
};

export default ChatHeader;
