const request = require('request')

exports.getTokenOfKakao = async ctx => {
  const code = ctx.request.query.code
  const url = 'https://kauth.kakao.com/oauth/token'
  const domain = global.isDev
    ? `http://${global.host}:${global.port}`
    : 'https://mananovel.com'
  try {
    const token = await new Promise((resolve, reject) => {
      const options = {
        grant_type: 'authorization_code',
        client_id: 'aa7f303969993750f8c188c33e241ab2',
        client_secret: '4zPFj0jAityJx4ShIzjywC8RK207mfzj',
        redirect_uri: `${domain}/api/v1/auth/kakao`,
        code
      }
      request.post(url, {form: options}, (error, response, body) => {
        if (error)
          return reject({message: error, status: 'fail'})
        if (response.statusCode !== 200)
          return reject({message: '알 수 없는 오류', status: 'fail'})
        const data = JSON.parse(body)
        resolve(data.access_token)
      })
    })
    ctx.redirect(`${domain}/verify?token=${token}`)
  } catch (error) {
    console.log(error)
    ctx.body = error
  }
}

module.exports.getUserOfKakao = async ctx => {
  console.log(ctx.state.user)
  ctx.body = {
    user: ctx.state.user,
    status: 'OK'
  }
}
