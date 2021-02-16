export const state = () => ({
  id: 0,
  service: '',
  token: '',
  username: '',
  nickname: '',
  email: '',
  level: 0,
  exp: 0,
  point: 0,
  isAdmin: false,
  isLogged: false
})

export const mutations = {
  setUser: (state, data) => {
    state.id = data.user.id
    state.service = data.service
    state.token = data.token
    state.username = data.user.username
    state.nickname = data.user.nickname
    state.email = data.user.email
    state.level = data.user.level
    state.exp = data.user.exp
    state.point = data.user.point
    state.isAdmin = data.user.isAdmin
    state.isLogged = true
  },
  setNickname: (state, nickname) => state.nickname = nickname,
  signIn: (state, data) => {
    state.service = data.service
    state.token = data.token
    state.isLogged = true
    localStorage.setItem('service', data.service)
    localStorage.setItem('token', data.token)
  }
  // signOut: state => {
  //   state.service = ''
  //   state.token = ''
  //   state.isLogged = ''
  //   localStorage.removeItem('service')
  //   localStorage.removeItem('token')
  // }
}
