const jwt = require('jsonwebtoken');
const config  = require('../../../config/config');
module.exports = {
    createToken: function (user) {
        user.id = user.id ? user.id : null;
        user.email = user.email ? user.email : null;
        user.phone = user.phone ? user.phone : null;
        return jwt.sign({
            user
        }, config.development.jwtSecret.secret, {expiresIn: '24h'});
    }
};