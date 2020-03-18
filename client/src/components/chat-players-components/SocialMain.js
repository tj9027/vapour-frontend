import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import PlayerList from './player-components/PlayerList';
import ChatContainer from './chat-components/ChatContainer';
import '../../styles/socialmain.css';
import {
  getPlayerMessages,
  sendMessage,
  postNewThread
} from '../../api-services/messageAPI';
import { getPlayers } from '../../api-services/playersAPI';

let socket;

const SocialMain = () => {
  const [user, setUser] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [secondUser, setSecondUser] = useState();
  const [players, setPlayers] = useState();

  const ENDPOINT = 'http://localhost:4000/';
  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    socket = io(ENDPOINT+'messages');

    if (secondUser) {
      let messageHistory, roomId;
      if (!currentUser.messages[secondUser._id]) {
        postNewThread(
          ENDPOINT + 'users/new-thread',
          secondUser._id,
          currentUser._id
        ).then(res => {
          ({ roomId, messageHistory } = res);
        });
      } else {
        ({ messageHistory, roomId } = currentUser.messages[secondUser._id]);
      }
      const room = currentUser.messages[secondUser._id];
      const roomid = room.roomId;
      socket.emit('join', currentUser.name, currentUser._id, roomid, () => {});
    }
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, secondUser]);

  useEffect(() => {
    if (!user && !players) {
      setUser(Object.assign(currentUser, { status: '1' }));
      getPlayers(ENDPOINT)
        .then(res => res.map(user => Object.assign(user, { status: '1' })))
        .then(res => {
          setPlayers(res);
        })
        .catch(err => console.log(err));
    }
  }, [players]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const [chatting, setChatting] = useState();
  let chatSessionId = '';

  const handleChatSubmit = e => {
    e.preventDefault();
    const roomId = secondUser.messages[user._id].roomId;
    console.log(socket)
    
    if (message) {
      sendMessage(
        ENDPOINT + 'messages',
        message,
        secondUser._id,
        user._id
      ).then(res => {
        socket.emit('sendMessage', message, roomId, () => setMessage(''));
      });
    
  };}

  const handleShowChat = secondUser => {
    setChatting(secondUser);
    setSecondUser(secondUser);

    getPlayerMessages(ENDPOINT, user, secondUser)
      .then(res => setMessages(res))
      .catch(err => console.log(err));
  };

  if (players) {
    return (
      <div className="social-main__container">
        <PlayerList
          user={user}
          players={players}
          handleShowChat={handleShowChat}
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
  } else {
    return <div>LOADING...</div>;
  }
};

export default SocialMain;
