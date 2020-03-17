import React from 'react';
import '../../styles/main-styles/navigation.css';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';

const Navigation = () => {
	return (
		<div className="navigation__container ">
			<Link
				to="/"
				className="navigation__logo">
				<img src={logo} alt='logo' />
				<p>
					Vapour
				</p>
			</Link>
			<Link
				className="navigation__player-list-toggle button"
				onClick={e => { }}
				to="/messages">
				<div >
					Players & Chat
			</div>
			</Link>
			<div className="navigation__logout button">
				log out
			</div>
		</div>
	)
};

export default Navigation;