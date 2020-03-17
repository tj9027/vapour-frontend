import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';
import PlayerList from './player-components/PlayerList';
import ChatContainer from './chat-components/ChatContainer';
import '../../styles/socialmain.css';
import Moment from 'moment';
import chatdb from '../../mocks/chatdb';
import playerlistmock from '../../mocks/playerlist';
import {
  fetchData,
  sendMessage,
  postNewThread
} from '../../api-services/messageAPI';

let socket;

const SocialMain = ({ location }) => {
  const [user, setUser] = useState(playerlistmock[1]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [secondUser, setSecondUser] = useState();
  const [roomid, setRoomid] = useState('');

  const ENDPOINT = 'http://localhost:4000/';

  useEffect(() => {
    console.log(secondUser);
    socket = io(ENDPOINT);
    if (secondUser) {
      console.log()
      fetchData(ENDPOINT, user, secondUser, socket, setMessages);
    }

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const [chatting, setChatting] = useState();
  let chatSessionId = '';

  const handleChatSubmit = e => {
    e.preventDefault();
    if (message) {
      sendMessage(
        ENDPOINT + 'messages',
        message,
        secondUser._id,
        user._id
      ).then(() => {
        socket.emit('sendMessage', { message, roomid }, () => setMessage(''));
      });
    }
  };

  const handleShowChat = secondUser => {
    let messageHistory, roomId;
    console.log('showing chat')
    if (!user.messages[secondUser._id]) {
      console.log('hey')
      postNewThread(
        ENDPOINT + 'users/new-thread',
        secondUser._id,
        user._id
      ).then(res => {({ roomId, messageHistory } = res);console.log(res)});
    } else {
      ({ messageHistory, roomId } = user.messages[secondUser._id]);
    }
    console.log(messageHistory)
    setMessages(messageHistory);
    setChatting(secondUser);
    setSecondUser(secondUser);
    setRoomid(roomId);
  };
  return (
    <div className="social-main__container">
      <PlayerList
        user={user}
        handleShowChat={handleShowChat}
        // setUser={setUser}
      />
      {chatting && (
        <ChatContainer
          user={user}
          chatSessionId={chatSessionId}
          secondUser={secondUser}
          message={message}
          handleChatSubmit={handleChatSubmit}
          setMessage={setMessage}
          messages={messages}
        />
      )}
    </div>
  );
};

export default SocialMain;
