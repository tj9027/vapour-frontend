import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/session-actions';

import '../../styles/main-styles/navigation.css';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const dispatch = useDispatch();

  return (
    <div className="navigation__container ">
      <Link to="/" className="navigation__logo">
        <img src={logo} alt="logo" />
        <p>Vapour</p>
      </Link>
      <Link
        className="navigation__player-list-toggle button"
        onClick={e => {}}
        to="/messages"
      >
        <div>PLAYERS & CHAT</div>
      </Link>
      <Link
        className="navigation__logout button"
        onClick={() => dispatch(logout())}
        to='/'
      >
        SIGN OUT
      </Link>
    </div>
  );
};

export default Navigation;
