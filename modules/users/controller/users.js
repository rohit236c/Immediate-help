const userDao = require('../dao/users');

const userController = {
    createUser: (req, res, next) => {
        let data = req.body;
        let userObj = {
            email: data.email,
            password: data.password
        };
        userDao
            .createUser(userObj)
            .then((result) => {
                return res.json(result);
            })
            .catch((err) => {
                res.json(err);
            })

    },
    getAllUser: (req, res, next) => {
        let limit = req.query.limit
            ? parseInt(req.query.limit)
            : 10;
        let query = {
            status: true
        };
        userDao
            .getAll(query, limit)
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.json(err);
            });
    }
}
module.exports = userController;