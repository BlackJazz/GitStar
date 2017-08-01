import http from '@/http'

export default {
  state: {
    email: '',
    username: '',
    avatar: ''
  },
  mutations: {
    setUser (state, payload) {
      state.email = payload.user.email
      state.username = payload.user.username
      state.avatar = payload.user.avatar_link
    }
  },
  actions: {
    async getUser ({ commit }) {
      let token = window.localStorage.getItem('token')
      let res = await http({
        method: 'GET',
        url: 'https://git-star.herokuapp.com/user',
        headers: { 'Authorization': 'TOKEN ' + JSON.parse(token) }
      })
      commit({
        type: 'setUser',
        user: res.body
      })
    }
  }
}
