import React, { useState, useEffect } from "react";
import MessageList from "./MessageList";
import ChatForm from "./ChatForm";
import "../../../styles/chat-styles/forum.css";

const handleForumSubmit = message => {
  console.log(message);
};

const Forum = () => {
  const [messages, setMessages] = useState([]);

  return (
    <div className="forum__container">
      <MessageList messages={messages} />
      <ChatForm handleChatSubmit={handleForumSubmit} />
    </div>
  );
};

export default Forum;
