import React, { createRef } from 'react';
import Webcam from 'react-webcam';
import '../../styles/rtc-styles/rtccontainer.css';
import { secondUser, currentUser } from '../chat-players-components/SocialMain'

export const ownVideoRef = createRef(null);
export const remoteVideoRef = createRef(null);

const RtcContainer = ({ secondUser, currentUser }) => {


  // const startCall = React.useCallback(() => {
  //   console.log(videoRef.current.stream);
  // }, [videoRef]);
  // const endCall = React.useCallback(() => {
  //   console.log(videoRef.current.stream);
  // }, [videoRef]);
  // // useUserMedia(videoRef)

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


