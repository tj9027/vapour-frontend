import React, { useState, useEffect } from 'react';
import PlayerList from './player-components/PlayerList';
import ChatContainer from './chat-components/ChatContainer';
import RtcContainer from '../rtc-components/RtcContainer';
import '../../styles/socialmain.css';
import { getPlayerMessages, sendMessage } from '../../api-services/messageAPI';
import { getPlayers } from '../../api-services/playersAPI';
import { useDispatch } from 'react-redux';
import {
  joinRoomById,
  disconnectSocket,
  socketPostMessage
} from '../../redux/actions/socket-actions';
const ENDPOINT = 'http://localhost:4000/';

const SocialMain = ({ currentUser, socket, loggedInUsers }) => {
  const dispatch = useDispatch();
  const [calling, setCalling] = useState();
  const [chatting, setChatting] = useState();
  const [messages, setMessages] = useState([]);
  const [roomid, setRoomid] = useState('');
  const [secondUser, setSecondUser] = useState({});
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    Object.assign(currentUser, { status: '1' });

    async function fetchPlayers(url) {
      const players = await getPlayers(url);
      const loggedinPlayers = players.map(user =>
        loggedInUsers.includes(user._id)
          ? Object.assign(user, { status: '1' })
          : Object.assign(user, { status: '0' })
      );

      setPlayers(loggedinPlayers);
    }

    fetchPlayers(ENDPOINT);
    return abortController.abort();
  }, [players, loggedInUsers, currentUser]);

  useEffect(() => {
    if (roomid && secondUser) {
      dispatch(
        joinRoomById(
          currentUser.name,
          roomid,
          currentUser._id,
          socket,
          () => {}
        )
      );
    }
    return () => {
      dispatch(disconnectSocket(socket));
    };
  }, [secondUser, currentUser, roomid, socket, dispatch]);

  useEffect(() => {
    if (roomid && secondUser) {
      socket.on('message', message => {
        setMessages([...messages, message.message]);
      });
    }
    return () => {};
  }, [messages, secondUser, socket, roomid]);

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
          dispatch(socketPostMessage(res, () => {}, socket));
        })
        .catch(err => err);
    }
  };

  const handleShowChat = async secondUser => {
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

  if (players.length) {
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
