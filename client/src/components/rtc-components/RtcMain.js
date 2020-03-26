import { ownVideoRef, remoteVideoRef } from '../rtc-components/RtcContainer';
import '../../styles/socialmain.css';
import '../chat-players-components/SocialMain'
import '../../styles/rtc-styles/rtccontainer.css';

// let sessionUser;
// let currentUser;
let partner;
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
      if (data.caller === window.currentUser._id) {
        handleOffer(data.offer, data);
      }
      break;

    // when the caller responds with an answer
    case "answer":
      if (data.callee === window.currentUser._id) {
        handleAnswer(data.answer);
      }
      break;

    // when a remote peer sends an ice candidate to us 
    case "candidate":
      // if (data.secondUser === currentUser) 
      {
        handleCandidate(data.candidate);
      }
      break;

    // when ending a call
    case "leave":
      if (data.partner.id === window.currentUser._id) {
        handleLeave();
      }
      // TODO :: sort out endcall button on caller's side && when one ends call, other window should also close
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
  conn.send(JSON.stringify(message));
};

const localVideo = { ownVideoRef };
const remoteVideo = { remoteVideoRef };
var yourConn;
navigator.mediaDevices.getUserMedia = (
  navigator.mediaDevices.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);

function mediaStreamOnIce() {

  console.log('first place')
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(function (stream) {
      //display local video stream on the page 
      console.log('do we get here?')
      localVideo.srcObject = stream;
      //using Google public stun server 
      var configuration = {
        "iceServers": [{ "url": "stun:stun2.1.google.com:19302" }]
      };
      yourConn = new RTCPeerConnection(configuration);
      // setup stream listening 
      console.log('yourconn', yourConn)
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
      return yourConn
    });
}

const handleCreateCall = (callee, currentUser) => {
  // currentUser = window.currentUser
  // console.log('callee', callee)
  // console.log('currentUser', currentUser)
  partner = { id: callee._id, name: callee.name }
  caller = { id: currentUser._id, name: currentUser.name }
  callee = { id: callee._id, name: callee.name }
  window.setEndCall[callee.id].setEndCall(true)
  mediaStreamOnIce(currentUser)
  send({
    type: "receiveCall",
    caller: caller,
    callee: callee
  });
}

const handleReceiveCall = (data) => {
  partner = { id: data.caller.id, name: data.caller.name }
  caller = { id: data.caller.id, name: data.caller.name }
  callee = { id: data.callee.id, name: data.callee.name }
  window.setIncomingCall[caller.id].setIncomingCall(data);
}

async function handlePickup(player) {

  window.setEndCall[caller.id].setEndCall(true);
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  // console.log('stream', stream)
  // display local video stream on the page 
  localVideo.srcObject = stream;
  //using Google public stun server 
  var configuration = {
    "iceServers": [{ "url": "stun:stun2.1.google.com:19302" }]
  };
  yourConn = new RTCPeerConnection(configuration);
  // setup stream listening 
  // console.log('yourconn', yourConn)
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
  // create an offer 
  // console.log('yourConn returned', yourConn)
  yourConn.createOffer(function (offer) {
    send({
      type: "offer",
      offer: offer,
      caller: caller,
      callee: callee
    });
    yourConn.setLocalDescription(offer);
  });
  // TODO :: also set caller's phone icon to 'end call'
}

const handleReject = () => {
  send({
    type: "reject",
    caller: caller,
    callee: callee
  });
  // player = null;
  // TODO :: fix this reject button
}

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
  console.log('partner', partner)
  send({
    type: "leave",
    partner: partner,
  });
  caller = null;
  callee = null;
  remoteVideo.src = null;
  // console.log('yourconn close', yourConn)
  // yourConn.close();
  // yourConn.onicecandidate = null;
  // yourConn.onaddstream = null;
};

export { handleCreateCall, handlePickup, handleReject, handleLeave, handleReceiveCall };
