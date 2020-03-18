import React from 'react';
import ChatMessage from './ChatMessage';
import '../../../styles/chat-styles/messagelist.css';

const MessageList = ({ messages }) => {

  // const randomNumber = () => Math.floor(Math.random() * 10000);
  if (messages.length !== 0) {
    const messagesToComponent =
      messages &&
      messages.messageHistory.map((mes, index) => (
        <ChatMessage message={mes} key={index} />
      ));
    return (
      <div className="message-list__container">
        {messagesToComponent ? messagesToComponent : 'no messages'}
      </div>
    );
  } else {
    return null;
  }
};

export default MessageList;
