import React from 'react';
import ChatMessage from './ChatMessage';
import '../../../styles/chat-styles/messagelist.css';


const MessageList = ({ messages }) => {
	const randomNumber = () => Math.floor(Math.random() * 10000);
	const messagesToComponent = messages && messages.map(mes => <ChatMessage message={mes} key={randomNumber()} />);
	return (
		<div className="message-list__container">
			{messagesToComponent ? messagesToComponent : "no messages"}
		</div>
	)
};

export default MessageList;