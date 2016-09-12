const sendFile = require('../utils/send.js').sendFiles
const joinPath = require('path').join
const viewPath = joinPath(__dirname,'../views')

module.exports = function(req,res){
    var isLogin = !!req.userId
    var view = isLogin?'home.html' : 'welcome.html'
    sendFile(joinPath(viewPath,view),res)
}