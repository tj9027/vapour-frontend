const util = require("./utils.js");
const MovingObject = require("./moving_object.js");

function Asteroid({game, pos}) {
    MovingObject.call(this, {
                        game,
                        pos,
                        vel: util.randomVec(5),
                        radius: 10,
                        color: "aquamarine"});
}

util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Ship) {
        otherObject.relocate();
    }
};

module.exports = Asteroid;
