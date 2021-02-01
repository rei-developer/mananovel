const uuidv5 = require('uuid/v5')
const {
  getSaveWidgetList,
  getSaveThumbList,
  getSaveContent,
  getSaveList,
  getSaveCategoryList,
  getSaveCount,
  getSaveFileList,
  getSaveMagnetList
} = require('../../database/save/read')

module.exports.getSaveWidgetList = async ctx => {
  const sidebar = ctx.request.query.sidebar
  if (sidebar !== 'Y' && sidebar !== 'N')
    ctx.throw(400, 'Invalid parameter value')
  const movieList = await getSaveWidgetList({board: 'movie', category: '해외영화'}, sidebar === 'Y' ? 15 : 10)
  const kMovieList = await getSaveWidgetList({board: 'movie', category: '한국영화'}, sidebar === 'Y' ? 15 : 10)
  const bestList = sidebar === 'N'
    ? await getSaveWidgetList(null, 30)
    : []
  const newestList = sidebar === 'N'
    ? await getSaveWidgetList(null, 30)
    : []
  ctx.body = {
    status: 'DONE',
    movieList,
    kMovieList,
    bestList,
    newestList
  }
}

module.exports.getSaveThumbList = async ctx => {
  const result = await getSaveThumbList()
  ctx.body = {
    status: 'DONE',
    result
  }
}

module.exports.getSaveContent = async ctx => {
  const idx = ctx.params.idx
  const saveContent = await getSaveContent(idx)
  if (!saveContent)
    return ctx.body = {status: 'FAIL'}
  const saveFileList = await getSaveFileList(idx)
  const saveMagnetList = await getSaveMagnetList(idx)
  ctx.body = {
    status: 'DONE',
    saveContent,
    saveFileList,
    saveMagnetList
  }
}

module.exports.getSaveList = async ctx => {
  const {
    board,
    q,
    category,
    page,
    limit,
    interval
  } = ctx.request.body
  const obj = {}
  if (!!board) {
    if (typeof board !== 'string')
      ctx.throw(400, 'Invalid parameter value')
    if (
      board !== 'best' &&
      board !== 'newest'
    )
      obj.board = board
  }
  if (!!category) {
    if (typeof category !== 'string')
      ctx.throw(400, 'Invalid parameter value')
    obj.category = category
  }
  if (
    typeof page !== 'number' ||
    typeof limit !== 'number' ||
    (!!interval && typeof interval !== 'number')
  )
    ctx.throw(400, 'Invalid parameter value')
  if (
    page < 0 ||
    limit < 5 ||
    limit > 50 ||
    (
      !!interval && (
        interval < 0 ||
        interval > 90
      )
    )
  )
    ctx.throw(400, 'Out of range')
  const pureInterval = !!interval && interval === 0
    ? 1
    : interval
  const count = await getSaveCount(obj, q, pureInterval)
  const saveList = await getSaveList(obj, page - 1, limit, q, pureInterval)
  if (obj.category)
    delete obj.category
  const saveCategoryList = await getSaveCategoryList(obj, q, pureInterval)
  ctx.body = {
    status: 'DONE',
    count,
    saveList,
    saveCategoryList
  }
}

module.exports.getSaveFileList = async ctx => {
  const {
    idx: saveIdx,
    token
  } = ctx.request.body
  if (typeof saveIdx !== 'number')
    ctx.throw(400, 'Invalid parameter value')
  if (saveIdx < 0)
    ctx.throw(400, 'Out of range')
  const NAMESPACE = '65f9af5d-f23f-4065-ac85-da725569fdcd'
  const TOKEN = uuidv5(`${saveIdx}`, NAMESPACE)
  if (token !== TOKEN)
    return ctx.body = {status: 'FAIL'}
  const saveFileList = await getSaveFileList(saveIdx)
  ctx.body = {
    status: 'DONE',
    saveFileList
  }
}

module.exports.getSaveMagnetList = async ctx => {
  const {
    idx: saveIdx,
    token
  } = ctx.request.body
  if (typeof saveIdx !== 'number')
    ctx.throw(400, 'Invalid parameter value')
  if (saveIdx < 0)
    ctx.throw(400, 'Out of range')
  const NAMESPACE = '65f9af5d-f23f-4065-ac85-da725569fdcd'
  const TOKEN = uuidv5(`${saveIdx}`, NAMESPACE)
  if (token !== TOKEN)
    return ctx.body = {status: 'FAIL'}
  const saveMagnetList = await getSaveMagnetList(saveIdx)
  ctx.body = {
    status: 'DONE',
    saveMagnetList
  }
}
