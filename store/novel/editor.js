export const state = () => ({
  gameId: null,
  editorState: null,
  isUnsaved: false,
  isLoading: true,
  isHiddenSceneBoard: false
})

export const mutations = {
  setGameId: (state, gameId) => state.gameId = gameId,
  setEditorState: (state, editorState) => state.editorState = editorState,
  setUnsaved: (state, flag) => state.isUnsaved = flag,
  setLoading: (state, flag) => state.isLoading = flag,
  toggleHiddenSceneBoard: state => state.isHiddenSceneBoard = !state.isHiddenSceneBoard
}
