import React from 'react';
import '../../../styles/chat-styles/chatmessage.css';

const ChatMessage = ({ message }) => {

	return (
		<div user={message.id} className={`chat-message__container`}>
			<div className="chat-message__divider">
				<span className="chat-message__line-margin">{message.username}</span>
				<span className="chat-message__time-stamp">{message.timeStamp.toLocaleTimeString()}</span>
			</div>
			<p className="chat-message__line-margin chat-message__message">
				{message.message}
			</p>
		</div>
	)
}


export default ChatMessage;