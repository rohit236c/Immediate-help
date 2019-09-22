const Users = require('./controller/users');
module.exports = (router) => {
    router.get('/users',Users.getAllUser);
    router.post('/users',Users.createUser);

}