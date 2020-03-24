import React, { createRef } from 'react';
import Webcam from 'react-webcam';
// import RtcHeader from './RtcHeader';
import '../../styles/rtc-styles/rtccontainer.css';
// import RtcMain from './RtcMain'
// import { useUserMedia } from './useUserMedia'

const RtcContainer = ({ secondUser }) => {
  const videoRef = createRef(null);

  const startCall = React.useCallback(() => {
    console.log(videoRef.current.stream);
  }, [videoRef]);
  const endCall = React.useCallback(() => {
    console.log(videoRef.current.stream);
  }, [videoRef]);
  // useUserMedia(videoRef)
  return (
    <div className="rtc__container">
      <h2>{secondUser.name}</h2>
      <div id="callPage" className="call-page">
        <Webcam
          audio={true}
          mirrored={true}
          ref={videoRef}
        />
        <button onClick={startCall}>Start Call</button>
        <button onClick={endCall}>End Call</button>
        {/* <video id="remoteVideo" autoPlay></video> */}
      </div>
    </div>
  );
};

export default RtcContainer;
