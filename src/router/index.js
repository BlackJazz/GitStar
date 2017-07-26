import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requireAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
