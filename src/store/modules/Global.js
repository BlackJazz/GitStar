import * as types from '../mutation-types'

export default {
  state: {
    dialog: false,
    sync: false,
    loading: true
  },
  mutations: {
    [types.SET_DIALOG] (state, payload) {
      state.dialog = payload.dialog
    },
    [types.SET_SYNC] (state, payload) {
      state.sync = payload.sync
    },
    [types.SET_LOADING] (state, payload) {
      state.loading = payload.loading
    }
  },
  actions: {
    setDialog ({ commit }, flag) {
      commit(types.SET_DIALOG, {
        dialog: flag
      })
    }
  }
}
