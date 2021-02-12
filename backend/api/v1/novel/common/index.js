const Router = require('koa-router')
const {
  getNovelPictureImageUrl,
  getNovelAudioUrl
} = require('./controller')

const app = new Router()

app.get('/picture/:id', getNovelPictureImageUrl)
app.get('/audio/:id', getNovelAudioUrl)

module.exports = app
