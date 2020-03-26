import React from 'react';
import '../../../styles/chat-styles/chatmessage.css';

const isToday = dateToCheck => {
  const today = new Date();
  return (
    dateToCheck.getDate() === today.getDate() &&
    dateToCheck.getMonth() === today.getMonth() &&
    dateToCheck.getFullYear() === today.getFullYear()
  );
};
const ChatMessage = ({ message }) => {
  const time = isToday(new Date(+message.time))
    ? new Date(+message.time).toLocaleTimeString()
    : new Date(+message.time).toLocaleDateString();
  if (message.senderName) {
    return (
      <div user={message._id} className={`chat-message__container`}>
        <div className="chat-message__divider">
          <span className="chat-message__line-margin">
            {message.senderName}
          </span>
          <span className="chat-message__time-stamp">{time}</span>
        </div>
        <p className="chat-message__line-margin chat-message__message">
          {message.message}
        </p>
      </div>
    );
  } else {
    return null;
  }
};

export default ChatMessage;
