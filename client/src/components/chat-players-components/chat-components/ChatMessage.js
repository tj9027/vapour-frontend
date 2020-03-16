import React from 'react';
import '../../../styles/chat-styles/chatmessage.css';

const ChatMessage = ({ message }) => {
	return (
		<div user={message.id} className={`chat-message__container`}>
			<p>{message.timeStamp}</p>
			<h5 className="chat-message__line-margin">{message.username} :</h5>
			<p className="chat-message__line-margin chat-message__message">
				{message.message}
			</p>
		</div>
	)
}


export default ChatMessage;