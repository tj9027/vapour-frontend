import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MessageList from './MessageList';
import ChatForm from './ChatForm';
import { useSelector } from 'react-redux';
// import "../../../styles/chat-styles/forum.css";

let socket;
const ENDPOINT = 'http://localhost:4000/';
const forumsubjects = ['forum', '#gaming', '#coding', '#careers', '#lifestyle'];

const Forum = ({ location }) => {
  const [forumPosts, setForumPosts] = useState([]);
  const [forumSubject, setForumSubject] = useState(0);

  const currentUser = useSelector(({ user }) => user);
  useEffect(() => {
    // console.log(forumsubjects[forumSubject])
    if (socket) {
      socket.disconnect();
    }
    if (currentUser.name.length !== 0) {
      setForumPosts([]);
      socket = io(ENDPOINT);
      socket.emit(
        'join',
        currentUser.name,
        forumsubjects[forumSubject],
        currentUser._id,
        () => {}
      );
    }
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location, forumSubject]);

  useEffect(() => {
    socket.on('message', ({ message }) => {
      setForumPosts([...forumPosts, message]);
    });
  }, [forumPosts]);

  const handleSetForum = e => {
    e.preventDefault();
    setForumSubject(forumsubjects.indexOf(e.target.value));
  };

  const handleForumSubmit = message => {
    if (message) {
      socket.emit(
        'message',
        { senderName: currentUser.name, message: message, time: new Date() },
        () => {}
      );
    }
  };

  if (currentUser.name.length !== 0) {
    return (
      <>
        <div className="subjects-container">
          {forumsubjects.map(subject => (
            <button key={subject} value={subject} onClick={handleSetForum}>
              {subject}
            </button>
          ))}
        </div>
        <div className="forum__container">
          <MessageList messages={forumPosts} />
          <ChatForm handleChatSubmit={handleForumSubmit} />
        </div>
      </>
    );
  } else return null;
};

export default Forum;
