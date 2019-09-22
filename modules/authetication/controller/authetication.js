const userDao = require('../../users/dao/users');
const {createToken} = require('../token.util/util');
const validate = require('../validate/validate');
const resBuilder = require('../responseBuilder/response');

const autheticationController = {
    signup: (req, res, next) => {
        validate
            .encryptPassword(req.body.password)
            .then((hash) => {
                let userObj = {
                    email: req.body.email,
                    phone: req.body.phone,
                    password: hash
                };
                userDao
                    .createUser(userObj)
                    .then((result) => {
                        meta = {
                            status: result.status,
                            message: result.message,
                            success: result.success
                        };
                        let userObj = {
                            id: result.savedUser._id,
                            email: result.savedUser.email,
                            phone: result.savedUser.phone
                        };
                        let token = createToken(userObj);
                        data = {
                            type: "token",
                            attributes: {
                                value: token
                            }
                        };
                        let json = resBuilder('create', meta, data);
                        res.json(json);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
            }).catch(err=>res.json(err));
    },
    login: (req, res, next) => {
        if(req.body.email){
            query = {
                email: req.body.email || null,
            };
        }
        else{
            query = {
                phone: req.body.phone || null
            };
        }
        
        userDao
            .getOneUser(query)
            .then((result) => {
                let userObj = {
                    id: result.user._id,
                    email: result.user.email || null,
                    phone: result.user.phone || null
                };
                let token = createToken(userObj);
                validate
                    .isValidPassword(req.body.password, result.user, token)
                    .then((result) => {
                        meta = {
                            status: result.status,
                            message: result.message,
                            success: result.success
                        }
                        data = {
                            type: "token",
                            attributes: {
                                value: result.token
                            }
                        }
                        let json = resBuilder('create', meta, data);
                        res.json(json);
                    })
                    .catch((err) => {
                        console.log(err)
                        res.json(err);
                    });
            })
            .catch(err => res.json(err));
    },
    forgotPass: function(req,res,next) { 
        if(req.body.email){
            query = {
                email: req.body.email || null,
            };
        }
        else{
            query = {
                phone: req.body.phone || null
            };
        }
       userDao.getOneUser(query).then((result)=>{
        let userObj = {
            id: result.user._id,
            email: result.user.email || null,
            phone: result.user.phone|| null
        };
        let meta  = {
            status: 200,
            message: 'Email Successfully sent',
            success: true
        };
        let token = createToken(userObj);
        //sending email service here...
       
        let json = resBuilder('create', meta, null);
        res.json(meta);

       }).catch((err)=>{
            return res.json({
                meta: err
            });
       });
    },
    resetPass: function(req,res,next) {
        if(req.auth.user.email){
            query = {
                email: req.auth.user.email || null,
            };
        }
        else{
            query = {
                phone: req.auth.user.phone || null
            };
        }
    }
};

module.exports = autheticationController;