import gameImage from "../assets/images/game.jpg";
import dot from "../assets/images/dot.png";
import asteroids from "../assets/images/asteroids.png";
export default [
  {
    id: 1,
    name: "(oneDot).bind(all)",
    image: dot,
    description: "move with the mouse, shoot with a click",
    url: "https://db-game1.herokuapp.com/",
    multiplayer: true
  },
  {
    id: 2,
    name: "Asteroids",
    image: asteroids,
    description:
      "click into the game to enable moving with keys; shoot with the space bar",
    url: "http://localhost:3000/games/asteroids/dist",
    multiplayer: false
  },
  {
    id: 3,
    name: "Ori and the Blind Forest",
    image: gameImage,
    description:
      'run left and right with arrow keys, jump with SPACE and attack with voice command "Attack"',
    multiplayer: false
  }
];
