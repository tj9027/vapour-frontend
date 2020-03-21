import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useUserMedia } from "./hooks/use-user-media";

function Camera() {
  console.log("Render camera");
  let videoRef = useRef(null);
  let canvasRef = useRef();

  const mediaStream = useUserMedia({
    audio: false,
    video: { width: 300, height: 300 }
  });

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  // Stop the video stream when component is unmount
  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks()[0].stop();
      }
    };
  }, [mediaStream]);

  const onCapture = async blob => {
    console.log("Upload to server");
  };

  let titleRef = useRef();

  const OnSubmit = () => {
    console.log("title", titleRef.current.value);
  };

  return (
    <>
      <div>
        <video ref={videoRef} autoPlay muted />
        <canvas ref={canvasRef} width={300} height={300} />
      </div>
      <div>
        <input type="text" name="title" placeholder="Title" ref={titleRef} />
      </div>
      <button
        onClick={() => {
          OnSubmit();
          if (canvasRef) {
            const context = canvasRef.current.getContext("2d");
            // This is for rotate the photo
            context.translate(300, 0);
            context.scale(-1, 1);

            context.drawImage(videoRef.current, 0, 0, 300, 300);
            canvasRef.current.toBlob(blob => onCapture(blob), "image/jpeg", 1);
            context.clearRect(0, 0, 300, 300);
          }
        }}
      >
        Take photo
      </button>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Camera />, rootElement);
