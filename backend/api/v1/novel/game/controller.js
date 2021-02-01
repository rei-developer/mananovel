const {
  getNovelPageStartIdx,
  getNovelScript,
  getNovelActor,
  getNovelBackground,
  getNovelBGM,
  getNovelBGS,
  getNovelSound,
  getNovelSelectList,
  getNovelCount,
  getNovelList,
  getNovelCustomCssOptions
} = require('../../../database/novel/read')

module.exports.getNovelScript = async ctx => {
  const {
    idx,
    version
  } = ctx.state
  const {
    type,
    pageIdx,
    scriptIdxOrSortNo,
    selectIdx
  } = ctx.request.body
  let purePageIdx = pageIdx
  let pureScriptIdxOrSortNo = scriptIdxOrSortNo
  switch (type) {
    case 'READY':
      purePageIdx = await getNovelPageStartIdx(idx)
      break
    case 'NEXT':
      ++pureScriptIdxOrSortNo
      break
    case 'CHOICE':
      const distanceSelectList = await getNovelSelectList(idx, version, pageIdx, scriptIdxOrSortNo)
      if (distanceSelectList) {
        const select = distanceSelectList
          ?.find(item => item.id === selectIdx)
        purePageIdx = select.novelPageMoveId
        pureScriptIdxOrSortNo = select.novelScriptMoveId
      }
      break
  }
  const script = await getNovelScript(idx, version, purePageIdx, pureScriptIdxOrSortNo)
  if (!script)
    return ctx.body = {
      status: 'FAIL',
      message: 'NON_DATA'
    }
  else if (script.error)
    return ctx.body = {
      status: 'FAIL',
      message: script.error
    }
  const actor = script.scriptType === 'ACTOR' && script.novelActorId
    ? await getNovelActor(script.novelActorId)
    : undefined
  const background = script.novelPictureId
    ? await getNovelBackground(script.novelPictureId)
    : undefined
  const bgm = script.novelBGMId
    ? await getNovelBGM(script.novelBGMId)
    : undefined
  const bgs = script.novelBGSId
    ? await getNovelBGS(script.novelBGSId)
    : undefined
  const sound = script.novelSoundId
    ? await getNovelSound(script.novelSoundId)
    : undefined
  const selectList = script.id
    ? await getNovelSelectList(idx, version, purePageIdx, script.id)
    : undefined
  ctx.body = {
    status: 'DONE',
    script,
    actor,
    background,
    bgm,
    bgs,
    sound,
    selectList
  }
}

module.exports.getNovelList = async ctx => {
  const count = await getNovelCount()
  const dataSource = await getNovelList(0, 20)
  ctx.body = {
    status: 'DONE',
    count,
    dataSource
  }
}

module.exports.getNovel = async ctx => {
  const {
    idx,
    novel
  } = ctx.state
  const customCSSOptions = novel.isUseCustomCSS === 1
    ? await getNovelCustomCssOptions(idx)
    : []
  ctx.body = {
    status: 'DONE',
    novel,
    customCSSOptions
  }
}
