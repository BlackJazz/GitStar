import http from '@/http'
import * as types from '../mutation-types'

export default {
  state: {
    email: '',
    username: '',
    avatar: ''
  },
  mutations: {
    [types.SET_USER] (state, payload) {
      state.email = payload.user.email
      state.username = payload.user.username
      state.avatar = payload.user.avatar_link
    }
  },
  actions: {
    async getUser ({ commit }) {
      let res = await http.get('https://git-star.herokuapp.com/user')
      commit(types.SET_USER, {
        user: res.body
      })
    }
  }
}
