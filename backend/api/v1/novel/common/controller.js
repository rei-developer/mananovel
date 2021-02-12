const {
  getNovelPicture,
  getNovelAudio
} = require('../../../../database/novel/game/read')

module.exports.getNovelPictureImageUrl = async ctx => {
  const id = ctx.params.id
  const picture = await getNovelPicture(id)
  ctx.body = {
    status: 'DONE',
    picture
  }
}

module.exports.getNovelAudioUrl = async ctx => {
  const id = ctx.params.id
  const audio = await getNovelAudio(id)
  ctx.body = {
    status: 'DONE',
    audio
  }
}
