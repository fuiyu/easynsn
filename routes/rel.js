const router = module.exports = require('koa-router')()
const models = require('../models')

router.post('/follow', async(ctx) => {
    const body = ctx.request.body
    await models.relation.follow(ctx.session.userId, body.userId)
    ctx.body = {status:'ok'}
})

router.post('/unfollow', async(ctx) => {
    const body = ctx.request.body
    console.log(ctx.request.body)
    
    await models.relation.unfollow(ctx.session.userId, body.userId)
    ctx.body = {status:'ok'}
})