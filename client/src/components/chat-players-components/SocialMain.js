import React, { useState } from 'react';
import PlayerList from './player-components/PlayerList';
import ChatContainer from './chat-components/ChatContainer';
import '../../styles/socialmain.css';
import chatdb from '../../mocks/chatdb';

const SocialMain = ({ user, setUser }) => {
	const [chatting, setChatting] = useState();
	const [messages, setMessages] = useState();
	let chatSessionId = '';
	const handleChatSubmit = (message) => {
		setMessages([...messages, message])
	}
	const handleShowChat = (secondUser) => {
		chatSessionId = user.chats[secondUser.id];
		if (chatSessionId) setMessages(chatdb[chatSessionId]);
		return (
			setChatting(secondUser)
		)
	}
	return (
		<div className="social-main__container">
			<PlayerList user={user} handleShowChat={handleShowChat} setUser={setUser} />
			{chatting && <ChatContainer
				handleChatSubmit={handleChatSubmit}
				user={user}
				messages={messages}
				chatSessionId={chatSessionId}
				secondUser={chatting}
			/>}
		</div>
	)
};

export default SocialMain;