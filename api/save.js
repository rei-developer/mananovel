const PATH = '/api/save'

module.exports.getSaveWidgetList = async ($axios, sidebar = false) => {
  try {
    const data = await $axios.$get(`${PATH}/widget?sidebar=${sidebar ? 'Y' : 'N'}`)
    if (!data)
      return false
    return data
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports.getSaveThumbList = async $axios => {
  try {
    const data = await $axios.$get(`${PATH}/thumb`)
    if (!data)
      return false
    return data
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports.getSaveContent = async (idx, $axios) => {
  try {
    const data = await $axios.$get(`${PATH}/${idx}`)
    if (!data)
      return false
    return data
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports.getSaveList = async (args, $axios) => {
  try {
    const data = await $axios.$post(PATH, args)
    if (!data)
      return false
    return data
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports.getSaveFileList = async (args, $axios) => {
  try {
    const data = await $axios.$post(`${PATH}/file`, args)
    if (!data)
      return false
    return data
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports.getSaveMagnetList = async (args, $axios) => {
  try {
    const data = await $axios.$post(`${PATH}/magnet`, args)
    if (!data)
      return false
    return data
  } catch (error) {
    console.error(error)
    return false
  }
}
