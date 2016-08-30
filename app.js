var http = require('http')
var parseUrl = require('url').parse

function homeController(req,res){
    res.end('home')
}

function userController(req,res){
    res.end('user')
}
function notFoundContoller(req,res){
    res.writeHead('404')
    res.end('not found')
    
}
const rules = [
    {path:'/',controller:homeController},
    {path:'/user',controller:userController},
]

function find(ary, match) {
    for(var i = 0;i<ary.length;i++){
        if(match(ary[i])) return ary[i]
    }
}
var server = http.createServer(function(req, res){
    var urlInfo = parseUrl(req.url)
    var rule = find(rules,function(rule){
        return rule.path == urlInfo.pathname;
    })
    var controller = rule && rule.controller || notFoundContoller
    controller(req,res)
})

server.listen(3000)