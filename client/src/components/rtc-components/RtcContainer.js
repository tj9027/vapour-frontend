import React from 'react';
// import RtcHeader from '. RtcHeader';
import '../../styles/rtc-styles/rtccontainer.css';

{/* not sure if either of these need to be included somewhere::
    <meta charset="utf-8" />
    <link rel = "stylesheet" href = "node_modules/bootstrap/dist/css/bootstrap.min.css"/> */}

const RtcContainer = () => {
  return (
    <div className="rtc__container">
      < div id="callPage" class="call-page" >
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
      </div >
      <script src="./ToMerge-RtcClient"></script>
    </div >
  )
};

export default RtcContainer;