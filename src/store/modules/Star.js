import http from '@/http'
import Vue from 'vue'

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
    },
    EditStar (state, payload) {
      for (let each of state.stars['All']) {
        if (each.id === payload.id) {
          each.comment_name = payload.alias
          each.comment_description = payload.description
        }
      }
    },
    addStarTag (state, payload) {
      let tag = payload.tag
      for (let each of state.stars['All']) {
        if (each.id === payload.id) {
          if (each.categories.includes(tag)) return
          else each.categories.push(tag)
          if (Object.keys(state.stars).includes(tag)) {
            state.stars[tag].push(each)
          } else {
            Vue.set(state.stars, tag, [])
            state.stars[tag].push(each)
          }
          let i = state.stars['Uncategorized'].findIndex((x) => x.id === each.id)
          if (i === 0) state.stars['Uncategorized'].shift()
          if (i > 0) state.stars['Uncategorized'].splice(i, i)
        }
      }
    },
    deleteStarTag (state, payload) {
      let tag = payload.tag
      for (let each of state.stars['All']) {
        if (each.id === payload.id) {
          let i = each.categories.findIndex((x) => x === payload.tag)
          if (i === 0) each.categories.shift()
          if (i > 0) each.categories.splice(i, i)
          if (each.categories.length === 0) state.stars['Uncategorized'].push(each)
          let j = state.stars[tag].findIndex((x) => x.id === each.id)
          if (j === 0) state.stars[tag].shift()
          if (j > 0) state.stars[tag].splice(i, i)
          if (state.stars[tag].length === 0) Vue.delete(state.stars, tag)
        }
      }
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
              Vue.set(stars, cate, [])
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
    getEditId ({ commit }, id) {
      commit({
        type: 'setDialogBox',
        dialogbox: true
      })
      commit({
        type: 'setEditId',
        id: id
      })
    },
    doEditStar ({ commit }, star) {
      commit({
        type: 'EditStar',
        id: star.id,
        alias: star.alias,
        description: star.description
      })
    }
  }
}
