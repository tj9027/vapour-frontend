const util = require("./utils.js");
const MovingObject = require("./moving_object.js");

function Bullet({game, pos, vel}) {
    MovingObject.call(this, {
        game,
        pos,
        vel,
        radius: 3,
        color: util.randomColor()});
}

util.inherits(Bullet, MovingObject);

Bullet.prototype.isWrappable = false;

Bullet.prototype.collideWith = function(otherObject) {
    this.game.removeAst(otherObject)
};

module.exports = Bullet;