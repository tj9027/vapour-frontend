import React from "react";
import ChatHeader from "./ChatHeader";
import ChatForm from "./ChatForm";
import MessageList from "./MessageList";
import "../../../styles/chat-styles/chatcontainer.css";
// import RtcContainer from '../../rtc-components/RtcContainer';

const ChatContainer = ({
  handleChatSubmit,
  user,
  messages,
  roomid,
  secondUser,
  chatSessionId,
  setChatting
}) => {
  return (
    <div className="chat__container">
      <ChatHeader
        secondUser={secondUser}
        displayStatus={true}
        chatSessionId={chatSessionId}
        setChatting={setChatting}
        justify="space-between"
      />
      <MessageList messages={messages} />
      {/* <RtcContainer /> */}
      <ChatForm
        handleChatSubmit={handleChatSubmit}
        roomid={roomid}
        user={user}
      />
    </div>
  );
};

export default ChatContainer;
