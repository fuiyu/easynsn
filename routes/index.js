const router = require('koa-router')()

exports.router = router

router.get('/',async (ctx) => {
    ctx.body = 'hello world'
    const islogin = false
    await ctx.render(islogin ? 'home' : 'welcome')
})

router.post('/test', async (ctx) => {
    ctx.headers['Content-Type'] = 'application/json'
    ctx.body = '{"foo":"bar"}'
    ctx.body = {
        foo : 'bar',
        headers: ctx.headers,
        postBody: ctx.request.body
    }
})