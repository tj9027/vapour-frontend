import React from 'react';
import ChatMessage from './ChatMessage';
import '../../styles/chat-styles/messagelist.css';


const MessageList = ({ messages }) => {
	const randomNumber = () => Math.floor(Math.random() * 10000);
	const messagesToComponent = messages.map(mes => <ChatMessage message={mes} key={randomNumber()} />);
	return (
		<div className="message-list__container">
			hello from MessageList
			{messagesToComponent}
		</div>
	)
};

export default MessageList;