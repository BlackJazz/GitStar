import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/Global'
import user from './modules/User'
import star from './modules/Star'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global,
    user,
    star
  }
})
