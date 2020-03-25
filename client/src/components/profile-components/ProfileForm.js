import React, { useState } from "react";
import { updateUser } from "../../redux/actions/current-user-actions";
import { useDispatch } from "react-redux";
import "../../styles/profile-styles/profileForm.css";

const ProfileForm = ({ type, user, closeForm, updateUserState }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = name => {
    const update = { [type]: value };
    dispatch(updateUser(user._id, update));
    closeForm(type);
  };
  return (
    <div className="profile-form__container">
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(value);
          updateUserState();
        }}
      >
        <input
          className="profile-form__input"
          type={type}
          value={value}
          onChange={e => {
            e.preventDefault();
            setValue(e.target.value);
          }}
          placeholder={"type new " + type}
        />
        <button type="submit" className="button profile-form__submit">
          submit
        </button>
        <button
          type="cancel"
          className="button profile-form__submit"
          onClick={e => closeForm()}
        >
          cancel
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
