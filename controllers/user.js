const cookies = require('../utils/cookies')
const send = require('../utils/send')
const joinPath = require('path').join
const multiparty = require('multiparty')
const models = require('../models')

exports.user = function(req,res){
    
    models.user.get(req.userId, function (err, user) {
        if (err) {
            return send.sendError(err, res)
        }
        res.end(JSON.stringify(user))
    })
}
const uploadDir = joinPath(__dirname , '../data/upload')
exports.myavatar = function(req, res) {
    if(!req.userId){
        return send.sendError(new Error('not_login'), res)
    }
    var form = new multiparty.Form({
        uploadDir: uploadDir
    })  
    // multiparty解析,主要针对文件上传请求
    form.parse(req, function(err, fields, files){
        if(err ) {
            return send.sendError(err,res)
        }
        var newPath = files.file[0].path.replace(uploadDir,'')
        // console.log('newPath',newPath)
        var url = 'http://localhost:3000/upload/' + newPath
        models.user.updatePart(req.userId, {avatar: url}, function(err, info){
            if(err){
                send.sendError(err, res)
            }
            res.end(JSON.stringify({
                avatar: url
            }))
        })
    })
}