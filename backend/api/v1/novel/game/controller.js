const {
  getNovelPageStartId,
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
} = require('../../../../database/novel/game/read')

module.exports.getNovelScript = async ctx => {
  const {
    id,
    version
  } = ctx.state
  const {
    type,
    pageId,
    scriptIdOrSortNo,
    selectId
  } = ctx.request.body
  let purePageId = pageId
  let pureScriptIdOrSortNo = scriptIdOrSortNo
  switch (type) {
    case 'READY':
      purePageId = await getNovelPageStartId(id)
      break
    case 'NEXT':
      ++pureScriptIdOrSortNo
      break
    case 'CHOICE':
      const distanceSelectList = await getNovelSelectList(id, version, pageId, scriptIdOrSortNo)
      if (distanceSelectList) {
        const select = distanceSelectList
          ?.find(item => item.id === selectId)
        purePageId = select.novelPageMoveId
        pureScriptIdOrSortNo = select.novelScriptMoveId
      }
      break
  }
  const script = await getNovelScript(id, version, purePageId, pureScriptIdOrSortNo)
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
    ? await getNovelSelectList(id, version, purePageId, script.id)
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
    id,
    novel
  } = ctx.state
  const customCSSOptions = novel.isUseCustomCSS === 1
    ? await getNovelCustomCssOptions(id)
    : []
  ctx.body = {
    status: 'DONE',
    novel,
    customCSSOptions
  }
}
