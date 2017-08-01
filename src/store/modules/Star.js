import http from '@/http'

export default {
  state: {
    all: [],
    stars: {},
    currentList: [],
    currentStar: null
  },
  mutations: {
    setAll (state, payload) {
      state.all = payload.all
    },
    setStars (state, payload) {
      state.stars = payload.stars
    },
    setCurrentList (state, payload) {
      state.currentList = payload.stars
    },
    setCurrentStar (state, payload) {
      state.currentStar = payload.star
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
      commit({
        type: 'setAll',
        all: res.body
      })
      commit({
        type: 'setCurrentList',
        stars: res.body
      })
      let stars = { 'Uncategorized': [] }
      for (let star of res.body) {
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
    },
    getCurrentList ({ state, commit }, tag) {
      let list
      if (tag === 'All') {
        list = state.all
      } else {
        list = state.stars[tag]
      }
      commit({
        type: 'setCurrentList',
        stars: list
      })
    },
    getCurrentStar ({ state, commit }) {
      commit({
        type: 'setCurrentStar',
        star: {
          'title': 'This a title',
          'user': 'User',
          'stars': 123,
          'description': 'This is a description!'
        }
      })
    }
  }
}
