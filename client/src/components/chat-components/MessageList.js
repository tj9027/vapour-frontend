import React from 'react';
import ChatMessage from './ChatMessage';


const MessageList = ({ messages }) => {
	const randomNumber = () => Math.floor(Math.random() * 10000);
	const messagesToComponent = messages.map(mes => <ChatMessage message={mes} key={randomNumber()} />);
	return (
		<div>
			hello from MessageList
			{messagesToComponent}
		</div>
	)
};

export default MessageList;