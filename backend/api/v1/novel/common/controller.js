const {
  getNovelPicture
} = require('../../../../database/novel/game/read')

module.exports.getNovelPictureImageUrl = async ctx => {
  const id = ctx.params.id
  const background = await getNovelPicture(id)
  ctx.body = {
    status: 'DONE',
    background
  }
}
