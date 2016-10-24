const router = module.exports = require('koa-router')()
const models = require('../models')
const services = require('../service')
const ObjectId = require('mongodb').ObjectId
// GET /user/ 当前用户信息
router.get('/', async (ctx) => {
    var before = ctx.query.before || new ObjectId(Date.now())
    var rows = await models.user.findBefore(before).toArray()
    ctx.body = await services.user.normalizedList(rows, ctx.session.userId)
})