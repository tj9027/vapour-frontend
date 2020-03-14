import React from 'react';
import '../../../styles/chat-styles/chatmessage.css';

const ChatMessage = ({ message }) => {
	const who = () => message.id === 1 ? "me" : "you";
	return (
		<div user={message.id} className={`chat-message__container ${who()}`}>
			<h5>{message.username}</h5>
			<p>
				{message.message}
			</p>
		</div>
	)
}


export default ChatMessage;