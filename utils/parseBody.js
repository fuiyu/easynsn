const qs = require('querystring')
const getRawBody = require('./getRawBody')
module.exports = function (req,callback) {  
    getRawBody(req,function(err,rawBody){
        if(err){
            return callback(err)
        }
        var type = req.headers['content-type']
        type = type.split(';')[0]
        if(type === 'applicate/x-www-form-urlrencoded'){
            var body = qs.parse(rawBody);
            callback(null,body)
            return
        }
        callback()
    })
}