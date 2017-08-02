export default {
  state: {
    dialogbox: false,
    sync: false,
    loading: true
  },
  mutations: {
    setDialogBox (state, payload) {
      state.dialogbox = payload.dialogbox
    },
    setSync (state, payload) {
      state.sync = payload.sync
    },
    setLoading (state, payload) {
      state.loading = payload.loading
    }
  }
}
