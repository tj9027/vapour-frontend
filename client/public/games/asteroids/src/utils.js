const Util = {
    inherits: function inherits(childClass, parentClass) {
        childClass.prototype = Object.create(parentClass.prototype);
        childClass.prototype.constructor = childClass;
    },
    randomVec:  function randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    },
    // Scale the length of a vector by the given amount.
    scale: function scale(vec, m) {
        return [vec[0] * m, vec[1] * m];
    },
    randomColor: function randomColor(){
        const HEX_DIGITS = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += HEX_DIGITS[Math.floor((Math.random() * 16))];
        }
        return color;
    }
};

module.exports = Util;