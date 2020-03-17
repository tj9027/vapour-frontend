import React from 'react';
import RtcHeader from '. RtcHeader';
import '../../styles/rtc-styles/rtccontainer.css';

{/* not sure if either of these need to be included somewhere::
    <meta charset="utf-8" />
    <link rel = "stylesheet" href = "node_modules/bootstrap/dist/css/bootstrap.min.css"/> */}

const RtcContainer = () => {
  return (
    <div className="rtc__container">
      < RtcHeader />
      {/* remove this login for merge --> use existing login/auth route */}
      <div id="loginPage" class="container text-center">
        <div class="row">
          <div class="col-md-4 col-md-offset-4">
            <h2>WebRTC Video Demo. Please sign in</h2>
            <label for="usernameInput" class="sr-only">Login</label>
            <input type="email" id="usernameInput" class="form-control formgroup" placeholder="Login" required="" autofocus="" />
            <button id="loginBtn" class="btn btn-lg btn-primary btnblock">Sign in</button>
            {/* need to add in client.js handlers here */}
          </div>
        </div>
      </div>
      <div id="callPage" class="call-page">
        <video id="localVideo" autoplay></video>
        <video id="remoteVideo" autoplay></video>
        <div class="row text-center">
          <div class="col-md-12">
            {/* replace this input with the 'call' button that links two users directly --> edit handler */}
            <input id="callToUsernameInput" type="text"
              placeholder="username to call" />
            <button id="callBtn" class="btn-success btn">Call</button>
            <button id="hangUpBtn" class="btn-danger btn">Hang Up</button>
            {/* need to add in client.js handlers here */}
          </div>
        </div>
      </div>
      <script src="./clientVideo.js"></script>
    </div>
  )
};

export default RtcContainer;