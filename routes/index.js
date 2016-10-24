const router = require('koa-router')()
// const Auth = require('./auth')
// const User = require('./user')
exports.router = router

function useRoute(name){
    const rt = require(`./${name}`)
    router.use(`/${name}`,rt.routes(), rt.allowedMethods())
}
;['auth','user','users','rel','activities'].forEach(useRoute)


// router.use('/auth',Auth.routes(),Auth.allowedMethods())
// router.use('/user',User.routes(),User.allowedMethods())
router.get('/',async (ctx) => {
    ctx.body = 'hello world'
    const islogin = !!ctx.session.userId
    await ctx.render(islogin ? 'home' : 'welcome')
})

router.post('/my/avatar',require('./upload'))
router.post('/test', async (ctx) => {
    ctx.headers['Content-Type'] = 'application/json'
    ctx.body = '{"foo":"bar"}'
    ctx.body = {
        foo : 'bar',
        headers: ctx.headers,
        postBody: ctx.request.body
    }
})

router.get('/session/get', async (ctx) => {
    ctx.body = ctx.session
})

router.get('/session/set', async (ctx) => {
    ctx.session.foo = 'bar'
    ctx.session.time - Date.now()
    ctx.body = ctx.session
})
router.get('/session/reset', async (ctx) => {
    ctx.session = null
    ctx.body = 'reseted'
})