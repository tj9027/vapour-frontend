let canvas, ctx;
let last_key;
let highScore;
let speed = 10;
let gameInterval;
let moved = false;

window.onload = () => {
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');

  for (let i = 400; i >= 0; i--) {
    for (let j = 400; j >= 0; j--) {
      drawBorder(i * tileSize, j * tileSize, tileSize, tileSize);
      ctx.fillStyle = 'white';
      ctx.fillRect(i * tileSize - 1, j * tileSize - 1, tileSize, tileSize);
    }
  }
  function drawBorder(xPos, yPos, width, height, thickness = 1) {
    ctx.fillStyle = 'grey';
    ctx.fillRect(xPos, yPos, width, height);
  }

  highScore = localStorage.getItem('highScore');
  document.getElementById('highScore').innerHTML = 'High score: ' + highScore;
  document.addEventListener('keydown', keyDownEvent);

  document.getElementById('start-button').onclick = function(e) {
    document.getElementById('start').style.display = 'none';
    gameInterval = setInterval(draw, 1000 / speed);
  };
  document.getElementById('pause').onclick = function(e) {
    keyDownEvent(e);
  };
  document.getElementById('play').onclick = function(e) {
    keyDownEvent(e);
  };

  document.getElementById('speed').onchange = function(e) {
    handleSpeedChange(e);
  };
  document.getElementById('restart').onclick = function(e) {
    handleGameRestart(e);
  };

  function handleSpeedChange(e) {
    speed = e.target.value;
    clearInterval(gameInterval);
    document.getElementById('speed-display').innerHTML =
      'Speed (fps): ' + speed;
    gameInterval = setInterval(draw, 1000 / speed);
  }
  function handleGameRestart() {
    location.reload();
  }
  //render X fps

  function draw() {
    if (play) {
      document.getElementById('pause-menu').style.display = 'none';
      document.getElementById('play').style.display = 'none';
      document.getElementById('pause').style.display = 'flex';
      snakeX += nextX;
      snakeY += nextY;

      if (snakeX < 0) {
        snakeX = gridSize - 1;
      }
      if (snakeX > gridSize - 1) {
        snakeX = 0;
      }

      if (snakeY < 0) {
        snakeY = gridSize - 1;
      }
      if (snakeY > gridSize - 1) {
        snakeY = 0;
      }

      if (snakeX === appleX && snakeY === appleY) {
        tailSize++;
        currentScore++;
        document.getElementById('score').textContent = 'Score: ' + currentScore;

        let prevAppleX = appleX;
        let prevAppleY = appleY;

        appleX = Math.floor(Math.random() * gridSize);
        appleY = Math.floor(Math.random() * gridSize);

        let i = 0;
        function checkAppleOnSnake() {
          if (i === tailSize - 1) {
            return;
          }
          if (prevAppleX == appleX && prevAppleY == appleY) {
            console.log('Apple must be in a different position!');
            i = 0;
            appleX = Math.floor(Math.random() * gridSize);
            appleY = Math.floor(Math.random() * gridSize);
            checkAppleOnSnake();
          } else if (appleX === snakeTrail[i].x && appleY === snakeTrail[i].y) {
            console.log(
              'APPLE ON SNAKE!',
              appleX,
              snakeTrail[i].x,
              appleY,
              snakeTrail[i].y,
              snakeTrail
            );
            i = 0;
            appleX = Math.floor(Math.random() * gridSize);
            appleY = Math.floor(Math.random() * gridSize);
            checkAppleOnSnake();
          } else {
            i++;
            checkAppleOnSnake();
          }
        }
        checkAppleOnSnake();
      }

      //paint snake
      ctx.fillStyle = 'green';
      for (let i = snakeTrail.length - 1; i >= 0; i--) {
        ctx.fillRect(
          snakeTrail[i].x * tileSize,
          snakeTrail[i].y * tileSize,
          tileSize - 1,
          tileSize - 1
        );
        //Hack to ignore the last element
        if (
          snakeTrail[0].x === snakeX &&
          snakeTrail[0].y === snakeY &&
          tailSize !== defaultSize
        ) {
          break;
        } else if (
          snakeTrail[i].x === snakeX &&
          snakeTrail[i].y === snakeY &&
          tailSize !== defaultSize
        ) {
          localStorage.setItem('highScore', currentScore);
          document.getElementById('highScore').textContent =
            'High score: ' + currentScore;
          clearInterval(gameInterval);
          document.getElementById('gOver').style.display = 'block';
        }
      }

      ctx.fillStyle = 'white';
      if (snakeTrail && snakeTrail.length >= 2 && moved) {
        ctx.fillRect(
          snakeTrail[0].x * tileSize,
          snakeTrail[0].y * tileSize,
          tileSize - 1,
          tileSize - 1
        );
      }
      // paint apple
      ctx.fillStyle = 'red';
      ctx.fillRect(
        appleX * tileSize,
        appleY * tileSize,
        tileSize - 1,
        tileSize - 1
      );

      //set snake trail
      snakeTrail.push({ x: snakeX, y: snakeY });
      while (snakeTrail.length > tailSize) {
        snakeTrail.shift();
      }
    } else {
      document.getElementById('pause').style.display = 'none';
      document.getElementById('pause-menu').style.display = 'flex';
      document.getElementById('play').style.display = 'flex';
    }
  }
};
function keyDownEvent(e) {
  moved = true;
  e.preventDefault();
  switch (e.keyCode || e.target.id) {
    case 27:
      play = false;
      break;
    case 'pause':
      play = false;
      break;
    case 13:
      play = true;
      break;
    case 'play':
      play = true;
      break;
    case 37:
      if (last_key === 39) {
        break;
      } else {
        nextX = -1;
        nextY = 0;
        last_key = 37;
        break;
      }
    case 38:
      if (last_key === 40) {
        break;
      } else {
        nextX = 0;
        nextY = -1;
        last_key = 38;
        break;
      }
    case 39:
      if (last_key === 37) {
        break;
      } else {
        nextX = 1;
        nextY = 0;
        last_key = 39;
        break;
      }
    case 40:
      if (last_key === 38) {
        break;
      } else {
        nextX = 0;
        nextY = 1;
        last_key = 40;
        break;
      }
    default:
      break;
  }
}
//snake
let currentScore = 0;
let play = true;
let defaultSize = 2;
let tailSize = defaultSize;
let snakeTrail = [{ x: 10, y: 10 }];
let snakeX = (snakeY = 10);

//game world

let gridSize = (tileSize = 20);
let nextX = (nextY = 0);

//apple

let = appleX = appleY = 15;
