import React, { useState, useEffect } from "react";
import PlayerList from "./player-components/PlayerList";
import ChatContainer from "./chat-components/ChatContainer";
import RtcContainer from "../rtc-components/RtcContainer";
import "../../styles/socialmain.css";
import { getPlayerMessages, sendMessage } from "../../api-services/messageAPI";
// import { getPlayers } from "../../api-services/playersAPI";
import { useDispatch } from "react-redux";
import {
joinRoomById,
firstSocketLogin,
disconnectSocket,
socketPostMessage
} from "../../redux/actions/socket-actions";
import { getPlayers } from '../../api-services/playersAPI';
import { send } from '../rtc-components/RtcMain'

let socket;
const ENDPOINT = "http://localhost:4000/";

const SocialMain = ({ currentUser, socket }) => {
  const dispatch = useDispatch();
  const [calling, setCalling] = useState();
  const [chatting, setChatting] = useState();
  const [messages, setMessages] = useState([]);
  const [roomid, setRoomid] = useState("");
  const [secondUser, setSecondUser] = useState({});
  const [players, setPlayers] = useState([]);


  window.currentUser = currentUser
  const [loggedInUsers, setLoggedInUsers] = useState([]);

  useEffect(() => {
    if (players) {
      socket.on("updateUsers", data => {
        const newPlayers = players.map(player => {
          setLoggedInUsers([...data]);
          if ([...data].includes(player._id)) {
            return Object.assign(player, { status: 1 });
          } else {
            return Object.assign(player, { status: 0 });
          }
        });
        setPlayers(newPlayers);
      });
    }

    return () => {};
  }, [socket, players]);

  useEffect(() => {
    Object.assign(currentUser, { status: 1 });
    send({
      type: "join",
      name: currentUser.name,
      id: currentUser._id,
    });
    window.currentUser = currentUser;
    getPlayers(ENDPOINT)
      .then(res => setPlayers(res))
      .then(() => dispatch(firstSocketLogin(currentUser._id, socket)))
      .catch(err => console.log(err));

    return () => socket.emit("logout-user", currentUser._id);
  }, [currentUser, socket]);

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
      socket.on("message", message => {
        setMessages([...messages, message.message]);
      });
    }
    return () => {};
  }, [messages, secondUser, socket, roomid]);

  let chatSessionId = "";

  const handleChatSubmit = message => {
    if (message) {
      sendMessage(
        ENDPOINT + "messages",
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
            setChatting={setChatting}
            chatSessionId={chatSessionId}
            secondUser={secondUser}
            handleChatSubmit={handleChatSubmit}
            messages={messages}
          />
        )}
        {calling && (
          <RtcContainer
          secondUser={secondUser}
          currentUser={currentUser} />
        )}
      </div>
    );
  } else {
    return <div>LOADING...</div>;
  }
};

export default SocialMain;
