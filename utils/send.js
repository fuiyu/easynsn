const fs = require('fs')
const mime = require('mime')

module.exports = function(path,res){
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