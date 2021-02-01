export const state = () => ({
  isDesktop: false,
  forceUpdate: 0
})

export const mutations = {
  screenWidth: (state, screenWidth) => state.isDesktop = screenWidth >= 1200,
  forceUpdate: state => ++state.forceUpdate
}
