const autheticationController = require('./controller/authetication');
module.exports = (router) => {
    router.post('/signup',autheticationController.signup);
    router.post('/login',autheticationController.login);
    router.post('/forgot_password',autheticationController.forgotPass);
    router.post('/users/reset-password',autheticationController.resetPass);
}