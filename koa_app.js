const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const mount = require('koa-mount')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const session = require('koa-generic-session')
const redisSessionStore = require('koa-redis')
const logger = require('koa-logger')

const router =require('./routes').router

app.keys = ['abcde12345']
app.use(logger())

app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(mount('/static', require('koa-static')(__dirname + '/public')))
app.use(mount('/upload', require('koa-static')(__dirname + '/data/upload')))
app.use(bodyparser())
app.use(json())
app.use(session({
    store:redisSessionStore({
        // option
        host:'localhost'
    })
}))

app.use(views(__dirname + '/views', {
    extension: 'html'
}))

app.use(router.routes(), router.allowedMethods())

app.on('error',function(err, ctx){
    console.log(err)
    logger.error('server error', err, ctx)
})

app.listen(3000)

module.exports = app