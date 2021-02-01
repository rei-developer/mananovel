const {verify} = require('hcaptcha')
const config = require('../../config.json')

module.exports.getVerify = async ctx => {
  const token = ctx.request.body.token
  if (typeof token !== 'string')
    ctx.throw(400, 'Invalid parameter value')
  const data = await verify(config.HCAPTCHA_SECRET_KEY, token)
  ctx.body = {
    status: data.success
      ? 'DONE'
      : 'FAIL'
  }
}
