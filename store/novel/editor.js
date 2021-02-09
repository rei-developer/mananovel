export const state = () => ({
  isUnsaved: false,
  isLoading: true,
  isHiddenSceneBoard: false
})

export const mutations = {
  setUnsaved: (state, flag) => state.isUnsaved = flag,
  setLoading: (state, flag) => state.isLoading = flag,
  toggleHiddenSceneBoard: state => state.isHiddenSceneBoard = !state.isHiddenSceneBoard
}
