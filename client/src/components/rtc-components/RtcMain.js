// import React, { createRef, useRef, useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getCurrentUser } from '../../redux/actions/current-user-actions';
// import { useUserMedia } from './useUserMedia';
import { ownVideoRef, remoteVideoRef } from '../rtc-components/RtcContainer';
import '../../styles/socialmain.css';
import '../chat-players-components/SocialMain'
import '../../styles/rtc-styles/rtccontainer.css';
// import RtcHeader from './RtcHeader';


  let sessionUser;
  let currentUser;
  let partner = { id: 987654, name: "scott" } // get this from socialMain
  let caller;
  let callee;



  //connecting to our signaling server
  export const conn = new WebSocket('ws://localhost:9090');

  conn.onopen = function () {
    console.log("Connected to the signaling server");
  }

  //when we get a message from a signaling server 
  conn.onmessage = function (msg) {

    console.log("Got message", msg.data);
    var data = JSON.parse(msg.data);

    switch (data.type) {

      case "receiveCall":
        if (data.callee.id === window.currentUser._id) {
          handleReceiveCall(data);
        }
        break;

      // when the recipient accepts our call and makes an offer
      case "offer":
        if (data.caller === currentUser) {
          handleOffer(data.offer, data);
        }
        break;

      // when the caller responds with an answer
      case "answer":
        if (data.secondUser === currentUser) {
          handleAnswer(data.answer);
        }
        break;

      // when a remote peer sends an ice candidate to us 
      case "candidate":
        if (data.secondUser === currentUser) {
          handleCandidate(data.candidate);
        }
        break;

      // when ending a call
      case "leave":
        if (data.secondUser === currentUser) {
          handleLeave();
        }
        break;

      default:
        break;
    }
  };

  conn.onerror = function (err) {
    console.log("Got error", err);
  };

  //alias for sending JSON encoded messages 
 export function send(message) {
    //attach the other peer username to our messages 
    // if (partner) {
    //   message.partner = partner;
    // }
    conn.send(JSON.stringify(message));
  };

  //UI selectors block 

  const localVideo = { ownVideoRef };
  const remoteVideo = { remoteVideoRef };

  var yourConn;

  function mediaStreamOnIce(player) {

    navigator.mediaDevices.getUserMedia = (
      navigator.mediaDevices.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(function (stream) {
        //display local video stream on the page 
        localVideo.srcObject = stream;

        //using Google public stun server 
        var configuration = {
          "iceServers": [{ "url": "stun:stun2.1.google.com:19302" }]
        };
        yourConn = new RTCPeerConnection(configuration);
        // setup stream listening 
        yourConn.addStream(stream);
        //display caller's video stream to the peer connection 
        yourConn.onaddstream = function (e) {
          remoteVideo.srcObject = e.stream;
        };
        // Setup ice handling 
        yourConn.onicecandidate = function (event) {
          if (event.candidate) {
            send({
              type: "candidate",
              candidate: event.candidate,
              caller: caller,
              callee: callee
            });
          }
        };
      });
  }

  const handleCreateCall = (callee, currentUser) => {
    // currentUser = window.currentUser
    // console.log('callee', callee)
    // console.log('currentUser', currentUser)
    partner = { id: callee._id, name: callee.name }
    caller = { id: currentUser._id, name: currentUser.name }
    callee = { id: callee._id, name: callee.name }
    mediaStreamOnIce(currentUser)
    send({
      type: "receiveCall",
      caller: caller,
      callee: callee
    });
  }
  window.handleCreateCall = handleCreateCall

  const handleReceiveCall = (data) => {
    partner = { id: data.caller.id, name: data.caller.name }
    caller = { id: data.caller.id, name: data.caller.name }
    callee = { id: data.callee.id, name: data.callee.name }
    console.log('window rtcmain', window.setIncomingCall)
    window.setIncomingCall[caller.id].setIncomingCall(data);



    // window.setIncomingCall(data)
    console.table('data object', data)
    console.log('set incoming call buttons')
    // TODO:: trigger changing of icons from call to pickup/reject
  }


  //initiating an RTC connection 
  const handlePickup = (player) => {
    mediaStreamOnIce(player)
    // create an offer 
    yourConn.createOffer(function (offer) {
      send({
        type: "offer",
        offer: offer,
        caller: caller,
        callee: callee
      });
      yourConn.setLocalDescription(offer);
    }, function (error) {
      alert("Error when creating an offer");
    });
  };
  window.handlePickup = handlePickup

  const handleReject = () => {
    send({
      type: "reject",
      caller: caller,
      callee: callee
    });
    // player = null;
  }
  window.handleReject = handleReject

  //when somebody sends us an offer 
  function handleOffer(offer, data) {
    yourConn.setRemoteDescription(new RTCSessionDescription(offer));
    //create an answer to an offer 
    yourConn.createAnswer(function (answer) {
      yourConn.setLocalDescription(answer);
      send({
        type: "answer",
        answer: answer,
        caller: caller,
        callee: callee
      });
    }, function (error) {
      alert("Error when creating an answer");
    });
  };

  //when we got an answer from a remote user
  function handleAnswer(answer) {
    yourConn.setRemoteDescription(new RTCSessionDescription(answer));
  };

  //when we got an ice candidate from a remote user 
  function handleCandidate(candidate) {
    yourConn.addIceCandidate(new RTCIceCandidate(candidate));
  };


  const handleLeave = () => {
    send({
      type: "leave"
    });
    partner = null;
    caller = null;
    callee = null;
    remoteVideo.src = null;
    yourConn.close();
    yourConn.onicecandidate = null;
    yourConn.onaddstream = null;
  };
  // window.handleLeave = handleLeave

  export { handleCreateCall, handlePickup, handleReject, handleLeave, handleReceiveCall };
