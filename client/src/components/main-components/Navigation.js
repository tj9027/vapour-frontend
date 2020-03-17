import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/session-actions';

import '../../styles/main-styles/navigation.css';
import logo from '../../assets/images/logo.svg';

const Navigation = () => {
	const dispatch = useDispatch();

	return (
		<div className="navigation__container">
			<div className="navigation__logo">
				<img src={logo} alt='logo' />
				<p>
					Vapour
				</p>
			</div>

			<div className="navigation__logout button" onClick={() => dispatch(logout())}>
				log out
			</div>
		</div>
	)
};

export default Navigation;