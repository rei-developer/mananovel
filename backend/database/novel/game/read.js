const pool = require('..')
// const _ = require('lodash')

module.exports.getNovelPageStartIdx = async idx => {
  try {
    const result = await pool.query(
      `
      SELECT novelPageStartId
      FROM NOVEL_OPTIONS
      WHERE novelId = ?;
      `,
      [idx]
    )
    if (result.length < 1)
      return false
    return result[0].novelPAGE_START_id
  } catch (error) {
    console.error(error.message)
    return false
  }
}

module.exports.getNovelScript = async (idx, version, pageIdx, sortNo) => {
  try {
    const result = await pool.query(
      `
      SELECT NOVEL_SCRIPTS.id,
             NOVEL_SCRIPTS.novelPageId,
             NOVEL_SCRIPTS.novelActorId,
             NOVEL_SCRIPTS.novelPictureId,
             NOVEL_SCRIPTS.novelBGMId,
             NOVEL_SCRIPTS.novelBGSId,
             NOVEL_SCRIPTS.novelSoundId,
             NOVEL_SCRIPTS.scriptType,
             NOVEL_SCRIPTS.customName,
             NOVEL_SCRIPTS.text,
             NOVEL_SCRIPTS.sortNo
      FROM NOVEL_SCRIPTS
      WHERE NOVEL_SCRIPTS.novelId = ?
        AND NOVEL_SCRIPTS.version = ?
        AND NOVEL_SCRIPTS.novelPageId = ?
        AND NOVEL_SCRIPTS.sortNo = ?
        AND NOVEL_SCRIPTS.isVisible = 1;
      `,
      [idx, version, pageIdx, sortNo]
    )
    if (result.length < 1)
      return false
    return result[0]
  } catch (error) {
    return {error: error.code}
  }
}

module.exports.getNovelSelectList = async (idx, version, pageIdx, scriptIdx) => {
  try {
    const result = await pool.query(
      `
      SELECT id,
             text,
             novelPageMoveId,
             novelScriptMoveId
      FROM NOVEL_SELECTS
      WHERE novelId = ?
        AND version = ?
        AND novelPageId = ?
        AND novelScriptId = ?;
      `,
      [idx, version, pageIdx, scriptIdx]
    )
    if (result.length < 1)
      return false
    return result
  } catch (error) {
    return {error: error.code}
  }
}

module.exports.getNovelActor = async idx => {
  try {
    const result = await pool.query(
      `
      SELECT name,
             imageUrl
      FROM NOVEL_ACTORS
      WHERE id = ?
        AND isPublic = 1
        AND isVisible = 1;
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

module.exports.getNovelBackground = async idx => {
  try {
    const result = await pool.query(
      `
      SELECT imageUrl
      FROM NOVEL_PICTURES
      WHERE id = ?
        AND isPublic = 1
        AND isVisible = 1;
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

module.exports.getNovelBGM = async idx => {
  try {
    const result = await pool.query(
      `
      SELECT audioUrl
      FROM NOVEL_BGM
      WHERE id = ?
        AND isPublic = 1
        AND isVisible = 1;
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

module.exports.getNovelBGS = async idx => {
  try {
    const result = await pool.query(
      `
      SELECT audioUrl
      FROM NOVEL_BGS
      WHERE id = ?
        AND isPublic = 1
        AND isVisible = 1;
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

module.exports.getNovelSound = async idx => {
  try {
    const result = await pool.query(
      `
      SELECT audioUrl
      FROM NOVEL_SOUNDS
      WHERE id = ?
        AND isPublic = 1
        AND isVisible = 1;
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

module.exports.getNovelCount = async () => {
  try {
    const result = await pool.query(
      `
      SELECT COUNT(*) AS count
      FROM NOVELS
      `
    )
    if (result.length < 1)
      return false
    return result[0].COUNT
  } catch (error) {
    console.error(error.message)
    return false
  }
}

module.exports.getNovelList = async (page, limit) => {
  try {
    const result = await pool.query(
      `
      SELECT id,
             category,
             title,
             subTitle,
             description,
             tags,
             imageUrl,
             created,
             updated,
             version
      FROM NOVELS
      WHERE isVisible = 1
      ORDER BY updated DESC
      LIMIT ?, ?;
      `,
      [page * limit, limit]
    )
    if (result.length < 1)
      return false
    return result
  } catch (error) {
    console.error(error.message)
    return false
  }
}

module.exports.getNovel = async (idx, version) => {
  try {
    const result = await pool.query(
      `
      SELECT NOVELS.id,
             NOVELS.title,
             NOVELS.subTitle,
             NOVELS.version,
             NOVEL_OPTIONS.isUseTitle,
             NOVEL_OPTIONS.isUseLogo,
             NOVEL_OPTIONS.isUseGameover,
             NOVEL_OPTIONS.isUseCustomCSS,
             NOVEL_OPTIONS.isOnlyMember,
             NOVEL_OPTIONS.isOnlyAdult,
             NOVEL_PICTURES.imageUrl AS titleImageUrl
      FROM NOVELS
               LEFT JOIN NOVEL_OPTIONS ON (NOVEL_OPTIONS.novelId = NOVELS.id)
               LEFT JOIN NOVEL_PICTURES
                         ON (NOVEL_OPTIONS.novelPictureTitleId = NOVEL_PICTURES.id
                             AND NOVEL_PICTURES.isPublic = 1
                             AND NOVEL_PICTURES.isVisible = 1
                             )
      WHERE NOVELS.id = ?
        AND NOVELS.version = ?
        AND NOVELS.isVisible = 1;
      `,
      [idx, version]
    )
    if (result.length < 1)
      return false
    return result[0]
  } catch (error) {
    console.error(error.message)
    return false
  }
}

module.exports.getNovelCustomCssOptions = async idx => {
  try {
    const result = await pool.query(
      `
      SELECT blockName,
             blockContent
      FROM NOVEL_CUSTOM_CSS_OPTIONS
      WHERE novelOptionId = ?;
      `,
      [idx]
    )
    if (result.length < 1)
      return false
    return result
  } catch (error) {
    console.error(error.message)
    return false
  }
}
