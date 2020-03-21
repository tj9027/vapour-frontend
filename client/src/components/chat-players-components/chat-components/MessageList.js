import React from 'react';
import ChatMessage from './ChatMessage';
import '../../../styles/chat-styles/messagelist.css';
import ScrollToBottom from 'react-scroll-to-bottom';

const MessageList = ({ messages }) => {
  const messagesToComponent =
    messages &&
    messages.map((mes, index) => <ChatMessage message={mes} key={index} />);
    return (
      <ScrollToBottom className="message-list__container">
        {messages.length !== 0 ? messagesToComponent : 'no messages'}
      </ScrollToBottom>
    );
  }

export default MessageList;
