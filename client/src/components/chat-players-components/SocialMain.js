import React from 'react';
import PlayerList from './player-components/PlayerList';
import ChatContainer from './chat-components/ChatContainer';

const SocialMain = () => {
	return (
		<div className="social-main__container">
			<PlayerList />
			<ChatContainer />
		</div>
	)
};

export default SocialMain;