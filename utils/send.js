const fs = require('fs')
const mime = require('mime')

exports.sendFiles = function(path,res){
    // 利用fs模块读取文件并作为响应数据
     fs.readFile(path,function(err,data){
        if(err && err.code ==='ENOENT'){
            res.writeHead("404")
            res.end('404')
            return
        }
        var mimeType = mime.lookup(path)
        var charset = mime.charsets.lookup(mimeType)
        // 利用mime模块进行响应头定义
        res.setHeader('Content-Type',mimeType+(charset?';charset='+charset:''))
        res.end(data)
    })
}

exports.redirect = function(location,res,statusCode){
    statusCode = statusCode || 302
    res.writeHead(statusCode,{
        location:location
    })
    res.end()
}
exports.sendError = function(err,res,statusCode){
    statusCode = statusCode || 500
    res.writeHead(statusCode)
    res.end(err,message)
}