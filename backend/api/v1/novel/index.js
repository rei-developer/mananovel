const Router = require('koa-router')
const common = require('./common')
const game = require('./game')

const app = new Router()

app.use('/common', common.routes())
app.use('/game', game.routes())

module.exports = app
