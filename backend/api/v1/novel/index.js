const Router = require('koa-router')
const game = require('./game')

const app = new Router()

app.use('/game', game.routes())

module.exports = app
