const Router = require('koa-router')
const {
  getNovelPictureImageUrl
} = require('./controller')

const app = new Router()

app.get('/picture/:id', getNovelPictureImageUrl)

module.exports = app
