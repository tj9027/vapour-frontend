const Asteroid = require("./asteroid.js");
const Ship = require("./ship.js");
const Bullet = require("./bullet.js");

function Game () {
    this.asteroids = this.addAsteroids();
    this.ship = this.addShip();
    this.bullets = [];
}

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 40;
Game.prototype.randomPosition = function () {
    return [Math.floor( Math.random() * Game.DIM_X),
        Math.floor(Math.random() * Game.DIM_Y) ]
};
Game.prototype.addAsteroids = function () {
    let context = this;
    let num = Game.NUM_ASTEROIDS;
    let asteroids = [];
    while (num > 0, num--) {
        asteroids.push(new Asteroid({game: context, pos: Game.prototype.randomPosition()}))
    }
    return asteroids
};

Game.prototype.addBullet = function (vel, pos) {
    let contxt = this;
    this.bullets.push(new Bullet({game: contxt, pos: pos, vel: vel}));
};

Game.prototype.addShip = function () {
    return new Ship({game: this, pos: Game.prototype.randomPosition()})
};

Game.prototype.allObjects = function() {
    return this.asteroids.slice(0).concat([this.ship]).concat(this.bullets.slice(0))
};

Game.prototype.render = function(ctx){
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach(ast => ast.draw(ctx));

};

Game.prototype.moveObjects = function (){
    this.asteroids.map(ast => {
        ast.move();
    });
    this.bullets.map(bul => {
        bul.move();
    })
};

Game.prototype.wrap = function(pos) {
    if (pos[0] <= 0.5 ) { pos[0] = Game.DIM_X - 1}
    if (pos[1] <= 0.5 ) { pos[1] = Game.DIM_Y - 1}
    if (pos[0] >= Game.DIM_X - 0.5) { pos[0] = 1 }
    if (pos[1] >= Game.DIM_Y - 0.5) { pos[1] = 1 }
    return pos
};

Game.prototype.checkCollisions = function() {
    this.asteroids.forEach(ast => {
        if (ast.isCollidedWith(this.ship)) {
            ast.collideWith(this.ship)
        }
        this.bullets.forEach(bullet => {
            if (bullet.isCollidedWith(ast)) {
                bullet.collideWith(ast)
            }
        })
    })
};

Game.prototype.step = function (ctx) {
    this.moveObjects();
    this.checkCollisions();
    this.render(ctx)
};

Game.prototype.removeAst = function(obj) {
    let idx = this.asteroids.indexOf(obj);
    this.asteroids.splice(idx, 1);
    return this.asteroids
};

Game.prototype.removeBullet = function (bul) {
    let idx = this.bullets.indexOf(bul);
    this.bullets.splice(idx, 1);
    return this.bullets
};


Game.prototype.isOffEdge = function (pos) {
    return (pos[0] <= 0 ) ||
        (pos[1] <= 0 ) ||
        (pos[0] >= Game.DIM_X) ||
        (pos[1] >= Game.DIM_Y)
};

module.exports = Game;



