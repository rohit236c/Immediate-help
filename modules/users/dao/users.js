const User = require('../model/userSchema');

const userDao = {
    getAll: (query, limit, order = {
        _id: 'desc'
    }) => {
        return new Promise((resolve, reject) => {
            User
                .find(query, null, {
                    limit,
                    order
                }, function (err, users) {
                    if (err) {
                        reject({success: false, status: 500, message: 'Error in processing Query'});
                    } else {
                        resolve({success: true, message: 'Successfully retrieved user', users});
                    }
                });
        });
    },
    createUser: (newUserObj) => {
        let newUser = new User(newUserObj);
        return new Promise((resolve, reject) => {
            newUser
                .save(function (err, savedUser) {
                    if (err) {
                        reject({success: false, status: 500, error: err, message: 'Error in processing Query'});
                    } else {
                        resolve({message: 'Successfully Created User', success: true, savedUser});
                    }
                });
        });
    },
    getOneUser: function (query) {
        return new Promise((resolve, reject) => {
            User.findOne(query, function (err, user) {
                if (err) {
                    return reject({
                        success: false,
                        status: 500,
                        message: 'Error in processing Query'
                    });
                } 
                else if(!user){
                    return reject({
                        meta: 404,
                        message: 'No User Found',
                        success: false
                    });
                }
                else {
                    return resolve({
                        success: true,
                        message: 'Successfully retrieved user',
                        user
                    });
                }
            });
        });
    },
}
module.exports = userDao;