import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import PlayerList from './player-components/PlayerList';
import ChatContainer from './chat-components/ChatContainer';
import RtcContainer from '../rtc-components/RtcContainer';
import '../../styles/socialmain.css';
import { getPlayerMessages, sendMessage } from '../../api-services/messageAPI';
import { getPlayers } from '../../api-services/playersAPI';
import { useSelector } from 'react-redux';
const ENDPOINT = 'http://localhost:4000/';
let socket;

const SocialMain = () => {
  const [calling, setCalling] = useState();
  const [chatting, setChatting] = useState();
  const [messages, setMessages] = useState([]);
  const [roomid, setRoomid] = useState('');
  const [secondUser, setSecondUser] = useState({});
  const [players, setPlayers] = useState();

  const currentUser = useSelector(state => state.user);

  useEffect(() => {
    if (!players) {
      Object.assign(currentUser, { status: '1' });
      getPlayers(ENDPOINT)
        .then(res => res.map(user => Object.assign(user, { status: '1' })))
        .then(res => {
          setPlayers(res);
        })
        .catch(err => console.log(err));
    }
  }, [players]);

  useEffect(() => {
    if (socket) {
      socket.disconnect();
    }
    if (roomid && secondUser) {
      socket = io(ENDPOINT);
      socket.emit('join', currentUser.name, roomid, currentUser._id, () => {});
      return () => {
        socket.emit('disconnect');
        socket.off();
      };
    }
  }, [ENDPOINT, secondUser]);

  useEffect(() => {
    if (roomid && secondUser) {
      socket.on('message', message => {
        setMessages([...messages, message.message]);
      });
    }
  }, [messages]);

  let chatSessionId = '';

  const handleChatSubmit = message => {
    if (message) {
      sendMessage(
        ENDPOINT + 'messages',
        message,
        secondUser._id,
        currentUser._id,
        currentUser.name
      )
        .then(res => {
          socket.emit('message', res, () => {});
        })
        .catch(err => err);
    }
  };

  const handleShowChat = async secondUser => {
    let roomId;
    setSecondUser(secondUser);
    setChatting(secondUser);
    setRoomid(secondUser.messages[currentUser._id].roomId);

    getPlayerMessages(ENDPOINT, currentUser, secondUser)
      .then(res => setMessages(res.messageHistory))
      .catch(err => console.log(err));
  };

  const handleShowCall = targetUser => {
    setSecondUser(targetUser);
  };

  if (players) {
    return (
      <div className="social-main__container">
        <PlayerList
          currentUser={currentUser}
          players={players}
          handleShowChat={handleShowChat}
          setCalling={setCalling}
          calling={calling}
          handleShowCall={handleShowCall}
        />
        {chatting && (
          <ChatContainer
            user={currentUser}
            chatSessionId={chatSessionId}
            secondUser={secondUser}
            handleChatSubmit={handleChatSubmit}
            messages={messages}
          />
        )}
        {calling && <RtcContainer secondUser={secondUser} />}
      </div>
    );
  } else {
    return <div>LOADING...</div>;
  }
};

export default SocialMain;
