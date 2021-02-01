const PATH = '/api/v1/captcha'

module.exports.verify = async (token, $axios) => {
  try {
    const data = await $axios.$post(`${PATH}/verify`, {token})
    if (!data)
      return false
    return data
  } catch (error) {
    console.error(error)
    return false
  }
}
