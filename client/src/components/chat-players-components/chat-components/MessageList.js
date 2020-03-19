import React from 'react';
import ChatMessage from './ChatMessage';
import '../../../styles/chat-styles/messagelist.css';

const MessageList = ({ messages }) => {
  console.log(messages.length)
  const messagesToComponent =
    messages &&
    messages.map((mes, index) => (
      <ChatMessage message={mes} key={index} />
    ));

  return (
    <div className="message-list__container">
      {messages.length !== 0 ? messagesToComponent : 'no messages'}
    </div>
  );
};

export default MessageList;
