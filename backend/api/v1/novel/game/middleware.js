const {getNovel} = require('../../../../database/novel/game/read')
// const User = require('../../../lib/user')

module.exports.authenticated = async (ctx, next) => {
  const id = ctx.params.id
  const version = ctx.params.version
  const token = ctx.get('x-access-token')
  // const user = await User.getUser(token)
  const novel = await getNovel(id, version)
  if (!novel)
    return ctx.body = {
      status: 'FAIL',
      message: 'NON_DATA'
    }
  const isOnlyMember = novel.isOnlyMember === 1
  if (isOnlyMember)
    return ctx.body = {
      status: 'FAIL',
      message: 'ONLY_MEMBER'
    }
  ctx.state.id = id
  ctx.state.version = version
  // ctx.state.user = user
  ctx.state.novel = novel
  await next()
}
