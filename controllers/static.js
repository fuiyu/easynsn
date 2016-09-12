const sendFile = require('../utils/send.js').sendFiles
const joinPath = require('path').join
// path模块进行路径拼接
const publicPath = joinPath(__dirname,'../public')
const uploadDir = joinPath(__dirname,'../data/upload')

var exports = module.exports = function(req,res){
    var path = req.params[1]
    path = joinPath(publicPath,path)
    sendFile(path,res)
}

exports.upload = function(req, res) {
    var path = req.params[1]
    path = joinPath(uploadDir, path)
    sendFile(path, res)
}