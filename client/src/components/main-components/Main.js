import React from 'react';
import '../../styles/main-styles/main.css';
import PlayerList from '../player-components/PlayerList';
import ChatContainer from '../chat-components/ChatContainer';
import ListGame from '../game-components/ListGames';
import Draggable from 'react-draggable';

const Main = ({ playerNChat, handlePlayerNChat, showPlayerNChat }) => {
	const chatOrList = handlePlayerNChat ? <ChatContainer id={playerNChat} /> : <PlayerList handlePlayerNChat={handlePlayerNChat} />;
	return (
		<div className="main__container">
			<Draggable>
				<div className="draggable__container">
					{showPlayerNChat && chatOrList}
				</div>
			</Draggable>
			<ListGame></ListGame>
		</div>
	)
};

export default Main;