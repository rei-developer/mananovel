const Router = require('koa-router')
const Controller = require('./controller')

const app = new Router()

app.get('/widget', Controller.getSaveWidgetList)
app.get('/thumb', Controller.getSaveThumbList)
app.get('/:idx', Controller.getSaveContent)
app.post('/file', Controller.getSaveFileList)
app.post('/magnet', Controller.getSaveMagnetList)
app.post('/', Controller.getSaveList)

module.exports = app
