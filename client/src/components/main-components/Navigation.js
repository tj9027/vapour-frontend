import React from 'react';
import '../../styles/main-styles/navigation.css';
import logo from '../../assets/images/logo.svg';

const Navigation = () => {
	return (
		<div className="navigation__container">
			<div className="navigation__logo">
				<img src={logo} alt='logo' />
				<p>
					Vapour
				</p>
			</div>

			<div className="navigation__logout button">
				log out
			</div>
		</div>
	)
};

export default Navigation;