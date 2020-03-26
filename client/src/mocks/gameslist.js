import gameImage from "../assets/images/game.jpg";
import pong from "../assets/images/pong.JPG";
import dot from "../assets/images/dot.png";
import asteroids from "../assets/images/asteroids.png";
import epi from "../assets/images/going-epi.png"
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
    name: "Going Epi",
    image: epi,
    description:
      'use arrow keys to get as many food items as you can, before the virus gets you',
    url: "http://localhost:3000/games/going-epi",
    multiplayer: false
  },
  {
    id: 4,
    name: "Snake",
    image: gameImage,
    description:
      'Classic game of snake',
    url: "http://localhost:3000/games/snake/snake.html",
    multiplayer: false
  },
  {
    id: 5,
    name: "Pong",
    image: pong,
    description:
      'Use up and down arrows to move your paddle',
    url: "https://db-pong.herokuapp.com/",
    multiplayer: true
  }
];
