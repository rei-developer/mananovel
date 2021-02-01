const Router = require('koa-router')
const Controller = require('./controller')

const app = new Router()

app.post('/verify', Controller.getVerify)

module.exports = app
