const cookies = require('../utils/cookies')
const send = require('../utils/send')
const models = require('../models')
const authorize = require('../middlerwares/authorize')

module.exports = authorize(function(req,res){
    
    models.user.get(req.userId, function (err, user) {
        if (err) {
            return send.sendError(err, res)
        }
        res.end(JSON.stringify(user))
    })
})