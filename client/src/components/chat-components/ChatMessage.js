import React from 'react';

const ChatMessage = ({ message }) => {
	return (
		<div user={message.id}>
			<h5>{message.username}</h5>
			<p>
				{message.message}
			</p>
		</div>
	)
}


export default ChatMessage;