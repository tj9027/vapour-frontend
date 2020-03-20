import React, { useState, useEffect } from "react";
import MessageList from "./MessageList";
import ChatForm from "./ChatForm";

const handleForumSubmit = message => {
  console.log(message);
};

const Forum = () => {
  const [messages, setMessages] = useState([]);

  return (
    <div>
      <MessageList messages={messages} />
      <ChatForm handleChatSubmit={handleForumSubmit} />
    </div>
  );
};

export default Forum;
