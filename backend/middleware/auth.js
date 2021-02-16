exports.isAuthenticated = async (ctx, next) => {
  const token = ctx.get('x-access-token')
  try {
    const user = await new Promise((resolve, reject) => {
      const options = {
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }
      request.post(options, (error, response, body) => {
        if (error)
          return reject({message: error, status: 'fail'})
        if (response.statusCode !== 200)
          return reject({message: '알 수 없는 오류', status: 'fail'})
        const data = JSON.parse(body)
        resolve(data)
      })
    })
    ctx.state.user = user
    await next()
  } catch (error) {
    console.log(error)
    ctx.body = error
  }
}
