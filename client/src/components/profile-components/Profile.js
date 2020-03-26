import React, { useState, useEffect } from "react";
import "../../styles/profile-styles/Profile.css";
import { useSelector, useDispatch } from "react-redux";
import placeholderImg from "../../assets/images/placeholder-avatar.svg";
import ProfileCamera from "./ProfileCamera";
import ProfileForm from "./ProfileForm";
import { getCurrentUser } from "../../redux/actions/current-user-actions";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ loginReducer }) => loginReducer.user);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const afterOpenModal = () => console.log("modal");

  const openForm = type => setIsOpenForm(type);
  const closeForm = type => setIsOpenForm(false);

  const updateUserState = () => {
    dispatch(getCurrentUser(currentUser._id)).then(data => {
      setCurrentUser(data);
      window.location.reload();
    });
  };

  if (user.name.length) {
    return (
      <div className="profile__container">
        <div className="profile__details-container">
          <img
            className="profile__avatar"
            src={user.avatar ? user.avatar : placeholderImg}
            alt={user.name}
          />
          <div className="profile__details-seperator">
            <h2 className="profile__name">Hi! {user.name}</h2>
            <p className="profile__email">
              email: <small>{user.email}</small>
            </p>
            <p className="profile__id">
              id: <small>{user._id}</small>
            </p>
          </div>
        </div>
        <div className="profile__options-container">
          <h3 className="profile__options-title">settings:</h3>
          <div
            onClick={e => {
              e.preventDefault();
              openForm("name");
            }}
            className="button profile__button"
          >
            change name
          </div>
          <div
            onClick={e => {
              e.preventDefault();
              openForm("email");
            }}
            className="button profile__button"
          >
            change email
          </div>
          <div
            className=" button profile-camera__modal-trigger"
            onClick={e => {
              e.preventDefault();
              openModal();
            }}
          >
            Choose Avatar
          </div>
        </div>
        <div className="profile-form__container">
          {isOpenForm && (
            <ProfileForm
              type={isOpenForm}
              user={currentUser}
              updateUserState={updateUserState}
              closeForm={closeForm}
            />
          )}
          <ProfileCamera
            modalIsOpen={modalIsOpen}
            openModal={openModal}
            closeModal={closeModal}
            afterOpenModal={afterOpenModal}
          />
        </div>
      </div>
    );
  } else return null;
};

export default Profile;
