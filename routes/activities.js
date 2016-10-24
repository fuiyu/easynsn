const router = module.exports = require('koa-router')()
const services = require('../service')

router.get('/',async (ctx) => {
    console.log(ctx.query)
    const page = parseInt(ctx.query.page, 10)
    ctx.body = await services.activity.getTimeline(ctx.session.userId, page, 3)
})
router.post('/',async (ctx) => {
    const body = ctx.request.body
    console.log(body)
    const activity = {
        userId: ctx.session.userId,
        content: body.content
    }

    ctx.body = await services.activity.publish(activity)
})