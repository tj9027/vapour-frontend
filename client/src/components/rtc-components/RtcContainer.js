import React from 'react';
import RtcHeader from '. RtcHeader';
import '../../styles/rtc-styles/rtccontainer.css';

{/* not sure if either of these need to be included somewhere::
    <meta charset="utf-8" />
    <link rel = "stylesheet" href = "node_modules/bootstrap/dist/css/bootstrap.min.css"/> */}

const RtcContainer = () => {
  return (
    <div className="rtc__container">

      {/* perhaps this button/pop-up should be a separate component? 
      ==> should appear when another user is calling you, so that you can choose to accept or reject */}
      <button id="acceptCallBtn" class="btn-success btn">Call</button>
      <button id="rejectCallBtn" class="btn-success btn">Call</button>


      <RtcHeader />

      <div id="callPage" class="call-page">
        <video id="localVideo" autoplay></video>
        <video id="remoteVideo" autoplay></video>
        <div class="row text-center">
          <div class="col-md-12">
            <button id="hangUpBtn" class="btn-danger btn">Hang Up</button>
          </div>
        </div>
      </div>
      <script src="./clientVideo.js"></script>
    </div>
  )
};

export default RtcContainer;