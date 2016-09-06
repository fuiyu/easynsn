var http = require('http')
var controllers = require('./controllers')
var parseUrl = require('url').parse

function notFoundContoller(req,res){
    res.writeHead('404')
    res.end('not found')
    
}
const rules = [
    {path:'/',controller:controllers.home},
    {path:'/user',controller:controllers.user},
    {path:/^\/static(\/.*)/,controller:controllers.static}
]

function find(ary, match) {
    for(var i = 0;i<ary.length;i++){
        if(match(ary[i])) return ary[i]
    }
}
var server = http.createServer(function(req, res){
    var urlInfo = parseUrl(req.url)
    var rule = find(rules,function(rule){
        if(rule.path instanceof RegExp){
            var macthResult = urlInfo.pathname.match(rule.path)
            if(macthResult){
                 req.params = macthResult
            }
            return macthResult;
        }
            return rule.path == urlInfo.pathname;            
        
    })
    var controller = rule && rule.controller || notFoundContoller
    controller(req,res)
})

server.listen(3000)