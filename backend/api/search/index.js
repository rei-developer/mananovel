const Router = require('koa-router')
const Controller = require('./controller')

const {getUserLimiter} = require('../../middleware/rate-limit')

const app = new Router()

app.middleware()
app.get('/widget/:type', getUserLimiter, Controller.getSearchListWithWidget)
app.get('/list/:text', getUserLimiter, Controller.getSearchList)
app.get('/', Controller.getSaveListWithSearch)

module.exports = app
