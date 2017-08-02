import http from '@/http'

export default {
  state: {
    stars: {},
    currentList: 'All',
    currentStar: null,
    editId: null
  },
  mutations: {
    setStars (state, payload) {
      state.stars = payload.stars
    },
    setCurrentList (state, payload) {
      state.currentList = payload.tag
    },
    setCurrentStar (state, payload) {
      state.currentStar = payload.id
    },
    setEditId (state, payload) {
      state.editId = payload.id
    }
  },
  actions: {
    async getAll ({ commit }) {
      let token = window.localStorage.getItem('token')
      let res = await http({
        method: 'GET',
        url: 'https://git-star.herokuapp.com/repos',
        headers: { 'Authorization': 'TOKEN ' + JSON.parse(token) }
      })
      let stars = { 'All': [], 'Uncategorized': [] }
      for (let star of res.body) {
        stars['All'].push(star)
        if (star.categories.length === 0) {
          stars['Uncategorized'].push(star)
        } else {
          for (let cate of star.categories) {
            if (Object.keys(stars).includes(cate)) {
              stars[cate].push(star)
            } else {
              Object.assign(stars, { cate: [] })
              stars[cate].push(star)
            }
          }
        }
      }
      commit({
        type: 'setStars',
        stars: stars
      })
      commit({
        type: 'setLoading',
        loading: false
      })
    },
    getCurrentList ({ commit }, tag) {
      commit({
        type: 'setCurrentList',
        tag: tag
      })
    },
    getCurrentStar ({ state, commit }, id) {
      let star
      for (let each of state.stars['All']) {
        if (each.id === id) star = each
      }
      commit({
        type: 'setCurrentStar',
        id: star
      })
    },
    getEditStar ({ commit }, id) {
      commit({
        type: 'setDialogBox',
        dialogbox: true
      })
      commit({
        type: 'setEditId',
        id: id
      })
    },
    addTag ({ commit }, id, tag) {
    }
  }
}
