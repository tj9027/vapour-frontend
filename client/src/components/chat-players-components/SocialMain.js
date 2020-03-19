import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import PlayerList from './player-components/PlayerList';
import ChatContainer from './chat-components/ChatContainer';
import RtcContainer from '../rtc-components/RtcContainer';
import '../../styles/socialmain.css';
import {
  getPlayerMessages,
  sendMessage,
  postNewThread
} from '../../api-services/messageAPI';
import { getPlayers } from '../../api-services/playersAPI';
import { useSelector } from 'react-redux';
const ENDPOINT = 'http://localhost:4000/';
let socket;

const SocialMain = () => {
  const [user, setUser] = useState();
  const [calling, setCalling] = useState();
  const [chatting, setChatting] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [roomid, setRoomid] = useState('');
  const [secondUser, setSecondUser] = useState();
  const [players, setPlayers] = useState();

  const ENDPOINT = 'http://localhost:4000/';

  const currentUser = useSelector(state => state.currentUser);



  useEffect(() => {
    socket = io(ENDPOINT);

    if (secondUser) {
      let messageHistory, roomId;
      if (
        currentUser.messages === {} ||
        !currentUser.messages[secondUser._id]
      ) {
        postNewThread(
          ENDPOINT + 'users/new-thread',
          currentUser._id,
          secondUser._id
        ).then(res => {
          ({ roomId, messageHistory } = res);
        });
      } else {
        ({ messageHistory, roomId } = currentUser.messages[secondUser._id]);
      }

      socket.emit('join', currentUser._id, roomId, () => { });
    }
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, secondUser]);

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
    socket = io(ENDPOINT);
    socket.on('connect', data => {
      if (roomid) {
        socket.emit('join', currentUser.name, roomid, () => { });
      } else {
        socket.emit('disconnect');
        socket.off();
      }
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, secondUser]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message.message]);
    });
  }, [messages]);

  let chatSessionId = '';

  const handleChatSubmit = e => {
    e.preventDefault();

    if (message) {
      console.log(currentUser.name);
      sendMessage(
        ENDPOINT + 'messages',
        message,
        secondUser._id,
        currentUser._id,
        currentUser.name
      )
        .then(res => socket.emit('message', res, () => setMessage('')))
        .catch(err => err);
    }
  };

  const handleShowChat = secondUser => {
    console.log(secondUser);
    let roomId, messageHistory;

    if (currentUser.messages === {} || !currentUser.messages[secondUser._id]) {
      postNewThread(
        ENDPOINT + 'users/new-thread',
        secondUser._id,
        currentUser._id
      )
        .then(({ sender, recipient }) => {
          setSecondUser(recipient);
          setChatting(recipient);
          setRoomid(recipient.messages[sender._id].roomId);
        })
        .then(() =>
          getPlayerMessages(ENDPOINT, currentUser, secondUser)
            .then(res => setMessages(res.messageHistory))
            .catch(err => console.log(err))
        );
    } else {
      setSecondUser(secondUser);
      setChatting(secondUser);
      setRoomid(secondUser.messages[currentUser._id].roomId);
      getPlayerMessages(ENDPOINT, currentUser, secondUser)
        .then(res => setMessages(res.messageHistory))
        .catch(err => console.log(err));
    }
  };

  const handleShowCall = targetUser => {
    setSecondUser(targetUser);
  }

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
            message={message}
            handleChatSubmit={handleChatSubmit}
            setMessage={setMessage}
            messages={messages}
          />
        )}
        {calling && (
          <RtcContainer secondUser={secondUser} />
        )}
      </div>
    );
  } else {
    return <div>LOADING...</div>;
  }
};

export default SocialMain;
