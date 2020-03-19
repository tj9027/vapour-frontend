import React from 'react';
import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';
import MessageList from './MessageList';
import '../../../styles/chat-styles/chatcontainer.css';


const ChatContainer = ({ handleChatSubmit, user, messages, setMessage, message, roomid, secondUser, chatSessionId }) => {
	
	return (
		<div className="chat__container">
			<ChatHeader secondUser={secondUser} chatSessionId={chatSessionId} />
			<MessageList messages={messages} />
			<ChatForm handleChatSubmit={handleChatSubmit} roomid={roomid} setMessage={setMessage} message={message} user={user} />
		</div>
	)
};

export default ChatContainer;