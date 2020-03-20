
import '../../styles/socialmain.css';


//our username 
let secondUser

//connecting to our signaling server
const conn = new WebSocket('ws://localhost:9090');

conn.onopen = function () {
  console.log("Connected to the signaling server");
};

//when we get a message from a signaling server 
conn.onmessage = function (msg) {
  console.log("Got message", msg.data);
  var data = JSON.parse(msg.data);

  switch (data.type) {

    // when the recipient accepts our call and makes an offer
    case "offer":
      handleOffer(data.offer, data.name);
      break;

    // when the caller responds with an answer
    case "answer":
      handleAnswer(data.answer);
      break;

    // when a remote peer sends an ice candidate to us 
    case "candidate":
      handleCandidate(data.candidate);
      break;

    // when ending a call
    case "leave":
      handleLeave();
      break;

    default:
      break;
  }
};

conn.onerror = function (err) {
  console.log("Got error", err);
};

//alias for sending JSON encoded messages 
//TODO :: fix message.name --> secondUser (import?)
function send(message) {
  //attach the other peer username to our messages 
  if (secondUser) {
    message.name = secondUser;
  }
  conn.send(JSON.stringify(message));
};

//UI selectors block 

// const callPage = document.querySelector('#callPage');
// const acceptCallBtn = document.querySelector('#acceptCallBtn');
// const pickupBtn;
// const rejectBtn;
// const hangUpBtn = document.querySelector('#hangUpBtn');
const localVideo = document.querySelector('#localVideo');
const remoteVideo = document.querySelector('#remoteVideo');

// alternative audio-only case - replace above two lines with:
// var localAudio = document.querySelector('#localAudio');
// var remoteAudio = document.querySelector('#remoteAudio');

var yourConn;
// var stream;


function mediaStreamOnIce(player) {
  //Get local video stream 
  //Start a peer connection 

  navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia ||
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
            candidate: event.candidate
          });
        }
      };
    });
}

const handleCreateCall = (player) => {
  // player being passed up from PlayerCard
  console.log(player);
  mediaStreamOnIce(player)
  send({
    type: "receiveCall" // is this possible?
  });
}

//initiating an RTC connection 
const handlePickup = (player) => {

  mediaStreamOnIce(player)
  // make 'offer' from recipient to caller
  // change callToUsername function to reference peer name
  // var recipient = player.name;
  // create an offer 
  yourConn.createOffer(function (offer) {
    send({
      type: "offer",
      offer: offer
    });
    yourConn.setLocalDescription(offer);
  }, function (error) {
    alert("Error when creating an offer");
  });
};

const handleReject = () => {
  send({
    type: "leave"
  });
  // player = null;
}

//when somebody sends us an offer 
function handleOffer(offer, player) {
  // var connectedUser = player.name;
  yourConn.setRemoteDescription(new RTCSessionDescription(offer));
  //create an answer to an offer 
  yourConn.createAnswer(function (answer) {
    yourConn.setLocalDescription(answer);
    send({
      type: "answer",
      answer: answer
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
  secondUser = null;
  remoteVideo.src = null;
  yourConn.close();
  yourConn.onicecandidate = null;
  yourConn.onaddstream = null;
  // TODO :: video component should disappear from caller's screen 
};

export { handleCreateCall, handlePickup, handleReject, handleLeave, };