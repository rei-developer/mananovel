export const state = () => ({
  isUnsaved: false,
  isLoading: true
})

export const mutations = {
  setUnsaved: (state, flag) => state.isUnsaved = flag,
  setLoading: (state, flag) => state.isLoading = flag
}
