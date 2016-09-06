const sendFile = require('../utils/send.js')
const joinPath = require('path').join
// path模块进行路径拼接
const publicPath = joinPath(__dirname,'../public')

module.exports = function(req,res){
    // console.log(req.params)
    var path = req.params[1]
    path = joinPath(publicPath,path)
    sendFile(path,res)
}