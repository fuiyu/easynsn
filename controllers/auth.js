const send = require('../utils/send')
const qs = require('querystring')
const parseBody = require("../utils/parseBody")
const models = require("../models")
// crypto提供http或https中封装安全凭证的方法（加密）
const crypto = require("crypto")
const userModel = models.user
const tokenModel = models.token

function generateToken(userId, callback){
    
    var token = crypto.randomBytes(16).toString('hex');
    tokenModel.update(token, userId, function(err){
        if(err){
            return callback(err)
        }
        callback(null, token)
    })
}

function doLogin(userId, res){
    generateToken(userId, function(err, token){
        if(err){
            return send.sendError(err,res)
        }
        res.writeHead(302,{
            'Set-Cookie': 'token=' + token +';path=/;http-only',
            location:'/'
        })
        res.end()
    })
}

exports.login = function(req,res){
    parseBody(req,function(err,body){
        if(err){
            send.sendError(err,res)
            return
        }
        userModel.getByEmail(body.email, function(err, user){
            if(err){
                return send.sendError(err,res)
            }
            if(!user){
                return send.redirect('/?err=no_user', res)
            }
            if(body.password !== user.password){
                return send.redirect('/?err=invalid_pass',res)
            }
            doLogin(user.id, res)
            // send.redirect('/',res)    
        })
    })
}
exports.register = function(req,res){
     parseBody(req,function(err,body){
        if(err){
            send.sendError(err,res)
            return
        }
        var user={
            email:body.email,
            password:body.password,
            nickname:body.nickname
        }
        userModel.create(user,function(err){
            if(err){
                return send.sendError(err, res)
            }
            doLogin(user.id, res);
        })
    })
}