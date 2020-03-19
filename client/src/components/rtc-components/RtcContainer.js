import React from 'react';
// import RtcHeader from '. RtcHeader';
import '../../styles/rtc-styles/rtccontainer.css';

{/* not sure if either of these need to be included somewhere::
    <meta charset="utf-8" />
    <link rel = "stylesheet" href = "node_modules/bootstrap/dist/css/bootstrap.min.css"/> */}

const RtcContainer = ({ secondUser }) => {
  return (
    <div className="rtc__container">
      <h2>{secondUser.name}</h2>
      < div id="callPage" class="call-page" >
        <video id="localVideo" autoplay></video>
        <video id="remoteVideo" autoplay></video>
      </div >
      <script src="./ToMerge-RtcClient"></script>
    </div >
  )
};

export default RtcContainer;