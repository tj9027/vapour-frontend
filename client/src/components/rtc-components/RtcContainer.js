import React, { createRef } from 'react';
import Webcam from 'react-webcam';

export const ownVideoRef = createRef(null);
export const remoteVideoRef = createRef(null);

const RtcContainer = ({ secondUser, currentUser }) => {

  return (
    <div className="rtc__container">
      <h2>{secondUser.name}</h2>
      <div id="callPage" className="call-page">
        <Webcam id="localVideo"
          audio={true}
          // what does 'mirrored' do?
          mirrored={true}
          ref={ownVideoRef}
        />
        <video id="remoteVideo"
        autoPlay
        ref={remoteVideoRef}
        ></video>
      </div>
    </div>
  );
};
export default RtcContainer;
