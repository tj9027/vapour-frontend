const util = require("./utils.js");
const MovingObject = require("./moving_object.js");
const Bullet = require("./bullet.js");

function Ship({game, pos}) {
    MovingObject.call(this, {
        game,
        pos,
        vel: [0, 0],
        radius: 15,
        color: "blueviolet"});
}

util.inherits(Ship, MovingObject);
Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition()
};

Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
    this.move();
    this.vel = [0,0];
};

Ship.prototype.fireBullet = function() {
  let bul_vel = util.randomVec(7);
  if (this.vel[0] !== 0) bul_vel[0] = this.vel[0] * 1.2;
  if (this.vel[1] !== 0) bul_vel[1] = this.vel[1] * 1.2;

  let bul_pos = [this.pos[0] + this.vel[0] + bul_vel[0],
                 this.pos[1] + this.vel[1] + bul_vel[1]
                ];
  this.game.addBullet(bul_vel, bul_pos);
};


module.exports = Ship;