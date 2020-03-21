import React, { createRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Webcam from 'react-webcam';
import FileBase64 from 'react-file-base64';
import ImageUploader from 'react-images-upload';
import '../../styles/profile-styles/Profile.css';

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user'
};

const Profile = () => {
  const currentUser = useSelector(({ user }) => user);
  const [imageSrc, setImageSrc] = useState('');

  const onDrop = picture => {
    getBase64(picture[0], result => setImageSrc(result));
  };

  const webcamRef = createRef(null);

  const capture = React.useCallback(() => {
    setImageSrc(webcamRef.current.getScreenshot());
  }, [webcamRef]);

  function clearImage() {
    setImageSrc('');
  }

  function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      cb(reader.result);
    };
    reader.onerror = function(error) {
      console.log('Error: ', error);
    };
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
            <img style={{ width: '400px' }} src={imageSrc} />
          </div>
        </div>
      </>
    );
  } else return null;
};

export default Profile;
