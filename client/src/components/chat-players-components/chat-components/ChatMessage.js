import React from 'react';
import '../../../styles/chat-styles/chatmessage.css';
import moment from 'moment';

const ChatMessage = ({ message }) => {
	const time = new Date(+message.time * 1000).toLocaleTimeString();
	if (message.senderName) {
		return (
			<div user={message._id} className={`chat-message__container`}>
				<div className="chat-message__divider">
					<span className="chat-message__line-margin">{message.senderName}</span>
					<span className="chat-message__time-stamp">{time}</span>
				</div>
				<p className="chat-message__line-margin chat-message__message">
					{message.message}
				</p>
			</div>
		)
	} else {
		return null
	}
}


export default ChatMessage;