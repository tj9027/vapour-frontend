import React, { createRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Webcam from "react-webcam";
import ImageUploader from "react-images-upload";
import * as faceapi from "face-api.js";
import {
  uploadAvatar,
  updateUser
} from "../../redux/actions/current-user-actions";
import Modal from "react-modal";
import "../../styles/profile-styles/profileCamera.css";

const MODEL_URL = "/models";

const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "user"
};

const ProfileCamera = ({
  modalIsOpen,
  openModal,
  closeModal,
  afterOpenModal
}) => {
  useEffect(() => {
    async function load() {
      await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
      await faceapi.loadFaceRecognitionModel(MODEL_URL);
    }
    load();
  }, []);
  const dispatch = useDispatch();
  const currentUser = useSelector(({ loginReducer }) => loginReducer.user);
  const [imageSrc, setImageSrc] = useState("");

  const onDrop = picture => {
    getBase64(picture[picture.length - 1], result => faceRecog(result));
  };

  const webcamRef = createRef(null);

  const capture = React.useCallback(() => {
    faceRecog(webcamRef.current.getScreenshot());
  }, [webcamRef]);

  function clearImage() {
    setImageSrc("");
  }

  const handleSaveAvatar = (id, update) => {
    dispatch(updateUser(id, update));
    closeModal();
  };

  function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      cb(reader.result);
    };
    reader.onerror = function(error) {
      console.log("Error: ", error);
    };
  }
  async function faceRecog(imageSrc) {
    try {
      const image = new Image();
      image.src = imageSrc;
      const detections = await faceapi.detectAllFaces(
        image,
        new faceapi.TinyFaceDetectorOptions()
      );
      const x = detections[0].box["_x"];
      const y = detections[0].box["_y"];
      const width = detections[0].box["_width"];
      const height = detections[0].box["_height"];
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;
      const centerX = x + width / 2;
      const centerY = y + height / 2 - height * 0.2;
      const radius = (height / 2) * 1.5;
      ctx.drawImage(image, 0, 0);
      ctx.globalCompositeOperation = "destination-in";
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      const tempCanvas = document.createElement("canvas");
      const tCtx = tempCanvas.getContext("2d");
      tempCanvas.width = radius * 2;
      tempCanvas.height = radius * 2;
      tCtx.drawImage(canvas, -(centerX - radius), -(centerY - radius));
      const img = tempCanvas.toDataURL("image/png");
      setImageSrc(img);
    } catch (error) {
      alert(
        "Sorry, your face was not detected. Please ensure your face is clearly visible"
      );
    }
  }
  Modal.setAppElement(".App");
  if (currentUser.name.length !== 0) {
    return (
      <div className="profile-camera__container">
        <Modal
          className="profile-camera__modal"
          overlayClassName="profile-camera__overlay"
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Avatar"
        >
          <div className="profile-camera__image-container">
            <div className="profile-camera__seperator">
              <Webcam
                screenshotFormat="image/jpeg"
                audio={false}
                mirrored={true}
                ref={webcamRef}
                videoConstraints={videoConstraints}
              />
              <div className="profile-camera__buttons-container">
                <button
                  className="button profile-camera__button"
                  onClick={capture}
                >
                  Capture photo
                </button>
              </div>
            </div>
            <h1>or</h1>
            <ImageUploader
              className="profile-camera__file-uploader"
              withIcon={true}
              buttonText="Choose Avatar"
              onChange={onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />
          </div>
          {imageSrc && (
            <div className="profile-camera__avatar-container">
              <img
                className="profile-camera__avatar"
                src={imageSrc}
                id="myImage"
              />
              <button
                className="button profile-camera__button"
                onClick={clearImage}
              >
                Try Again
              </button>
              <button
                className="button profile-camera__button"
                onClick={e =>
                  handleSaveAvatar(currentUser._id, { avatar: imageSrc })
                }
              >
                keep avatar
              </button>
            </div>
          )}
          <button
            className="button profile-camera__button close-button"
            onClick={closeModal}
          >
            close
          </button>
        </Modal>
      </div>
    );
  } else return null;
};

export default ProfileCamera;
