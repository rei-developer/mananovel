const pool = require('../index')
const _ = require('lodash')

module.exports.getSearchListWithWidget = async text => {
  const result = await pool.query(
    `
    SELECT text
    FROM SEARCHES
    ORDER BY updated DESC, count DESC
    LIMIT 20
    `,
    text
  )
  if (result.length < 1)
    return false
  return result
}

module.exports.getSearchList = async text => {
  const result = await pool.query(
    `
    SELECT text
    FROM SEARCHES
    WHERE text LIKE CONCAT('%', ?, '%')
    ORDER BY count DESC
    LIMIT 7
    `,
    text
  )
  if (result.length < 1)
    return false
  return result
}

module.exports.getSearchText = async text => {
  const result = await pool.query(
    `
    SELECT
      text,
      count
    FROM SEARCHES
    WHERE text = ?
    `,
    text
  )
  if (result.length < 1)
    return false
  return result
}
