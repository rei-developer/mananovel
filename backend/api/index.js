const Router = require('koa-router')
const v1 = require('./v1')

const app = new Router()

app.use('/v1', v1.routes())

module.exports = app
