const {
  getSaveCount,
  getSaveList
} = require('../../database/save/read')
const {createSearch} = require('../../../database/search/create')
const {
  getSearchListWithWidget,
  getSearchList,
  getSearchText
} = require('../../../database/search/read')
const {patchSearch} = require('../../../database/search/update')

module.exports.getSearchListWithWidget = async ctx => {
  const type = ctx.params.type
  if (typeof type !== 'string')
    ctx.throw(400, 'Invalid parameter value')
  const result = await getSearchListWithWidget()
  ctx.body = {
    status: 'DONE',
    result
  }
}

module.exports.getSearchList = async ctx => {
  const text = ctx.params.text
  if (typeof text !== 'string')
    ctx.throw(400, 'Invalid parameter value')
  const result = await getSearchList(text)
  if (!result)
    return ctx.body = {status: 'FAIL'}
  ctx.body = {
    status: 'DONE',
    result
  }
}

module.exports.getSaveListWithSearch = async ctx => {
  const {
    board,
    q,
    category,
    page,
    limit
  } = ctx.request.query
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
    (!!page && typeof page !== 'number') ||
    (!!limit && typeof limit !== 'number')
  )
    ctx.throw(400, 'Invalid parameter value')
  if (
    !!page && page < 0 ||
    (
      !!limit && (
        limit < 5 ||
        limit > 100
      )
    )
  )
    ctx.throw(400, 'Out of range')
  // const count = await getSaveCount(obj, q)
  // const saveList = await getSaveList(obj, page - 1, limit, q)
  const searchText = await getSearchText(q)
  searchText
    ? await patchSearch(q)
    : await createSearch(q)
  ctx.body = {
    status: 'DONE'
    // count
    // saveList
  }
}
