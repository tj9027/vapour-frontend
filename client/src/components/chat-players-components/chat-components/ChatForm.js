import React, { useState } from 'react';
import '../../../styles/chat-styles/chatform.css';

const ChatForm = ({ handleChatSubmit, user }) => {
	const [value, setValue] = useState("");

	const onValueChange = (text) => {
		setValue(text);
	}
	return (
		<div className="chat-form__container">
			<form
				onSubmit={e => {
					e.preventDefault();
					if (value) {
						handleChatSubmit(
							{
								timeStamp: new Date().getTime(),
								id: user.id,
								username: user.username,
								message: value
							});
						setValue("");
					}
				}}>
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
	)
};

export default ChatForm;