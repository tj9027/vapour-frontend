import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MessageList from './MessageList';
import ChatForm from './ChatForm';
import {
  joinRoomById,
  changeConnection,
  disconnectSocket,
  socketPostMessage
} from '../../../redux/actions/socket-actions';

const forumsubjects = ['forum', '#gaming', '#coding', '#careers', '#lifestyle'];

const Forum = ({ location, currentUser, socket }) => {
  const dispatch = useDispatch();
  const [forumPosts, setForumPosts] = useState([]);
  const [forumSubject, setForumSubject] = useState(0);

  useEffect(() => {
    if (currentUser.name.length !== 0) {
      setForumPosts([]);
      dispatch(
        joinRoomById(
          currentUser.name,
          forumsubjects[forumSubject],
          currentUser._id,
          socket,
          () => {}
        )
      );
    }
    return () => {
      dispatch(disconnectSocket(socket));
    };
  }, [location, forumSubject, socket, dispatch, currentUser]);

  useEffect(() => {
    socket.on('message', ({ message }) => {
      setForumPosts([...forumPosts, message]);
    });
  }, [forumPosts, socket]);

  const handleSetForum = e => {
    e.preventDefault();
    dispatch(changeConnection(socket));
    setForumSubject(forumsubjects.indexOf(e.target.value));
  };

  const handleForumSubmit = message => {
    if (message) {
      const messageContent = {
        senderName: currentUser.name,
        message: message,
        time: new Date()
      };
      dispatch(socketPostMessage(messageContent, () => {}, socket));
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
