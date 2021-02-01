const pool = require('..')
const _ = require('lodash')

const getCommonConditionList = (columns, q, interval, prefix = null) => {
  const purePrefix = prefix ? `${prefix}.` : ''
  let commonConditionList = []
  if (columns)
    _.forIn(columns, (value, key) => commonConditionList.push(`${key} = '${value}'`))
  if (q)
    commonConditionList.push(`title LIKE '%${q}%'`)
  if (interval)
    commonConditionList.push(`${purePrefix}created BETWEEN DATE_ADD(NOW(), INTERVAL -${interval} DAY) AND NOW()`)
  return commonConditionList
}

module.exports.getSearchList = async text => {
  const result = await pool.query(
    `
    SELECT
      idx,
      title
    FROM SAVES
    WHERE title LIKE CONCAT('%', ?, '%')
    ORDER BY idx DESC
    LIMIT 7
    `,
    text
  )
  if (result.length < 1)
    return false
  return result
}

module.exports.getSaveWidgetList = async (columns, limit, interval) => {
  const commonConditionList = getCommonConditionList(columns, interval)
  try {
    const result = await pool.query(
      `
      SELECT
        A.idx,
        A.title,
        B.like,
        IF(A.is_image = 1, (SELECT uuid FROM SAVE_IMAGES WHERE save_idx = A.idx ORDER BY image_idx LIMIT 1), NULL) AS uuid
      FROM SAVES AS A
        INNER JOIN SAVE_COUNTS AS B ON (B.save_idx = A.idx)
      ${commonConditionList.length > 0 ? `WHERE ${commonConditionList.join(' AND ')}` : ''}
      ORDER BY A.idx DESC
      LIMIT ?
      `,
      [limit]
    )
    if (result.length < 1)
      return false
    return result
  } catch (error) {
    console.error(error.message)
    return false
  }
}

module.exports.getSaveThumbList = async () => {
  try {
    const result = await pool.query(
      `
      SELECT
        A.idx,
        (SELECT uuid FROM SAVE_IMAGES WHERE save_idx = A.idx ORDER BY image_idx LIMIT 1) AS uuid
      FROM SAVES AS A
      WHERE A.is_image = 1
      ORDER BY A.idx DESC
      LIMIT 9
      `
    )
    if (result.length < 1)
      return false
    return result
  } catch (error) {
    console.error(error.message)
    return false
  }
}

module.exports.getSaveContent = async idx => {
  try {
    const result = await pool.query(
      `
      SELECT
        A.idx,
        A.board,
        A.category,
        A.sub_category,
        A.title,
        A.content,
        A.url,
        A.created,
        B.hit,
        B.like,
        B.hate
      FROM SAVES AS A
        INNER JOIN SAVE_COUNTS AS B ON (B.save_idx = A.idx)
      WHERE A.idx = ?
      `,
      [idx]
    )
    if (result.length < 1)
      return false
    return result[0]
  } catch (error) {
    console.error(error.message)
    return false
  }
}

module.exports.getSaveList = async (columns, page, limit, q, interval) => {
  const commonConditionList = getCommonConditionList(columns, q, interval, 'A')
  try {
    const result = await pool.query(
      `
      SELECT
        A.idx,
        A.board,
        A.category,
        A.sub_category,
        A.title,
        A.content,
        A.url,
        A.created,
        A.is_image,
        B.like,
        (SELECT size FROM SAVE_FILES WHERE save_idx = A.idx LIMIT 1) AS size,
        IF(A.is_image = 1, (SELECT uuid FROM SAVE_IMAGES WHERE save_idx = A.idx ORDER BY image_idx LIMIT 1), NULL) AS uuid
      FROM SAVES AS A
        INNER JOIN SAVE_COUNTS AS B ON (B.save_idx = A.idx)
      ${commonConditionList.length > 0 ? `WHERE ${commonConditionList.join(' AND ')}` : ''}
      ORDER BY A.idx DESC
      LIMIT ?, ?
      `,
      [
        page * limit,
        limit
      ]
    )
    if (result.length < 1)
      return false
    return result
  } catch (error) {
    console.error(error.message)
    return false
  }
}

module.exports.getSaveCategoryList = async (columns, q, interval) => {
  const commonConditionList = getCommonConditionList(columns, q, interval)
  try {
    const result = await pool.query(
      `
      SELECT
        category,
        COUNT(*) AS count
      FROM SAVES
      ${commonConditionList.length > 0 ? `WHERE ${commonConditionList.join(' AND ')}` : ''}
      GROUP BY category
      `
    )
    if (result.length < 1)
      return false
    return result
  } catch (error) {
    console.error(error.message)
    return false
  }
}

module.exports.getSaveURL = async url => {
  const result = await pool.query('SELECT `url` FROM SAVES WHERE `url` = ?', url)
  if (result.length < 1)
    return false
  return result[0].url
}

module.exports.getSaveCount = async (columns, q, interval) => {
  const commonConditionList = getCommonConditionList(columns, q, interval)
  try {
    const result = await pool.query(
      `
      SELECT
        COUNT(*) AS count
      FROM SAVES
      ${commonConditionList.length > 0 ? `WHERE ${commonConditionList.join(' AND ')}` : ''}
      `
    )
    if (result.length < 1)
      return false
    return result[0].count
  } catch (error) {
    console.error(error.message)
    return false
  }
}

module.exports.getSaveFileList = async saveIdx => {
  const result = await pool.query(
    `
    SELECT
      file_idx,
      name,
      size,
      ext,
      uuid
    FROM SAVE_FILES
    WHERE save_idx = ?
    ORDER BY file_idx
    `, saveIdx)
  if (result.length < 1)
    return false
  return result
}

module.exports.getSaveMagnetList = async saveIdx => {
  const result = await pool.query(
    `
    SELECT
      A.magnet_idx,
      A.url,
      (SELECT name FROM SAVE_FILES WHERE save_idx = A.save_idx LIMIT 1) AS name
    FROM SAVE_MAGNETS AS A
    WHERE A.save_idx = ?
    ORDER BY A.magnet_idx
    `, saveIdx)
  if (result.length < 1)
    return false
  return result
}
