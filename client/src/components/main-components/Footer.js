import React from 'react';
import '../../styles/main-styles/footer.css';

const Footer = ({ showPlayersNChat }) => {
	return (
		<div className="footer__container">
			<div className="footer__player-list-toggle" onClick={e => { e.preventDefault(); showPlayersNChat() }}>
				Players & Chat
			</div>
		</div>
	)
};

export default Footer;