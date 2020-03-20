import gameImage from '../assets/images/game.jpg';

export default [
	{
		id: 1,
		name: 'Dot Eater',
		image: 'https://img.y8.com/cloud/y8-thumbs/24548/small.jpg',
		description: 'move with the mouse, shoot with a click',
		url: 'https://db-game1.herokuapp.com/',
		multiplayer: true
	},
	{
		id: 2,
		name: 'Asteroids',
		image: gameImage,
		description: "click into the game to enable moving with keys; shoot with the space bar",
		url: 'http://localhost:3000/games/asteroids/dist',
		multiplayer: false
	},
	{
		id: 3,
		name: 'Ori and the Blind Forest',
		image: gameImage,
		description: 'run left and right with arrow keys, jump with SPACE and attack with voice command "Attack"',
		multiplayer: false
	},

]