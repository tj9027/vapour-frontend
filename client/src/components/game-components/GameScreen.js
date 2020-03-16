import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import gamedb from '../../mocks/gameslist';
import '../../styles/game-styles/gamescreen.css';
import '../../styles/chat-styles/chatform.css';
import MessageList from '../chat-players-components/chat-components/MessageList';

const GameScreen = ({ user }) => {
	const { id } = useParams();
	const game = gamedb.find(el => el.id == id);

	const [value, setValue] = useState("");
	const [messages, setMessages] = useState([]);

	const onValueChange = (text) => {
		setValue(text);
	}

	return (
		<div className="game-screen__container">
			<div className="game-screen__header">
				<h1 className="game-screen__title">{game.name}</h1>
			</div>
			<div className="game-screen__side-to-side">
				<div className="game-screen__main-container">
					hello from GameScreen 'game canvas here'
				</div>
				{game.multiplayer && <div className="game-screen__chat-container">
					<MessageList messages={messages} />
					<div className="chat-form__container">
						<form
							className="chat-form"
							onSubmit={e => {
								e.preventDefault();
								if (value) {
									setMessages([...messages,
									{
										timeStamp: new Date(),
										id: user.id,
										username: user.username,
										message: value
									}]);
									setValue("");
								}
							}}
						>
							<input
								className="chat-form__input"
								name="message-input"
								type="text"
								placeholder="type message.."
								value={value}
								onChange={e => {
									e.preventDefault();
									onValueChange(e.target.value);
								}}
							/>
							<input
								className="chat-form__submit"
								name="message-send"
								type="submit"
								value="Send"
							/>
						</form>
					</div>
				</div>}
			</div>
		</div>
	)
};

export default GameScreen;