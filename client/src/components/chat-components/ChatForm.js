import React, { useState } from 'react';

const ChatForm = () => {
	const [value, setValue] = useState("");

	const onValueChange = (text) => {
		setValue(text);
	}
	return (
		<div>
			<form onSubmit={}>
				<input name="message-input" type="text" placeholder="type message.." value={value} onChange={e => { e.preventDefault(); onValueChange(e.target.value) }} />
				<input name="message-send" type="submit" value="Send" />
			</form>
		</div>
	)
};

export default ChatForm;