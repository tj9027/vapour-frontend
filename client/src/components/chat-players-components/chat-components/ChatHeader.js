import React from 'react';
import '../../../styles/chat-styles/chatheader.css';

const ChatHeader = ({ secondUser, chatSessionId }) => {
	console.log(chatSessionId)
	return (
		<div className="chat-header__container">
			{secondUser.username}<br />
			{chatSessionId}
		</div >
	)
};

export default ChatHeader;