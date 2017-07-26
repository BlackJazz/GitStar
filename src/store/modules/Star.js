import http from '@/http'

export default {
  state: {
    stars: {},
    tags: [],
    currentList: [],
    currentStar: null
  },
  mutations: {
    setStars (state, payload) {
      state.stars = payload.stars
    },
    setTags (state, payload) {
      state.tags = payload.tags
    },
    addTag (state, payload) {
      state.tags.push(payload.tag)
    },
    setCurrentList (state, payload) {
      state.currentList = payload.stars
    },
    setCurrentStar (state, payload) {
      state.currentStar = payload.star
    }
  },
  actions: {
    async getStars ({ commit }) {
      let res = await http.get('https://api.github.com/users/blackjazz/starred')
      commit({
        type: 'setStars',
        stars: { 'All': res.body, 'Unclassified': [] }
      })
      commit({
        type: 'setTags',
        tags: ['All', 'Unclassified']
      })
      commit({
        type: 'setCurrentList',
        stars: res.body
      })
    },
    getCurrentList ({ state, commit }, tag) {
      commit({
        type: 'setCurrentList',
        stars: state.stars[tag]
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
