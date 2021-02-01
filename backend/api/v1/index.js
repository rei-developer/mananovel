const Router = require('koa-router')
const captcha = require('./captcha')
const novel = require('./novel')

const app = new Router()

app.use('/captcha', captcha.routes())
app.use('/novel', novel.routes())

module.exports = app
