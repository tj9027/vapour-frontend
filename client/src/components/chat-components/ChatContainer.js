import React from 'react';
import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';
import MessageList from './MessageList';

const ChatContainer = () => {
	return (
		<div>
			hello from ChatContainer
			<ChatHeader />
			<MessageList />
			<ChatForm />
		</div>
	)
};

export default ChatContainer;