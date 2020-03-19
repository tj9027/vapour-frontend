import React from 'react';
// import RtcHeader from './RtcHeader';
// import 
import '../../styles/rtc-styles/rtccontainer.css';

{/* not sure if either of these need to be included somewhere::
    <meta charset="utf-8" />
    <link rel = "stylesheet" href = "node_modules/bootstrap/dist/css/bootstrap.min.css"/> */}

const video = () => {
  const videoStream = navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(data => {
    console.log("VIDEO LOG", data)
    return data
  })
  return videoStream
}
const RtcContainer = ({ secondUser }) => {
  return (
    <div className="rtc__container">
      <h2>{secondUser.name}</h2>
      < div id="callPage" className="call-page" >
        <video id="localVideo" autoPlay>

          <source srcObject={video()}
            type="video/webm">

          </source>
        </video>
        <video id="remoteVideo" autoPlay></video>
      </div >
      <script src="./ToMerge-RtcClient"></script>
    </div >
  )
};

export default RtcContainer;