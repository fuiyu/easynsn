const send = require('../utils/send')
const qs = require('querystring')
const parseBody = require("../utils/parseBody.js")

exports.login = function(req,res){
    parseBody(req,function(err,body){
        if(err){
            send.sendError(err,res)
            return
        }
        send.redirect('/',res)
    })
}
exports.register = function(req,res){
     parseBody(req,function(err,body){
        if(err){
            send.sendError(err,res)
            return
        }
        send.redirect('/',res)
    })
}