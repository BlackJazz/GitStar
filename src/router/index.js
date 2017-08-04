import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Oauth from '@/views/Oauth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { requireAuth: true }
    },
    {
      path: '/oauth',
      name: 'Oauth',
      component: Oauth
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
