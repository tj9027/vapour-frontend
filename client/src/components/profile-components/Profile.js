import React, { createRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Webcam from 'react-webcam';
import FileBase64 from 'react-file-base64';
import ImageUploader from 'react-images-upload';
import '../../styles/profile-styles/Profile.css';
import * as faceapi from 'face-api.js';
import userApi from '../../api-services/user-api-util';
const MODEL_URL = '/models'

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user'
};


const Profile = () => {
  useEffect(() => {
    async function load () {
      await faceapi.loadTinyFaceDetectorModel(MODEL_URL)
      await faceapi.loadFaceRecognitionModel(MODEL_URL)
    }
    load();
  }, []);



  const currentUser = useSelector(({ user }) => user);
  const [imageSrc, setImageSrc] = useState('');

  const onDrop = async (picture) => {
    await getBase64(picture[picture.length-1], result => faceRecog(result));
  };

  const webcamRef = createRef(null);

  const capture = React.useCallback(() => {
    faceRecog(webcamRef.current.getScreenshot());
  }, [webcamRef]);

  function clearImage () {
    setImageSrc('');
  }

  function getBase64 (file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  async function faceRecog (imageSrc) {
    try {
      const image = new Image()
      image.src=imageSrc;
      const detections = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions())
      const x = detections[0].box["_x"];
      const y = detections[0].box["_y"];
      const width = detections[0].box["_width"];
      const height = detections[0].box["_height"];
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      const centerX = x + (width / 2)
      const centerY = (y + (height / 2)) - (height * 0.2)
      const radius = (height / 2) * 1.5
      ctx.drawImage(image, 0, 0);
      ctx.globalCompositeOperation = 'destination-in';
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      const tempCanvas = document.createElement("canvas")
      const tCtx = tempCanvas.getContext("2d");
      tempCanvas.width = radius*2;
      tempCanvas.height = radius*2;
      tCtx.drawImage(canvas, -(centerX-radius), -(centerY-radius));
      const img = tempCanvas.toDataURL("image/png");
      userApi(currentUser._id, img)
      setImageSrc(img)
    } catch (error) {
      console.log(error)
      alert('Sorry, your face was not detected. Please ensure your face is clearly visible')
    }
  }

  if (currentUser.name.length !== 0) {
    return (
      <>
        <h1>{currentUser._id}</h1>
        <h1>{currentUser.name}</h1>
        <div className="container">
          <div className="capture-container">
            <Webcam
              screenshotFormat="image/jpeg"
              audio={false}
              ref={webcamRef}
              videoConstraints={videoConstraints}
            />
            <button onClick={capture}>Capture photo</button>
            <button onClick={clearImage}>Clear image</button>
            <ImageUploader
              withIcon={true}
              buttonText="Choose Avatar"
              onChange={onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
            />
          </div>
          <div className="details-container">
            <img style={{ width: '400px' }} src={imageSrc} id="myImage" />
          </div>
        </div>
      </>
    );
  } else return null;
};

export default Profile;
