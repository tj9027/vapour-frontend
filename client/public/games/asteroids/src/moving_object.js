function MovingObject({game, pos, vel, radius, color}){
    this.game = game;
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    }

MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.beginPath();

    ctx.arc(
        this.pos[0],
        this.pos[1],
        this.radius,
        0,
        2 * Math.PI,
        );
    ctx.stroke();
    ctx.fill();

};

MovingObject.prototype.isWrappable = true;

MovingObject.prototype.move = function() {

    this.pos[0] = this.pos[0] + this.vel[0];
    this.pos[1] = this.pos[1] + this.vel[1];
    if (this.isWrappable) {this.game.wrap(this.pos)}
    else { if (this.game.isOffEdge(this.pos)) {this.game.removeBullet(this)} }
    // Dist([currentX, currentY], [newX, newY]) = speed([currentX, currentY])
    // Dist([currentX, currentY], [newX, newY]) =
    // = Math.sqrt((currentX - newX) ** 2 + (currentY - newY) ** 2)
};

MovingObject.prototype.isCollidedWith = function (otherObject){
    if (this instanceof Bullet && otherObject instanceof Ship) return false;
    else {
        return this !== otherObject &&
        Math.abs(this.pos[0] - otherObject.pos[0]) <= this.radius+1 + otherObject.radius+1 &&
        Math.abs(this.pos[1] - otherObject.pos[1]) <= this.radius+1 + otherObject.radius+1}
};

MovingObject.prototype.collideWith = function(otherObject) {

};

module.exports = MovingObject;