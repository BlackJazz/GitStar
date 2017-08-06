import * as types from '../mutation-types'

export default {
  state: {
    dialog: false,
    dialogId: 0,
    statusCode: 0,
    statusInfo: [
      'Online',
      'Offline',
      'Synchronizing',
      'Completed',
      'Failed to sync'
    ],
    auto: false,
    loading: true,
    tips: [],
    tipNum: 0
  },
  mutations: {
    [types.SET_DIALOG] (state, payload) {
      state.dialog = payload.dialog
    },
    [types.SET_DIALOG_ID] (state, payload) {
      state.dialogId = payload.id
    },
    [types.SET_AUTO] (state, payload) {
      state.auto = payload.flag
    },
    [types.SET_LOADING] (state, payload) {
      state.loading = payload.loading
    },
    [types.ADD_TIP] (state, payload) {
      let { type, info } = payload
      state.tips.unshift({
        type: type,
        info: info,
        num: state.tipNum
      })
      state.tipNum++
    },
    [types.DELETE_TIP] (state, payload) {
      let i = payload.i
      if (i === 0) {
        state.tips.shift()
      } else state.tips.splice(i, 1)
    },
    [types.SET_TIP] (state, payload) {
      state.tips[payload.i] = payload.is
    },
    [types.SET_STATUS_CODE] (state, payload) {
      state.statusCode = payload.code
    }
  },
  actions: {
    setDialog ({ commit }, flag) {
      commit(types.SET_DIALOG, {
        dialog: flag
      })
    },
    setDialogId ({ commit }, id) {
      commit(types.SET_DIALOG_ID, {
        id: id
      })
    },
    addTip ({ state, commit }, tip) {
      commit(types.ADD_TIP, {
        type: tip.type,
        info: tip.info
      })
      setTimeout(() => {
        state.tips.pop()
      }, 7000)
    },
    deleteTip ({ commit }, i) {
      commit(types.DELETE_TIP, {
        i: i
      })
    }
  }
}
