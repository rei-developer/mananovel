const Router = require('koa-router')
const captcha = require('./captcha')
// const search = require('./search')

const app = new Router()

app.get('/', ctx => ctx.body = {
  version: 1,
  status: 'ok'
})
app.use('/captcha', captcha.routes())
// app.use('/search', search.routes())

module.exports = app
