const bcrypt = require('bcrypt');
const config = require('../../../config/config');
const jwt = require('jsonwebtoken');
const validate = {
    encryptPassword: (password) => {
        return new Promise((resolve, reject) => {
            if(!password){
                return reject({message: "no pass"});
            }
            bcrypt
                .hash(password, 10)
                .then(function (hash) {
                    return resolve(hash);
                })
                .catch(err => reject(err));
        });
    },
    isValidPassword: function (password, user, token) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    reject({error: err, success: false, status: 500, message: 'Error in processing Query'});
                } else {
                    if (!result) {
                        reject({error: err, status: 401, success: false, message: "Password does not match"});
                    } else {
                        resolve({status: 200, success: true, message: 'Logged In Successfully', token});
                    }
                }
            });
        });
    },
    validateToken: function (req, res, next) {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (typeof token === 'undefined') {
            console.log('No authorization header');
            res.json({"status": 401, "message": "No Token"});
        } else {
            const bearer = token.split(' ');
            token = bearer[1];
            if (token) {
                return new Promise((resolve, reject) => {
                    jwt.verify(token, config.development.jwtSecret.secret, (err, decode) => {
                        if (err) {
                            res.json({status: 401, success: false, message: "Invalid token"});
                        } else {
                            req.auth = decode;
                            resolve(req);
                            next();
                        }
                    });
                });
            } else {
                res.json({status: 401, success: false, message: "Token Error"});
            }
        }
    }
}
module.exports = validate;