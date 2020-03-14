import React from 'react';
import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';
import MessageList from './MessageList';
import messages from '../../../mocks/chatmessages';
import '../../../styles/chat-styles/chatcontainer.css';


const ChatContainer = () => {
	return (
		<div className="chat__container">
			<ChatHeader />
			<MessageList messages={messages} />
			<ChatForm />
		</div>
	)
};

export default ChatContainer;