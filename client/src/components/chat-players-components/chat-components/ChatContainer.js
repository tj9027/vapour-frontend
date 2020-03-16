import React from 'react';
import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';
import MessageList from './MessageList';
import messages from '../../../mocks/chatmessages';
import '../../../styles/chat-styles/chatcontainer.css';


const ChatContainer = ({ handleChatSubmit, user, messages, secondUser, chatSessionId }) => {
	return (
		<div className="chat__container">
			<ChatHeader secondUser={secondUser} chatSessionId={chatSessionId} />
			<MessageList messages={messages} />
			<ChatForm handleChatSubmit={handleChatSubmit} user={user} />
		</div>
	)
};

export default ChatContainer;