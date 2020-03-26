/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

  eval("const util = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\n\nfunction Asteroid({game, pos}) {\n    MovingObject.call(this, {\n                        game,\n                        pos,\n                        vel: util.randomVec(5),\n                        radius: 10,\n                        color: \"aquamarine\"});\n}\n\nutil.inherits(Asteroid, MovingObject);\n\nAsteroid.prototype.collideWith = function(otherObject) {\n    if (otherObject instanceof Ship) {\n        otherObject.relocate();\n    }\n};\n\nmodule.exports = Asteroid;\n\n\n//# sourceURL=webpack:///./src/asteroid.js?");

  /***/ }),
  
  /***/ "./src/bullet.js":
  /*!***********************!*\
    !*** ./src/bullet.js ***!
    \***********************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  eval("const util = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\n\nfunction Bullet({game, pos, vel}) {\n    MovingObject.call(this, {\n        game,\n        pos,\n        vel,\n        radius: 3,\n        color: util.randomColor()});\n}\n\nutil.inherits(Bullet, MovingObject);\n\nBullet.prototype.isWrappable = false;\n\nBullet.prototype.collideWith = function(otherObject) {\n    this.game.removeAst(otherObject)\n};\n\nmodule.exports = Bullet;\n\n//# sourceURL=webpack:///./src/bullet.js?");
  
  /***/ }),
  
  /***/ "./src/game.js":
  /*!*********************!*\
    !*** ./src/game.js ***!
    \*********************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  eval("const Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\n\nfunction Game () {\n    this.asteroids = this.addAsteroids();\n    this.ship = this.addShip();\n    this.bullets = [];\n}\n\nGame.DIM_X = 500;\nGame.DIM_Y = 500;\nGame.NUM_ASTEROIDS = 40;\nGame.prototype.randomPosition = function () {\n    return [Math.floor( Math.random() * Game.DIM_X),\n        Math.floor(Math.random() * Game.DIM_Y) ]\n};\nGame.prototype.addAsteroids = function () {\n    let context = this;\n    let num = Game.NUM_ASTEROIDS;\n    let asteroids = [];\n    while (num > 0, num--) {\n        asteroids.push(new Asteroid({game: context, pos: Game.prototype.randomPosition()}))\n    }\n    return asteroids\n};\n\nGame.prototype.addBullet = function (vel, pos) {\n    let contxt = this;\n    this.bullets.push(new Bullet({game: contxt, pos: pos, vel: vel}));\n};\n\nGame.prototype.addShip = function () {\n    return new Ship({game: this, pos: Game.prototype.randomPosition()})\n};\n\nGame.prototype.allObjects = function() {\n    return this.asteroids.slice(0).concat([this.ship]).concat(this.bullets.slice(0))\n};\n\nGame.prototype.render = function(ctx){\n    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n    this.allObjects().forEach(ast => ast.draw(ctx));\n\n};\n\nGame.prototype.moveObjects = function (){\n    this.asteroids.map(ast => {\n        ast.move();\n    });\n    this.bullets.map(bul => {\n        bul.move();\n    })\n};\n\nGame.prototype.wrap = function(pos) {\n    if (pos[0] <= 0.5 ) { pos[0] = Game.DIM_X - 1}\n    if (pos[1] <= 0.5 ) { pos[1] = Game.DIM_Y - 1}\n    if (pos[0] >= Game.DIM_X - 0.5) { pos[0] = 1 }\n    if (pos[1] >= Game.DIM_Y - 0.5) { pos[1] = 1 }\n    return pos\n};\n\nGame.prototype.checkCollisions = function() {\n    this.asteroids.forEach(ast => {\n        if (ast.isCollidedWith(this.ship)) {\n            ast.collideWith(this.ship)\n        }\n        this.bullets.forEach(bullet => {\n            if (bullet.isCollidedWith(ast)) {\n                bullet.collideWith(ast)\n            }\n        })\n    })\n};\n\nGame.prototype.step = function (ctx) {\n    this.moveObjects();\n    this.checkCollisions();\n    this.render(ctx)\n};\n\nGame.prototype.removeAst = function(obj) {\n    let idx = this.asteroids.indexOf(obj);\n    this.asteroids.splice(idx, 1);\n    return this.asteroids\n};\n\nGame.prototype.removeBullet = function (bul) {\n    let idx = this.bullets.indexOf(bul);\n    this.bullets.splice(idx, 1);\n    return this.bullets\n};\n\n\nGame.prototype.isOffEdge = function (pos) {\n    return (pos[0] <= 0 ) ||\n        (pos[1] <= 0 ) ||\n        (pos[0] >= Game.DIM_X) ||\n        (pos[1] >= Game.DIM_Y)\n};\n\nmodule.exports = Game;\n\n\n\n\n\n//# sourceURL=webpack:///./src/game.js?");
  
  /***/ }),
  
  /***/ "./src/game_view.js":
  /*!**************************!*\
    !*** ./src/game_view.js ***!
    \**************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  eval("const game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\nfunction GameView(ctx) {\n    this.game = new Game();\n    this.ctx = ctx;\n    this.ship = this.game.ship\n}\n\nGameView.prototype.start = function () {\n    setInterval(() => {\n        this.bindKeyHandlers();\n        this.game.step(this.ctx);\n    }, 20);\n};\n\nGameView.prototype.bindKeyHandlers = function () {\n    let context = this.ship;\n    if(key.isPressed ('a') || key.isPressed ('left')) this.ship.power([-5, 0]);\n    if(key.isPressed ('w') || key.isPressed ('up')) this.ship.power([0, -5]);\n    if(key.isPressed ('d') || key.isPressed ('right')) this.ship.power([5, 0]);\n    if(key.isPressed ('s') || key.isPressed ('down')) this.ship.power([0, 5]);\n    if(key.isPressed ('space')) this.ship.fireBullet();\n\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");
  
  /***/ }),
  
  /***/ "./src/index.js":
  /*!**********************!*\
    !*** ./src/index.js ***!
    \**********************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  eval("console.log(\"Webpack is working!\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\nwindow.MovingObject = MovingObject;\nwindow.Asteroid = Asteroid;\nwindow.Game = Game;\nwindow.Ship = Ship;\nwindow.Bullet = Bullet;\nwindow.addEventListener('DOMContentLoaded', (event) => {\n    console.log('DOM fully loaded and parsed');\n    const gameCanvas = document.getElementById(\"game-canvas\");\n    gameCanvas.height = 500;\n    gameCanvas.width = 500;\n    window.ctx = gameCanvas.getContext('2d');\n    const contx = gameCanvas.getContext('2d');\n    const gameView = new GameView(contx);\n    console.log(\"have a game view: \", gameView);\n    gameView.start();\n    console.log(\"started gameView\");\n});\n\n//# sourceURL=webpack:///./src/index.js?");
  
  /***/ }),
  
  /***/ "./src/moving_object.js":
  /*!******************************!*\
    !*** ./src/moving_object.js ***!
    \******************************/
  /*! no static exports found */
  /***/ (function(module, exports) {
  
  eval("function MovingObject({game, pos, vel, radius, color}){\n    this.game = game;\n    this.pos = pos;\n    this.vel = vel;\n    this.radius = radius;\n    this.color = color;\n    }\n\nMovingObject.prototype.draw = function(ctx) {\n    ctx.fillStyle = this.color;\n    ctx.strokeStyle = this.color;\n    ctx.beginPath();\n\n    ctx.arc(\n        this.pos[0],\n        this.pos[1],\n        this.radius,\n        0,\n        2 * Math.PI,\n        );\n    ctx.stroke();\n    ctx.fill();\n\n};\n\nMovingObject.prototype.isWrappable = true;\n\nMovingObject.prototype.move = function() {\n\n    this.pos[0] = this.pos[0] + this.vel[0];\n    this.pos[1] = this.pos[1] + this.vel[1];\n    if (this.isWrappable) {this.game.wrap(this.pos)}\n    else { if (this.game.isOffEdge(this.pos)) {this.game.removeBullet(this)} }\n    // Dist([currentX, currentY], [newX, newY]) = speed([currentX, currentY])\n    // Dist([currentX, currentY], [newX, newY]) =\n    // = Math.sqrt((currentX - newX) ** 2 + (currentY - newY) ** 2)\n};\n\nMovingObject.prototype.isCollidedWith = function (otherObject){\n    if (this instanceof Bullet && otherObject instanceof Ship) return false;\n    else {\n        return this !== otherObject &&\n        Math.abs(this.pos[0] - otherObject.pos[0]) <= this.radius+1 + otherObject.radius+1 &&\n        Math.abs(this.pos[1] - otherObject.pos[1]) <= this.radius+1 + otherObject.radius+1}\n};\n\nMovingObject.prototype.collideWith = function(otherObject) {\n\n};\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");
  
  /***/ }),
  
  /***/ "./src/ship.js":
  /*!*********************!*\
    !*** ./src/ship.js ***!
    \*********************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  eval("const util = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\n\nfunction Ship({game, pos}) {\n    MovingObject.call(this, {\n        game,\n        pos,\n        vel: [0, 0],\n        radius: 15,\n        color: \"blueviolet\"});\n}\n\nutil.inherits(Ship, MovingObject);\nShip.prototype.relocate = function() {\n    this.pos = this.game.randomPosition()\n};\n\nShip.prototype.power = function(impulse) {\n    this.vel[0] += impulse[0];\n    this.vel[1] += impulse[1];\n    this.move();\n    this.vel = [0,0];\n};\n\nShip.prototype.fireBullet = function() {\n  let bul_vel = util.randomVec(7);\n  if (this.vel[0] !== 0) bul_vel[0] = this.vel[0] * 1.2;\n  if (this.vel[1] !== 0) bul_vel[1] = this.vel[1] * 1.2;\n\n  let bul_pos = [this.pos[0] + this.vel[0] + bul_vel[0],\n                 this.pos[1] + this.vel[1] + bul_vel[1]\n                ];\n  this.game.addBullet(bul_vel, bul_pos);\n};\n\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");
  
  /***/ }),
  
  /***/ "./src/utils.js":
  /*!**********************!*\
    !*** ./src/utils.js ***!
    \**********************/
  /*! no static exports found */
  /***/ (function(module, exports) {
  
  eval("const Util = {\n    inherits: function inherits(childClass, parentClass) {\n        childClass.prototype = Object.create(parentClass.prototype);\n        childClass.prototype.constructor = childClass;\n    },\n    randomVec:  function randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n    // Scale the length of a vector by the given amount.\n    scale: function scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];\n    },\n    randomColor: function randomColor(){\n        const HEX_DIGITS = \"0123456789ABCDEF\";\n        let color = \"#\";\n        for (let i = 0; i < 6; i++) {\n            color += HEX_DIGITS[Math.floor((Math.random() * 16))];\n        }\n        return color;\n    }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/utils.js?");
  
  /***/ })
  
  /******/ });