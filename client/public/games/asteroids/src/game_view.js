const game = require("./game.js");

function GameView(ctx) {
    this.game = new Game();
    this.ctx = ctx;
    this.ship = this.game.ship
}

GameView.prototype.start = function () {
    setInterval(() => {
        this.bindKeyHandlers();
        this.game.step(this.ctx);
    }, 20);
};

GameView.prototype.bindKeyHandlers = function () {
    let context = this.ship;
    if(key.isPressed ('a') || key.isPressed ('left')) this.ship.power([-5, 0]);
    if(key.isPressed ('w') || key.isPressed ('up')) this.ship.power([0, -5]);
    if(key.isPressed ('d') || key.isPressed ('right')) this.ship.power([5, 0]);
    if(key.isPressed ('s') || key.isPressed ('down')) this.ship.power([0, 5]);
    if(key.isPressed ('space')) this.ship.fireBullet();

};

module.exports = GameView;