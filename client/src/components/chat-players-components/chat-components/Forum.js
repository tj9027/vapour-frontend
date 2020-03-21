import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MessageList from './MessageList';
import ChatForm from './ChatForm';
import { useSelector } from 'react-redux';
// import "../../../styles/chat-styles/forum.css";

let socket;
const ENDPOINT = 'http://localhost:4000/';

const Forum = ({ location }) => {
  const [forumPosts, setForumPosts] = useState([]);

  const currentUser = useSelector(({ currentUser }) => currentUser);

  useEffect(() => {
    socket = io(ENDPOINT);
    if (currentUser.name.length !== 0) {
      socket.emit('join', currentUser.name, 'forum', currentUser._id, () => {});
    }
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location]);

  useEffect(() => {
    socket.on('message', ({message}) => {
      setForumPosts([...forumPosts, message]);
    });
  }, [forumPosts]);

  const handleForumSubmit = message => {
    if (message) {
      socket.emit('message', {senderName: currentUser.name, message: message, time: new Date()}, () => {});
    }
  };

  if (currentUser.name.length !== 0) {
    return (
      <div className="forum__container">
        <MessageList messages={forumPosts} />
        <ChatForm handleChatSubmit={handleForumSubmit} />
      </div>
    );
  } else return null;
};

export default Forum;
