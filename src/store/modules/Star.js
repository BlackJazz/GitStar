import http from '@/http'
import * as types from '../mutation-types'
import Vue from 'vue'

export default {
  state: {
    stars: {},
    currentList: null,
    mdList: [],
    currentTag: 'All',
    currentStar: null,
    editId: null,
    sync: false
  },
  mutations: {
    [types.GET_ALL] (state, payload) {
      state.stars = payload.stars
    },
    [types.ADD_STAR] (state, payload) {
      let star = payload.star
      state.stars['All'].push(star)
      state.stars['Uncategorized'].push(star)
    },
    [types.DELETE_STAR] (state, payload) {
      let id = payload.id
      for (let tag of Object.keys(state.stars)) {
        for (let each of state.stars[tag]) {
          if (each.id === id) {
            let i = state.stars[tag].findIndex((x) => x.id === each.id)
            if (i === 0) state.stars[tag].shift()
            if (i > 0) state.stars[tag].splice(i, 1)
            if (state.stars[tag].length === 0) Vue.delete(state.stars, tag)
          }
        }
      }
    },
    [types.SET_CURRENT_LIST] (state, payload) {
      state.currentList = payload.stars
    },
    [types.ADD_MD_LIST] (state, payload) {
      state.mdList.push(payload)
    },
    [types.EDIT_MD_LIST] (state, payload) {
      state.mdList[payload.index].md = payload.md
    },
    [types.SET_CURRENT_TAG] (state, payload) {
      state.currentTag = payload.tag
    },
    [types.SET_CURRENT_STAR] (state, payload) {
      state.currentStar = payload.star
    },
    [types.SET_EDIT_ID] (state, payload) {
      state.editId = payload.id
    },
    [types.EDIT_STAR] (state, payload) {
      for (let each of state.stars['All']) {
        if (each.id === payload.id) {
          each.comment_name = payload.alias
          each.comment_description = payload.description
        }
      }
    },
    [types.ADD_CATEGORY] (state, payload) {
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
          if (i > 0) state.stars['Uncategorized'].splice(i, 1)
        }
      }
    },
    [types.DELETE_CATEGORY] (state, payload) {
      let tag = payload.tag
      for (let each of state.stars['All']) {
        if (each.id === payload.id) {
          let i = each.categories.findIndex((x) => x === payload.tag)
          if (i === 0) each.categories.shift()
          if (i > 0) each.categories.splice(i, 1)
          if (each.categories.length === 0) state.stars['Uncategorized'].push(each)
          //
          let j = state.stars[tag].findIndex((x) => x.id === each.id)
          if (j === 0) state.stars[tag].shift()
          if (j > 0) state.stars[tag].splice(i, 1)
          if (state.stars[tag].length === 0) Vue.delete(state.stars, tag)
        }
      }
    },
    [types.SET_SYNC] (state, payload) {
      state.sync = payload.sync
    }
  },
  actions: {
    async getAll ({ commit }) {
      let res = await http.get('https://git-star.herokuapp.com/repos')
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
      commit(types.GET_ALL, {
        stars: stars
      })
      commit(types.SET_CURRENT_LIST, {
        stars: stars['All']
      })
      commit(types.SET_LOADING, {
        loading: false
      })
      commit(types.SET_SYNC, {
        sync: true
      })
    },
    getCurrentList ({ state, commit }, tag) {
      commit(types.SET_CURRENT_LIST, {
        stars: state.stars[tag]
      })
      commit(types.SET_CURRENT_TAG, {
        tag: tag
      })
    },
    async getCurrentStar ({ state, commit }, id) {
      for (let each of state.stars['All']) {
        if (each.id === id) {
          commit(types.SET_CURRENT_STAR, {
            star: each
          })
          break
        }
      }
      let md
      try {
        let repo = await http.get(`https://git-star.herokuapp.com/repos/${id}`)
        md = await http.get(repo.body.readme.url)
      } catch (e) {
        md = ''
      }
      if (state.mdList.length === 0) {
        commit(types.ADD_MD_LIST, {
          id: id,
          md: md.body
        })
        return
      }
      for (let [index, value] of state.mdList.entries()) {
        if (value.id === id) {
          if (md.body !== '') {
            commit(types.EDIT_MD_LIST, {
              index: index,
              md: md.body
            })
          }
          break
        }
        if (index === state.mdList.length - 1) {
          commit(types.ADD_MD_LIST, {
            id: id,
            md: md.body
          })
        }
      }
    },
    getEditId ({ commit }, id) {
      commit(types.SET_DIALOG_ID, {
        id: 0
      })
      commit(types.SET_DIALOG, {
        dialog: true
      })
      commit(types.SET_EDIT_ID, {
        id: id
      })
    },
    async editStar ({ dispatch, commit }, star) {
      commit(types.SET_SYNC, {sync: false})
      let { id, alias, description } = star
      let data = { 'name': alias, 'description': description }
      await http.patch(`https://git-star.herokuapp.com/repos/${id}`, data).then((response) => {
        if (response.status === 200) {
          commit(types.EDIT_STAR, {
            id: id,
            alias: alias,
            description: description
          })
          dispatch('addTip', {type: 'info', info: 'INFO: Edit successful!'}).then(() => {})
        } else {
          dispatch('addTip', {type: 'error', info: 'ERROR: Failed to edit!'}).then(() => {})
        }
      })
      commit(types.SET_SYNC, {sync: true})
    },
    async addStarTag ({ dispatch, commit }, star) {
      commit(types.SET_SYNC, {sync: false})
      let { id, tag } = star
      let data = { category: tag }
      await http.post(`https://git-star.herokuapp.com/repos/${id}/cates`, data).then((response) => {
        if (response.status === 200) {
          commit(types.ADD_CATEGORY, {
            id: id,
            tag: tag
          })
          dispatch('addTip', {type: 'info', info: 'INFO: Add tag successful!'}).then(() => {})
        } else {
          dispatch('addTip', {type: 'error', info: 'ERROR: Failed to add tag!'}).then(() => {})
        }
      })
      commit(types.SET_SYNC, {sync: true})
    },
    async deleteStarTag ({ dispatch, commit }, star) {
      commit(types.SET_SYNC, {sync: false})
      let { id, tag } = star
      let data = { category: tag }
      await http.delete(`https://git-star.herokuapp.com/repos/${id}/cates`, { body: data }).then((response) => {
        if (response.status === 200) {
          commit(types.DELETE_CATEGORY, {
            id: id,
            tag: tag
          })
          dispatch('addTip', {type: 'info', info: 'INFO: Delete tag successful!'}).then(() => {})
        } else {
          dispatch('addTip', {type: 'error', info: 'ERROR: Failed to delete tag!'}).then(() => {})
        }
      })
      commit(types.SET_SYNC, {sync: true})
    },
    setSync ({ commit }, flag) {
      commit(types.SET_SYNC, {
        sync: flag
      })
    },
    async syncAll ({ state, commit }) {
      if (!state.sync) return
      commit(types.SET_STATUS_CODE, { code: 2 })
      try {
        let res = await http.get('https://git-star.herokuapp.com/repos')
        let al = new Set()
        let dl = new Set()
        for (let a of res.body) {
          al.add(a.id)
        }
        for (let d of state.stars['All']) {
          dl.add(d.id)
        }
        let intersect = new Set([...al].filter(x => dl.has(x)))
        let alist = new Set([...al].filter(x => !intersect.has(x)))
        let dlist = new Set([...dl].filter(x => !intersect.has(x)))
        for (let add of res.body) {
          for (let ai of alist) {
            if (ai === add.id) commit(types.ADD_STAR, {star: add})
          }
        }
        for (let del of dlist) {
          commit(types.DELETE_STAR, {id: del})
        }
        commit(types.SET_STATUS_CODE, { code: 3 })
      } catch (e) {
        commit(types.SET_STATUS_CODE, { code: 4 })
      }
    },
    searchStar ({ state, commit }, keyword) {
      if (keyword === '') return
      commit(types.SET_CURRENT_TAG, {
        tag: ''
      })
      let list = []
      for (let each of state.stars['All']) {
        let k = false
        if (each.comment_description) {
          if (each.comment_description.toLowerCase().includes(keyword.toLowerCase())) k = true
        }
        if (each.comment_name) {
          if (each.comment_name.toLowerCase().includes(keyword.toLowerCase())) k = true
        }
        if (each.description) {
          if (each.description.toLowerCase().includes(keyword.toLowerCase())) k = true
        }
        if (each.name) {
          if (each.name.toLowerCase().includes(keyword.toLowerCase())) k = true
        }
        if (k) list.push(each)
      }
      commit(types.SET_CURRENT_LIST, {
        stars: list
      })
    },
    async autoCate ({ dispatch, state, commit }) {
      commit(types.SET_SYNC, {sync: false})
      commit(types.SET_AUTO, {flag: true})
      let todo = []
      for (let un of state.stars['Uncategorized']) {
        todo.push({id: un.id, tag: un.language})
      }
      let n = 0
      for (let each of todo) {
        await http.post(`https://git-star.herokuapp.com/repos/${each.id}/cates`, {category: each.tag}).then((response) => {
          if (response.status === 200) {
            n++
            commit(types.ADD_CATEGORY, {
              id: each.id,
              tag: each.tag
            })
          } else {
          }
        })
      }
      if (n === todo.length) {
        dispatch('addTip', {type: 'info', info: 'All succeed!'}).then(() => {})
      } else {
        dispatch('addTip', {type: 'error', info: `WARNING: ${n} succeed but ${todo.length - n}`}).then(() => {})
      }
      commit(types.SET_AUTO, {flag: false})
      commit(types.SET_SYNC, {sync: true})
    }
  }
}
