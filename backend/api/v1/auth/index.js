const Router = require('koa-router')
const Controller = require('./controller')
const {isAuthenticated} = require('../../../middleware/auth')

const app = new Router()

app.get('/kakao', Controller.getTokenOfKakao)
app.get('/user/kakao', isAuthenticated, Controller.getUserOfKakao)

module.exports = app
