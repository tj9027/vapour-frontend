import React, { useState } from 'react';
import '../../../styles/chat-styles/chatform.css';

const ChatForm = ({ message, setMessage, handleChatSubmit }) => {

  return (
    <div className="chat-form__container">
      <form>
        <input
          className="chat-form__input"
          name="message-input"
          type="text"
          placeholder="type message.."
		  value={message}
		  onChange={e =>{e.preventDefault(); setMessage(e.target.value)}}
        //   onKeyPress={e => {return e.key === 'Enter' ? sendMessage(e) : null}}
        />
       <button className="sendButton" onClick={(e) =>{e.preventDefault(); handleChatSubmit(e)}} >Send</button>
      </form>
    </div>
  );
};

export default ChatForm;
