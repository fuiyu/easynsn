const sendFile = require('../utils/send.js').sendFiles
const joinPath = require('path').join
// path模块进行路径拼接
const publicPath = joinPath(__dirname,'../public')

module.exports = function(req,res){
    var path = req.params[1]
    path = joinPath(publicPath,path)
    sendFile(path,res)
}