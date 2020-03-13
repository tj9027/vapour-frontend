import React from 'react';
import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';
import MessageList from './MessageList';
import messages from '../../mocks/chatmessages';


const ChatContainer = () => {
	return (
		<div>
			hello from ChatContainer
			<ChatHeader />
			<MessageList messages={messages} />
			<ChatForm />
		</div>
	)
};

export default ChatContainer;